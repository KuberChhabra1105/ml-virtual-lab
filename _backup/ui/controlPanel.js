import { simManager } from '../sims/simManager.js';

export function initControlPanel(containerId) {
    const container = document.getElementById(containerId);

    container.innerHTML = `
        <h3 style="margin-top:0">Control Panel</h3>

        <div class="control-group">
            <label>Simulation</label>
            <select id="simSelect" style="width:100%; padding:6px; border-radius:6px; background:#333; color:white; border:none;">
                <option value="Gradient Descent">Gradient Descent</option>
                <option value="Neural Net Toy">Neural Net Toy</option>
            </select>
        </div>

        <div class="metrics" style="margin: 15px 0; padding: 10px; background: rgba(0,0,0,0.3); border-radius:8px;">
            <div>Epoch: <span id="epochVal">0</span></div>
            <div>Loss: <span id="lossVal">0.0000</span></div>
        </div>

        <div class="control-group buttons" style="display:flex; gap:10px;">
            <button id="startBtn" style="flex:1; background:#22c55e; padding:8px; border-radius:6px;">Start</button>
            <button id="resetBtn" style="flex:1; background:#f59e0b; padding:8px; border-radius:6px;">Reset</button>
        </div>

        <div class="control-group" style="margin-top:15px">
            <label id="lrLabel" style="display:block; font-size:12px; margin-bottom:5px;">
                Learning Rate: 0.05
            </label>
            <input id="lrSlider" type="range" min="0.001" max="0.2" step="0.001" value="0.05" />
        </div>
    `;

    const startBtn = document.getElementById('startBtn');

    startBtn.onclick = () => {
        const sim = simManager.getActiveSim();
        if (!sim) return;

        sim.isRunning = !sim.isRunning;

        startBtn.innerText = sim.isRunning ? "Stop" : "Start";
        startBtn.style.background = sim.isRunning ? "#ef4444" : "#22c55e";
    };

    document.getElementById('resetBtn').onclick = () => {
        const sim = simManager.getActiveSim();
        if (!sim) return;

        sim.isRunning = false;
        sim.reset();

        startBtn.innerText = "Start";
        startBtn.style.background = "#22c55e";

        document.getElementById('epochVal').textContent = "0";
        document.getElementById('lossVal').textContent = "0.0000";
    };

    document.getElementById('lrSlider').oninput = (e) => {
        const sim = simManager.getActiveSim();
        if (!sim) return;

        const val = parseFloat(e.target.value);
        sim.learningRate = val;

        document.getElementById('lrLabel').innerText =
            `Learning Rate: ${val.toFixed(3)}`;
    };

    document.getElementById('simSelect').onchange = (e) => {
        simManager.loadSim(e.target.value);
    };
}
