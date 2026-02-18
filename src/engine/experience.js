import * as THREE from "three";

import { Sizes } from "./sizes.js";
import { Time } from "./time.js";
import { Camera } from "./camera.js";
import { Renderer } from "./renderer.js";
import { SceneSetup } from "./scene.js";
import HeroSection from "../sections/hero.js";
import SimulationsSection from "../sections/simulations.js";
import ClassificationSection from "../sections/classification.js";

export default class Experience {
    constructor(canvas) {
        window.experience = this;

        this.canvas = canvas;

        // Setup Utilities
        this.sizes = new Sizes();
        this.time = new Time();
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color('#FFF8DE');

        // Interaction: Track Mouse
        this.mouse = new THREE.Vector2();
        this.targetMouse = new THREE.Vector2();
        window.addEventListener('mousemove', (e) => {
            this.targetMouse.x = (e.clientX / this.sizes.width) * 2 - 1;
            this.targetMouse.y = -(e.clientY / this.sizes.height) * 2 + 1;
        });

        // Setup Core
        this.camera = new Camera(this);
        this.renderer = new Renderer(this);
        this.sceneSetup = new SceneSetup(this);

        // Initialize 3D World Content
        this.hero = new HeroSection(this);
        this.simulations = new SimulationsSection(this);
        this.classification = new ClassificationSection(this);

        // Resize event
        this.sizes.on("resize", () => this.resize());

        // Time tick event
        this.time.on("tick", () => this.update());
    }

    resize() {
        this.camera.resize();
        this.renderer.resize();
    }

    update() {
        // Smooth mouse dampening
        this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.05;
        this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.05;

        this.camera.update();

        // Update Sections
        if (this.hero) this.hero.update();
        if (this.simulations) this.simulations.update();
        if (this.classification) this.classification.update();

        this.renderer.update();
    }
}