import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export class Camera {
    constructor(experience) {
        this.experience = experience;
        this.sizes = experience.sizes;
        this.scene = experience.scene;
        
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100);
        this.instance.position.set(0, 0, 14);
        this.scene.add(this.instance);
        
        this.setScrollControls();
    }

    setScrollControls() {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1
            }
        });

        // 1. Hero -> Gradient Descent (Match Y: -20)
        tl.to(this.instance.position, { y: -20, z: 12, duration: 2 });
        tl.to(this.instance.rotation, { x: -0.2, duration: 2 }, "<");

        // 2. Gradient Descent -> Classification (Match Y: -45)
        tl.to(this.instance.position, { y: -45, z: 15, duration: 2 });
        tl.to(this.instance.rotation, { x: 0, duration: 2 }, "<");
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height;
        this.instance.updateProjectionMatrix();
    }

    update() {}
}