import * as THREE from 'three';
import Application from '../Application';

/**
 * Minimal dark floor that replaces Henry's baked room/desk.
 * Sits at y = 0 so the gaming setup can rest on top of it.
 */
export default class Floor {
    application: Application;
    scene: THREE.Scene;
    mesh: THREE.Mesh;

    constructor() {
        this.application = new Application();
        this.scene = this.application.scene;

        this.setModel();
    }

    setModel(): void {
        // Large enough to read as an infinite floor at this scene's scale
        // (the world uses units in the thousands).
        const geometry = new THREE.PlaneGeometry(28000, 28000);
        const material = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#07080c'),
            roughness: 0.8,
            metalness: 0.18,
        });

        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.rotation.x = -Math.PI / 2;
        this.mesh.position.y = 0;

        this.scene.add(this.mesh);
    }
}
