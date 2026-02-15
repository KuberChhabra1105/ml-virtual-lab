import { simManager } from '../sims/simManager.js';
import { initControlPanel } from '../ui/controlPanel.js';

export const LabScene = {
    init(scene) {
        document.getElementById('ui-container').style.display = "block";

        simManager.loadSim('Gradient Descent');
    },

    cleanup(scene) {
        document.getElementById('ui-container').style.display = "none";
    }
};
