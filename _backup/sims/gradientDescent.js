import * as THREE from 'three';
import { simManager } from './simManager.js';
import { createLossSurface } from './lossSurface.js';
import { engineState } from '../engine/engineState.js';

let ball, surface;
let w1 = 4;
let w2 = 4;
let epoch = 0;

export const gradientDescentSim = {
    isRunning: false,
    learningRate: 0.05,

    init(scene) {
        this.cleanup(scene);

        w1 = 4;
        w2 = 4;
        epoch = 0;

        surface = createLossSurface();
        scene.add(surface);

        const geometry = new THREE.SphereGeometry(0.25);
        const material = new THREE.MeshStandardMaterial({ color: 0xff4444 });
        ball = new THREE.Mesh(geometry, material);

        scene.add(ball);

        this.updateBallPosition();
    },

    update() {
        if (!this.isRunning || !ball) return;

        const grad1 = 2 * w1;
        const grad2 = 2 * w2;

        w1 -= this.learningRate * grad1;
        w2 -= this.learningRate * grad2;

        this.updateBallPosition();

        epoch++;

        const loss = w1 * w1 + w2 * w2;

        document.getElementById('epochVal').textContent = epoch;
        document.getElementById('lossVal').textContent = loss.toFixed(4);
    },

    updateBallPosition() {
        const y = 0.1 * (w1 * w1 + w2 * w2);
        ball.position.set(w1, y + 0.25, w2);
    },

    reset() {
        if (engineState.scene) {
            this.init(engineState.scene);
        }
    },

    cleanup(scene) {
        if (ball) scene.remove(ball);
        if (surface) scene.remove(surface);
    }
};

simManager.registerSim('Gradient Descent', gradientDescentSim);
