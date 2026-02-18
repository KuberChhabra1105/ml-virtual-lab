import * as THREE from "three";

export class Renderer {
    constructor(experience) {
        this.experience = experience;
        this.canvas = experience.canvas;
        this.sizes = experience.sizes;
        this.scene = experience.scene;
        this.camera = experience.camera;

        this.setInstance();
    }

    setInstance() {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true // Allow transparent background
        });

        // Set clear color to transparent so CSS background shows if needed, 
        // OR set it to match CSS exactly to avoid transparency issues.
        this.instance.setClearColor('#FFF8DE', 1); 
        
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(this.sizes.pixelRatio);
    }

    resize() {
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(this.sizes.pixelRatio);
    }

    update() {
        this.instance.render(this.scene, this.camera.instance);
    }
}