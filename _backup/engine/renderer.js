import * as THREE from 'three';
import { engineState } from './engineState.js';

export function initRenderer() {
    const r = new THREE.WebGLRenderer({ antialias: true });
    r.setSize(window.innerWidth, window.innerHeight);
    r.setPixelRatio(window.devicePixelRatio);
    engineState.renderer = r;

    window.onresize = () => {
        if (engineState.camera) {
            engineState.camera.aspect = window.innerWidth / window.innerHeight;
            engineState.camera.updateProjectionMatrix();
        }
        r.setSize(window.innerWidth, window.innerHeight);
    };
    return r;
}