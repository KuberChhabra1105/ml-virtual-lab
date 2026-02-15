import { engineState } from '../engine/engineState.js';

export const SceneController = {
    currentScene: null,

    load(sceneModule) {
        if (this.currentScene && this.currentScene.cleanup) {
            this.currentScene.cleanup(engineState.scene);
        }

        this.currentScene = sceneModule;

        if (sceneModule.init) {
            sceneModule.init(engineState.scene);
        }
    }
};
