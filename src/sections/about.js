import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default class AboutSection {
    constructor(experience) {
        this.experience = experience;
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;
        this.container = document.querySelector('#app');

        this.initDOM();
        this.init3D();
        this.initAnimations();
    }

    initDOM() {
        this.element = document.createElement('section');
        this.element.id = 'about';

        this.element.innerHTML = `
            <div class="container">
                <h2 class="text-h2">The Process</h2>
                <p class="text-body">
                    Understanding machine learning requires more than just code.
                    It requires visualization.
                </p>
            </div>
        `;

        this.container.appendChild(this.element);
    }

    init3D() {
        const geometry = new THREE.BoxGeometry(2, 2, 2);

        const material = new THREE.MeshStandardMaterial({
            color: '#FF7444',
            metalness: 0.1,
            roughness: 0.7
        });

        this.cube = new THREE.Mesh(geometry, material);
        this.cube.position.set(4, -5, 0);
        this.cube.castShadow = true;

        this.scene.instance.add(this.cube);
    }

    initAnimations() {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: this.element,
                start: 'top center',
                end: 'bottom center',
                scrub: 1
            }
        });

        tl.to(this.cube.position, {
            y: 0,
            x: 3,
            z: 2,
            ease: 'power1.inOut'
        });

        tl.to(this.cube.rotation, {
            y: Math.PI,
            x: Math.PI / 2
        }, '<');
    }
}
