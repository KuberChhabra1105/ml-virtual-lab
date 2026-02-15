import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { engineState } from './engineState.js';

export function initScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf4f1ea);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xded6c8, 0.8);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xfff4dd, 0.7);
    dirLight.position.set(5, 8, 5);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const floorGeo = new THREE.PlaneGeometry(40, 40);
    const floorMat = new THREE.MeshStandardMaterial({
        color: 0xf8f6f1,
        roughness: 1
    });

    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.7;
    scene.add(floor);

    const camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    camera.position.set(4, 3.5, 6);

    engineState.scene = scene;
    engineState.camera = camera;

    return { scene, camera };
}

export function initControls(dom) {
    const controls = new OrbitControls(engineState.camera, dom);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 3;
    controls.maxDistance = 10;
    controls.target.set(0, 0, 0);

    engineState.controls = controls;
}
