import * as THREE from 'three';

export default class HeroSection {
    constructor(experience) {
        this.experience = experience;
        this.scene = experience.scene;
        this.time = experience.time;

        this.setMaterial();
        this.setGeometry();
        this.setMesh();
    }

    setMaterial() {
        this.material = new THREE.PointsMaterial({
            size: 0.15,
            sizeAttenuation: true,
            color: '#576A8F', 
            transparent: true,
            opacity: 0.9
        });
        
        this.lineMaterial = new THREE.LineBasicMaterial({
            color: '#FF7444',
            transparent: true,
            opacity: 0.25,
            blending: THREE.AdditiveBlending
        });
    }

    setGeometry() {
        this.count = 80;
        this.positions = new Float32Array(this.count * 3);
        this.velocities = [];

        for(let i = 0; i < this.count; i++) {
            const i3 = i * 3;
            this.positions[i3] = (Math.random() - 0.5) * 14; 
            this.positions[i3 + 1] = (Math.random() - 0.5) * 10; 
            this.positions[i3 + 2] = (Math.random() - 0.5) * 8; 

            this.velocities.push({
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01,
                z: (Math.random() - 0.5) * 0.01
            });
        }

        this.geometry = new THREE.BufferGeometry();
        this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    }

    setMesh() {
        this.points = new THREE.Points(this.geometry, this.material);
        this.linesGeometry = new THREE.BufferGeometry();
        this.lines = new THREE.LineSegments(this.linesGeometry, this.lineMaterial);

        this.group = new THREE.Group();
        this.group.add(this.points);
        this.group.add(this.lines);
        
        this.scene.add(this.group);
    }

    update() {
        // Rotate cloud based on mouse interaction
        this.group.rotation.y = this.experience.time.elapsed * 0.0002 + (this.experience.mouse.x * 0.3);
        this.group.rotation.x = -(this.experience.mouse.y * 0.3);

        // Move Particles
        for(let i = 0; i < this.count; i++) {
            const i3 = i * 3;
            this.positions[i3] += this.velocities[i].x;
            this.positions[i3 + 1] += this.velocities[i].y;
            this.positions[i3 + 2] += this.velocities[i].z;

            // Bounce check
            if(Math.abs(this.positions[i3]) > 7) this.velocities[i].x *= -1;
            if(Math.abs(this.positions[i3 + 1]) > 5) this.velocities[i].y *= -1;
        }
        this.geometry.attributes.position.needsUpdate = true;

        // Draw Lines
        const linePositions = [];
        const connectDistance = 2.5;

        for(let i = 0; i < this.count; i++) {
            for(let j = i + 1; j < this.count; j++) {
                const dx = this.positions[i*3] - this.positions[j*3];
                const dy = this.positions[i*3+1] - this.positions[j*3+1];
                const dz = this.positions[i*3+2] - this.positions[j*3+2];
                const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);

                if(dist < connectDistance) {
                    linePositions.push(
                        this.positions[i*3], this.positions[i*3+1], this.positions[i*3+2],
                        this.positions[j*3], this.positions[j*3+1], this.positions[j*3+2]
                    );
                }
            }
        }
        this.linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    }
}