import { engineState } from './engineState.js';
import { SceneController } from '../scenes/SceneController.js';

export function startLoop(renderer, scene, camera) {
    function animate() {
        requestAnimationFrame(animate);

        if (engineState.controls) engineState.controls.update();

        if (SceneController.currentScene && SceneController.currentScene.update) {
            SceneController.currentScene.update();
        }

        if (engineState.activeSim) {
            engineState.activeSim.update();
        }

        renderer.render(scene, camera);
    }

    animate();
}
