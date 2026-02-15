import { initScene, initControls } from './engine/scene.js';
import { initRenderer } from './engine/renderer.js';
import { startLoop } from './engine/loop.js';
import { SceneController } from './scenes/SceneController.js';
import { LandingScene } from './scenes/LandingScene.js';

// preload simulations
import './sims/gradientDescent.js';
import './sims/neuralNetToy.js';

window.onload = () => {
    const container = document.getElementById('canvas-container');
    const uiContainer = document.getElementById('ui-container');

    uiContainer.style.display = "none";

    const { scene, camera } = initScene();
    const renderer = initRenderer();

    container.appendChild(renderer.domElement);

    initControls(renderer.domElement);

    SceneController.load(LandingScene);

    startLoop(renderer, scene, camera);
};
