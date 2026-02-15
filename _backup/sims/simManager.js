import { engineState } from '../engine/engineState.js';

export const simManager = {
    sims: {},

    registerSim(name, sim) {
        this.sims[name] = sim;
    },

    loadSim(name) {
        const sim = this.sims[name];
        if (!sim) {
            console.error('Simulation not found:', name);
            return;
        }

        if (engineState.activeSim && engineState.activeSim.cleanup) {
            engineState.activeSim.cleanup(engineState.scene);
        }

        engineState.activeSim = sim;

        if (sim.init) {
            sim.init(engineState.scene);
        }
    },

    getActiveSim() {
        return engineState.activeSim;
    }
};
