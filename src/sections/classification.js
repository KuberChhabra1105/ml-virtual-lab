import * as THREE from 'three';
import GUI from 'lil-gui';

export default class ClassificationSection {
    constructor(experience) {
        this.experience = experience;
        this.scene = experience.scene;
        
        // 3D Group Position (Far below others)
        this.instance = new THREE.Group();
        this.instance.position.set(0, -45, 0); 
        this.scene.add(this.instance);

        this.params = { threshold: 0 };
        this.initDOM();
        this.createDataPoints();
        this.createDecisionBoundary();
        this.createControls();
    }

    initDOM() {
        const container = document.querySelector('#app');
        this.element = document.createElement('section');
        this.element.id = 'classification-ui';
        this.element.innerHTML = `
            <h2>Binary Classification</h2>
            <p>Drag the <b>Threshold</b> slider. Separate the Red and Blue data points.</p>
        `;
        container.appendChild(this.element);
    }

    createDataPoints() {
        this.cubes = [];
        const geo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        const matA = new THREE.MeshStandardMaterial({ color: '#FF4444' }); // Red
        const matB = new THREE.MeshStandardMaterial({ color: '#4444FF' }); // Blue

        for(let i = 0; i < 50; i++) {
            const isTypeA = i < 25;
            const mesh = new THREE.Mesh(geo, isTypeA ? matA : matB);
            mesh.position.set((Math.random()-0.5)*10, (Math.random()-0.5)*5, (Math.random()-0.5)*5);
            mesh.userData = { isTypeA };
            this.instance.add(mesh);
            this.cubes.push(mesh);
        }
    }

    createDecisionBoundary() {
        this.plane = new THREE.Mesh(
            new THREE.PlaneGeometry(10, 10),
            new THREE.MeshBasicMaterial({ color: '#333', transparent: true, opacity: 0.2, side: THREE.DoubleSide })
        );
        this.plane.rotation.y = Math.PI / 2;
        this.instance.add(this.plane);
    }

    createControls() {
        const gui = new GUI({ title: 'Classifier' });
        gui.domElement.style.position = 'fixed';
        gui.domElement.style.top = '250px';
        gui.domElement.style.right = '20px';
        
        gui.add(this.params, 'threshold', -5, 5).name('Threshold X')
           .onChange(() => this.checkClassification());
    }

    checkClassification() {
        this.plane.position.x = this.params.threshold;
        this.cubes.forEach(cube => {
            const isLeft = cube.position.x < this.params.threshold;
            let error = (cube.userData.isTypeA && !isLeft) || (!cube.userData.isTypeA && isLeft);
            cube.scale.setScalar(error ? 1.5 : 1);
            cube.material.emissive.setHex(error ? 0xffffff : 0x000000);
        });
    }

    update() {
        this.checkClassification();
        this.instance.rotation.y += 0.002;
    }
}