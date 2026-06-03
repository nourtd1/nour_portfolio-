import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Application from '../Application';
import BakedModel from '../Utils/BakedModel';
import Resources from '../Utils/Resources';
import Debug from '../Utils/Debug';

/**
 * Gaming setup model (scene.gltf + scene.bin + textures/).
 * GLTFLoader resolves .bin and textures relative to this path automatically.
 */
const GAMING_SETUP_PATH = 'models/gaming_setup/scene.gltf';

/* ── Placement (tweak these to line the monitor up with the OS screen) ── */
/** Largest dimension (scene units) the model should occupy. */
const MODEL_TARGET_SIZE = 2800;
/** Extra offset applied AFTER centering (use X to nudge left/right). */
const MODEL_POSITION = new THREE.Vector3(200, 0, 0);
/**
 * No Y rotation — setup faces camera. The chair is hidden dynamically
 * when the camera approaches (see update()).
 */
const MODEL_ROTATION = new THREE.Euler(0, 0, 0);

const CHAIR_FADE_FAR = 7500;
const CHAIR_FADE_NEAR = 5500;

/* ── Material look ──
 * FLAT_NEON_OVERRIDE = false (default): keep the model's realistic PBR
 *   textures and only boost the existing LEDs to emerald. Best visual result.
 * FLAT_NEON_OVERRIDE = true: apply the literal spec — flat carbon body
 *   (#0d1117) + emissive emerald LEDs, discarding the original textures.
 */
const FLAT_NEON_OVERRIDE = false;

const NEON_GREEN = new THREE.Color('#0078D4');
const CARBON = new THREE.Color('#0d1117');
const SCREEN_BASE = new THREE.Color('#050810');
const SCREEN_GLOW = new THREE.Color('#1a2a4a');

export default class Computer {
    application: Application;
    scene: THREE.Scene;
    resources: Resources;
    debug: Debug;
    bakedModel?: BakedModel;
    model?: THREE.Group;
    lights: THREE.Light[];
    chairMeshes: THREE.Object3D[];

    constructor() {
        this.application = new Application();
        this.scene = this.application.scene;
        this.resources = this.application.resources;
        this.debug = this.application.debug;
        this.lights = [];
        this.chairMeshes = [];

        // ÉTAPE 4 — scene lights for a modern 2026 RGB rendering.
        this.setLights();

        // ÉTAPE 2 — load the new gaming setup; fall back to the original
        // baked computer if the file is missing so the site never breaks.
        this.loadGamingSetup();
    }

    /**
     * ÉTAPE 2 — Load the gaming setup, recenter via its bounding box, and
     * scale it to occupy the same footprint as the original machine.
     */
    private loadGamingSetup(): void {
        const loader = new GLTFLoader();

        loader.load(
            GAMING_SETUP_PATH,
            (gltf: GLTF) => this.onGamingSetupLoaded(gltf),
            undefined,
            (error: unknown) => {
                // eslint-disable-next-line no-console
                console.warn(
                    `[Computer] Could not load ${GAMING_SETUP_PATH}, ` +
                        `falling back to the baked computer model.`,
                    error
                );
                this.useBakedFallback();
            }
        );
    }

    private onGamingSetupLoaded(gltf: GLTF): void {
        const model = gltf.scene;

        // 1 — measure raw bounding box to get scale factor.
        const rawBox = new THREE.Box3().setFromObject(model);
        const rawSize = rawBox.getSize(new THREE.Vector3());
        const maxDim = Math.max(rawSize.x, rawSize.y, rawSize.z) || 1;
        const scale = MODEL_TARGET_SIZE / maxDim;

        // 2 — apply scale + rotation first, THEN measure the transformed box
        //     so the center/floor values are correct.
        model.scale.setScalar(scale);
        model.rotation.copy(MODEL_ROTATION);
        model.position.set(0, 0, 0);

        const transformedBox = new THREE.Box3().setFromObject(model);
        const center = transformedBox.getCenter(new THREE.Vector3());

        // 3 — center on X/Z, keep Y at 0 for now.
        model.position.set(
            -center.x + MODEL_POSITION.x,
            MODEL_POSITION.y,
            -center.z + MODEL_POSITION.z
        );

        // 4 — rest the model on the floor: lift so lowest point = y 0.
        const placedBox = new THREE.Box3().setFromObject(model);
        model.position.y -= placedBox.min.y;

        // ÉTAPE 3 — material treatment.
        this.applyNeonMaterials(model);

        // Identify chair meshes by name or by being the largest object
        // on the negative-Z side of the model (behind the desk).
        this.findChairMeshes(model);

        this.model = model;
        this.scene.add(model);

        // Live placement controls (open the site with #debug in the URL).
        this.setDebugControls(scale);
    }

    /**
     * When the lil-gui debug panel is active (#debug in URL), expose live
     * sliders to position/scale/rotate the model so placement can be dialed
     * in visually, then copied back into the constants above.
     */
    private setDebugControls(initialScale: number): void {
        if (!this.debug.active || !this.model) return;

        const model = this.model;
        const folder = this.debug.ui.addFolder('Gaming Setup');
        const state = {
            scale: initialScale,
            x: model.position.x,
            y: model.position.y,
            z: model.position.z,
            rotX: model.rotation.x,
            rotY: model.rotation.y,
            rotZ: model.rotation.z,
        };

        folder
            .add(state, 'scale', 10, 600, 1)
            .onChange((v: number) => model.scale.setScalar(v));
        folder
            .add(state, 'x', -4000, 4000, 10)
            .onChange((v: number) => (model.position.x = v));
        folder
            .add(state, 'y', -2000, 4000, 10)
            .onChange((v: number) => (model.position.y = v));
        folder
            .add(state, 'z', -4000, 4000, 10)
            .onChange((v: number) => (model.position.z = v));
        folder
            .add(state, 'rotX', -Math.PI, Math.PI, 0.01)
            .onChange((v: number) => (model.rotation.x = v));
        folder
            .add(state, 'rotY', -Math.PI, Math.PI, 0.01)
            .onChange((v: number) => (model.rotation.y = v));
        folder
            .add(state, 'rotZ', -Math.PI, Math.PI, 0.01)
            .onChange((v: number) => (model.rotation.z = v));
        folder.open();
    }

    /**
     * Walk every mesh and apply neon treatment.
     * New model material names: "Stoo1", "material", "material_2"
     * Emissive parts (LEDs): material_2 and Stoo1 carry emissive textures.
     */
    private applyNeonMaterials(model: THREE.Group): void {
        // Material names in this model that are LED/emissive parts.
        const LED_MATERIAL_NAMES = ['material_2', 'stoo1'];

        model.traverse((child) => {
            if (!(child instanceof THREE.Mesh)) return;

            const materials = Array.isArray(child.material)
                ? child.material
                : [child.material];

            const matNames = materials.map((m) => m.name.toLowerCase());
            const isLedPart = matNames.some((n) =>
                LED_MATERIAL_NAMES.indexOf(n) !== -1
            );
            const isEmissivePart =
                isLedPart || materials.some((mat) => this.materialIsEmissive(mat));
            const isScreenPart = child.name.toLowerCase().includes('screen');

            if (isEmissivePart) {
                this.setMaterial(child, {
                    color: NEON_GREEN.clone(),
                    emissive: NEON_GREEN.clone(),
                    emissiveIntensity: 0.22,
                    roughness: 0.0,
                    metalness: 0.0,
                });
                return;
            }

            if (isScreenPart) {
                this.setMaterial(child, {
                    color: SCREEN_BASE.clone(),
                    emissive: SCREEN_GLOW.clone(),
                    emissiveIntensity: 0.5,
                    roughness: 0.05,
                    metalness: 0.0,
                });
                return;
            }

            if (FLAT_NEON_OVERRIDE) {
                this.setMaterial(child, {
                    color: CARBON.clone(),
                    roughness: 0.3,
                    metalness: 0.8,
                });
            } else {
                materials.forEach((mat) => {
                    if (mat instanceof THREE.MeshStandardMaterial) {
                        mat.metalness = Math.min(1, mat.metalness + 0.3);
                        mat.roughness = Math.max(0.25, mat.roughness * 0.8);
                        mat.needsUpdate = true;
                    }
                });
            }
        });
    }

    /** True if a material carries emissive light (LED / RGB strip). */
    private materialIsEmissive(mat: THREE.Material): boolean {
        if (mat instanceof THREE.MeshStandardMaterial) {
            return (
                mat.emissiveMap !== null ||
                (mat.emissive !== undefined && mat.emissive.getHex() > 0x050505)
            );
        }
        return false;
    }

    /** Dispose previous material(s) and assign a fresh standard one. */
    private setMaterial(
        mesh: THREE.Mesh,
        options: THREE.MeshStandardMaterialParameters
    ): void {
        const previous = mesh.material;
        if (Array.isArray(previous)) {
            previous.forEach((mat) => mat.dispose());
        } else if (previous) {
            previous.dispose();
        }
        mesh.material = new THREE.MeshStandardMaterial(options);
    }

    /**
     * ÉTAPE 4 — Lights for a 2026 look. These affect standard-material
     * meshes (the new gaming setup); the surrounding scene stays baked.
     */
    private setLights(): void {
        RectAreaLightUniformsLib.init();

        // Ambient RGB spill near the machine — blue accent.
        const greenLight = new THREE.PointLight(NEON_GREEN.clone(), 0.06, 2400);
        greenLight.position.set(-350, 850, 600);

        // Rim light behind the machine — violet.
        const purpleLight = new THREE.PointLight(
            new THREE.Color('#5E5CE6'),
            0.12,
            3500
        );
        purpleLight.position.set(500, 1000, -400);

        // Soft white key light from front-top.
        const keyLight = new THREE.RectAreaLight(
            new THREE.Color('#ffffff'),
            3.8,
            1600,
            1000
        );
        keyLight.position.set(0, 1600, 1300);
        keyLight.lookAt(0, 700, 0);

        this.lights.push(greenLight, purpleLight, keyLight);
        this.lights.forEach((light) => this.scene.add(light));
    }

    /**
     * Find chair-related meshes by name heuristic. Common names in
     * gaming setup models: "chair", "seat", "armrest", "wheel", "caster".
     */
    private findChairMeshes(model: THREE.Group): void {
        const CHAIR_KEYWORDS = ['chair', 'seat', 'armrest', 'wheel', 'caster', 'backrest', 'headrest'];

        model.traverse((child) => {
            const name = child.name.toLowerCase();
            if (CHAIR_KEYWORDS.some((kw) => name.includes(kw))) {
                this.chairMeshes.push(child);
            }
        });

        // If no named chair parts found, use positional heuristic:
        // the chair is the cluster of meshes furthest on the +Z side
        // (behind the desk, facing the camera in this orientation).
        if (this.chairMeshes.length === 0) {
            const candidates: { obj: THREE.Object3D; z: number }[] = [];
            model.traverse((child) => {
                if (!(child instanceof THREE.Mesh)) return;
                const worldPos = new THREE.Vector3();
                child.getWorldPosition(worldPos);
                candidates.push({ obj: child, z: worldPos.z });
            });

            if (candidates.length > 0) {
                candidates.sort((a, b) => b.z - a.z);
                const maxZ = candidates[0].z;
                // Take all meshes within 300 units of the furthest Z as "chair"
                for (const c of candidates) {
                    if (maxZ - c.z < 300) {
                        this.chairMeshes.push(c.obj);
                    } else {
                        break;
                    }
                }
            }
        }
    }

    /**
     * Called each frame — fade chair out as camera gets close, fade in when far.
     */
    update(): void {
        if (this.chairMeshes.length === 0) return;

        const camZ = this.application.camera.instance.position.z;
        let opacity: number;

        if (camZ >= CHAIR_FADE_FAR) {
            opacity = 1;
        } else if (camZ <= CHAIR_FADE_NEAR) {
            opacity = 0;
        } else {
            opacity = (camZ - CHAIR_FADE_NEAR) / (CHAIR_FADE_FAR - CHAIR_FADE_NEAR);
        }

        const visible = opacity > 0.01;

        for (const obj of this.chairMeshes) {
            obj.visible = visible;
            if (obj instanceof THREE.Mesh && obj.material) {
                const mat = obj.material as THREE.MeshStandardMaterial;
                if (!mat.transparent) {
                    mat.transparent = true;
                }
                mat.opacity = opacity;
            }
        }
    }

    /**
     * Fallback to the original baked computer so the experience keeps
     * working (and the OS screen stays aligned) if the new asset fails.
     */
    private useBakedFallback(): void {
        this.bakedModel = new BakedModel(
            this.resources.items.gltfModel.computerSetupModel,
            this.resources.items.texture.computerSetupTexture,
            900
        );
        this.model = this.bakedModel.getModel();
        this.scene.add(this.model);
    }
}
