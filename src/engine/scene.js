import * as THREE from 'three';

export class SceneSetup {
    constructor(experience) {
        this.experience = experience;
        this.scene = this.experience.scene;
        
        // Soft ambient light
        const ambientLight = new THREE.AmbientLight('#ffffff', 0.5);
        this.scene.add(ambientLight);

        // Strong directional light (sun)
        const directionalLight = new THREE.DirectionalLight('#ffffff', 2);
        directionalLight.position.set(5, 10, 7);
        this.scene.add(directionalLight);
    }
}