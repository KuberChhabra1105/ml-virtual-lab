import * as THREE from 'three';
import GUI from 'lil-gui';

export default class SimulationsSection {
    constructor(experience) {
        this.experience = experience;
        this.scene = experience.scene;
        
        // 3D Group Position
        this.instance = new THREE.Group();
        this.instance.position.set(0, -20, 0); 
        this.scene.add(this.instance);

        this.params = { learningRate: 0.05, speed: 1, reset: () => this.resetBall() };

        this.initDOM();
        this.createLossLandscape();
        this.createControls();
    }

    initDOM() {
        const container = document.querySelector('#app');
        this.element = document.createElement('section');
        this.element.id = 'simulation-ui';
        this.element.innerHTML = `
            <h2>Gradient Descent</h2>
            <p>Adjust the <b>Learning Rate</b>. Watch the agent optimize to find the global minimum.</p>
        `;
        container.appendChild(this.element);
    }

    createControls() {
        if(!this.gui) {
            this.gui = new GUI({ title: 'Gradient Controls' });
            this.gui.domElement.style.position = 'fixed';
            this.gui.domElement.style.top = '100px';
            this.gui.domElement.style.right = '20px';
        }
        this.gui.add(this.params, 'learningRate', 0.001, 0.2).name('Learning Rate');
        this.gui.add(this.params, 'speed', 0, 2).name('Speed');
        this.gui.add(this.params, 'reset').name('Reset');
    }

    createLossLandscape() {
        // Wireframe Terrain
        const geometry = new THREE.PlaneGeometry(20, 20, 48, 48);
        const count = geometry.attributes.position.count;
        for(let i = 0; i < count; i++) {
            const x = geometry.attributes.position.getX(i);
            const y = geometry.attributes.position.getY(i);
            const z = Math.sin(x * 0.4) * Math.cos(y * 0.4) * 3; 
            geometry.attributes.position.setZ(i, z);
        }
        geometry.computeVertexNormals();

        const material = new THREE.MeshStandardMaterial({ color: '#576A8F', wireframe: true, side: THREE.DoubleSide });
        this.terrain = new THREE.Mesh(geometry, material);
        this.terrain.rotation.x = -Math.PI * 0.5;
        this.instance.add(this.terrain);

        // Red Ball
        this.ball = new THREE.Mesh(
            new THREE.SphereGeometry(0.5, 32, 32),
            new THREE.MeshStandardMaterial({ color: '#FF7444' })
        );
        this.resetBall();
        this.instance.add(this.ball);
    }

    resetBall() { this.ball.position.set(4, 5, 4); }

    update() {
        if(this.ball) {
            // Simple Descent Logic
            const x = this.ball.position.x;
            const z = this.ball.position.z;
            const gradX = Math.cos(x * 0.4) * Math.cos(z * 0.4); // Simplified derivative
            const gradZ = Math.sin(x * 0.4) * -Math.sin(z * 0.4);
            
            this.ball.position.x -= gradX * this.params.learningRate * this.params.speed;
            this.ball.position.z -= gradZ * this.params.learningRate * this.params.speed;

            // Height Calculation
            const y = Math.sin(this.ball.position.x * 0.4) * Math.cos(this.ball.position.z * 0.4) * 3;
            this.ball.position.y = y + 0.5;

            if(this.ball.position.distanceTo(new THREE.Vector3(0,0,0)) < 0.5) this.resetBall();
            this.instance.rotation.y += 0.001;
        }
    }
}