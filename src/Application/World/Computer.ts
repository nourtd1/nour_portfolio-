import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Application from '../Application';
import BakedModel from '../Utils/BakedModel';
import Resources from '../Utils/Resources';
import Debug from '../Utils/Debug';

/**
 * New gaming setup — "Modern Gaming Setup" by zyphur (Sketchfab),
 * licensed CC-BY-4.0. Attribution is required and lives in the Credits
 * window of the 2D OS site.
 *
 * The asset is a separated glTF (scene.gltf + scene.bin + textures/), not a
 * single .glb. GLTFLoader resolves the .bin and textures relative to this
 * path automatically.
 */
const GAMING_SETUP_PATH = 'models/modern_gaming_setup/scene.gltf';

/* ── Placement (tweak these to line the monitor up with the OS screen) ── */
/** Largest dimension (scene units) the model should occupy. */
const MODEL_TARGET_SIZE = 2600;
/** Horizontal placement of the model (Y is auto-set to rest on the floor). */
const MODEL_POSITION = new THREE.Vector3(0, 0, 0);
/** Euler rotation (radians) applied after centering. */
const MODEL_ROTATION = new THREE.Euler(0, 0, 0);

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

    constructor() {
        this.application = new Application();
        this.scene = this.application.scene;
        this.resources = this.application.resources;
        this.debug = this.application.debug;
        this.lights = [];

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

        // Center on origin (X/Z), then scale to the target footprint.
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        const scale = MODEL_TARGET_SIZE / maxDim;

        model.scale.setScalar(scale);
        model.rotation.copy(MODEL_ROTATION);
        // Recenter on X/Z around the origin.
        model.position.set(
            -center.x * scale + MODEL_POSITION.x,
            MODEL_POSITION.y,
            -center.z * scale + MODEL_POSITION.z
        );

        // ÉTAPE 2 — rest the model on the floor (y = 0): measure the scaled
        // bounding box and lift it so its lowest point sits at the floor.
        const placedBox = new THREE.Box3().setFromObject(model);
        model.position.y -= placedBox.min.y;

        // ÉTAPE 3 — material treatment.
        this.applyNeonMaterials(model);

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
     * ÉTAPE 3 — Walk every mesh.
     *
     * The model uses generic material names (Material.074, …) with no
     * "led"/"screen" tokens, so we detect emissive parts (the real RGB
     * LEDs) by their emissive map / emissive color instead of by name.
     */
    private applyNeonMaterials(model: THREE.Group): void {
        model.traverse((child) => {
            if (!(child instanceof THREE.Mesh)) return;

            const materials = Array.isArray(child.material)
                ? child.material
                : [child.material];

            const isEmissivePart = materials.some((mat) =>
                this.materialIsEmissive(mat)
            );
            const isScreenPart = child.name.toLowerCase().includes('screen');

            if (isEmissivePart) {
                this.setMaterial(child, {
                    color: NEON_GREEN.clone(),
                    emissive: NEON_GREEN.clone(),
                    emissiveIntensity: 0.18,
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
                // Literal spec: flat carbon body, textures discarded.
                this.setMaterial(child, {
                    color: CARBON.clone(),
                    roughness: 0.3,
                    metalness: 0.8,
                });
            } else {
                // Preserve the realistic PBR textures, nudge toward a
                // darker, more metallic carbon look.
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

        // Ambient RGB spill near the machine — emerald.
        const greenLight = new THREE.PointLight(NEON_GREEN.clone(), 0.08, 2800);
        greenLight.position.set(450, 950, 850);

        // Rim light behind the machine — violet.
        const purpleLight = new THREE.PointLight(
            new THREE.Color('#5E5CE6'),
            0.16,
            4000
        );
        purpleLight.position.set(-650, 1150, -500);

        // Soft white key light from front-top.
        const keyLight = new THREE.RectAreaLight(
            new THREE.Color('#ffffff'),
            4.4,
            1800,
            1200
        );
        keyLight.position.set(0, 1750, 1450);
        keyLight.lookAt(0, 800, 0);

        this.lights.push(greenLight, purpleLight, keyLight);
        this.lights.forEach((light) => this.scene.add(light));
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
