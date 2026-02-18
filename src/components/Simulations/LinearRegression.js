
import Chart from 'chart.js/auto';

export default class LinearRegression {
    constructor(container) {
        this.container = container;
        this.dataPoints = [];
        this.m = 0; // Slope
        this.c = 0; // Intercept
        this.learningRate = 0.001;
        this.isTraining = false;

        this.init();
    }

    init() {
        this.container.innerHTML = `
            <div style="display: flex; gap: 20px; height: 100%;">
                <div style="flex: 1; position: relative;">
                    <canvas id="lr-chart"></canvas>
                    <div style="position: absolute; top: 10px; right: 10px; background: rgba(255, 255, 255, 0.9); padding: 10px; border-radius: 8px; border: 1px solid #ccc; font-family: monospace;">
                        <strong>MSE: <span id="mse-val" style="color: #FF7444;">0.00</span></strong>
                    </div>
                </div>
                <div style="width: 250px; padding: 20px; background: #f5f5f5; border-radius: 8px;">
                    <h3>Controls</h3>
                    <div style="margin-bottom: 20px;">
                        <label>Learning Rate: <span id="lr-value">0.001</span></label>
                        <input type="range" id="lr-slider" min="0.0001" max="0.01" step="0.0001" value="0.001" style="width: 100%;">
                    </div>
                    <button id="add-data-btn" class="btn-primary" style="width: 100%; margin-bottom: 10px; padding: 10px; background: #576A8F; color: white; border: none; border-radius: 4px; cursor: pointer;">Add Random Data</button>
                    <button id="train-btn" class="btn-primary" style="width: 100%; margin-bottom: 10px; padding: 10px; background: #FF7444; color: white; border: none; border-radius: 4px; cursor: pointer;">Train (Gradient Descent)</button>
                    <button id="reset-btn" class="btn-primary" style="width: 100%; padding: 10px; background: #e53e3e; color: white; border: none; border-radius: 4px; cursor: pointer;">Reset</button>
                    
                    <div style="margin-top: 20px; font-family: monospace;">
                        <p>Slope (m): <span id="m-val">0.00</span></p>
                        <p>Intercept (c): <span id="c-val">0.00</span></p>
                    </div>
                </div>
            </div>
        `;

        this.ctx = document.getElementById('lr-chart').getContext('2d');
        this.setupChart();
        this.setupListeners();
    }

    setupChart() {
        this.chart = new Chart(this.ctx, {
            type: 'scatter',
            data: {
                datasets: [
                    {
                        label: 'Data Points',
                        data: this.dataPoints,
                        backgroundColor: '#576A8F'
                    },
                    {
                        label: 'Regression Line',
                        data: [],
                        type: 'line',
                        borderColor: '#FF7444',
                        borderWidth: 2,
                        fill: false,
                        pointRadius: 0
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { type: 'linear', position: 'bottom', min: 0, max: 10 },
                    y: { type: 'linear', min: 0, max: 10 }
                },
                animation: false
            }
        });
    }

    setupListeners() {
        document.getElementById('add-data-btn').addEventListener('click', () => this.addRandomData());
        document.getElementById('train-btn').addEventListener('click', () => this.toggleTraining());
        document.getElementById('reset-btn').addEventListener('click', () => this.resetpy());

        const slider = document.getElementById('lr-slider');
        slider.addEventListener('input', (e) => {
            this.learningRate = parseFloat(e.target.value);
            document.getElementById('lr-value').innerText = this.learningRate;
        });
    }

    // Destroy to clean up
    destroy() {
        this.isTraining = false;
        if (this.chart) {
            this.chart.destroy();
        }
        // If we had this.gui, we would call this.gui.destroy();
    }

    addRandomData() {
        const x = Math.random() * 8 + 1;
        const noise = (Math.random() - 0.5) * 3;
        const y = x + 1 + noise;

        this.dataPoints.push({ x, y });
        this.chart.data.datasets[0].data = this.dataPoints;
        this.updateMSE();
        this.chart.update();
    }

    toggleTraining() {
        if (this.isTraining) {
            this.isTraining = false;
            document.getElementById('train-btn').innerText = "Train (Gradient Descent)";
        } else {
            this.isTraining = true;
            document.getElementById('train-btn').innerText = "Stop Training";
            this.trainLoop();
        }
    }

    trainLoop() {
        if (!this.isTraining) return;

        if (this.dataPoints.length === 0) {
            this.isTraining = false;
            return;
        }

        let dm = 0;
        let dc = 0;
        const n = this.dataPoints.length;

        this.dataPoints.forEach(point => {
            const pred = this.m * point.x + this.c;
            const error = pred - point.y;
            dm += error * point.x;
            dc += error;
        });

        dm = (2 / n) * dm;
        dc = (2 / n) * dc;

        // Stability Check
        if (!isFinite(dm) || !isFinite(dc)) {
            console.error("Gradient Exploded! Stopping training.");
            this.isTraining = false;
            document.getElementById('train-btn').innerText = "Train (Gradient Descent)";
            alert("Training stopped: Gradient Exploded. Try lowering the learning rate.");
            return;
        }

        this.m -= this.learningRate * dm;
        this.c -= this.learningRate * dc;

        this.updateLine();
        this.updateMSE();

        document.getElementById('m-val').innerText = this.m.toFixed(2);
        document.getElementById('c-val').innerText = this.c.toFixed(2);

        requestAnimationFrame(() => this.trainLoop());
    }

    updateMSE() {
        if (this.dataPoints.length === 0) {
            document.getElementById('mse-val').innerText = "0.00";
            return;
        }

        let sumSquaredError = 0;
        this.dataPoints.forEach(p => {
            const pred = this.m * p.x + this.c;
            sumSquaredError += (pred - p.y) ** 2;
        });

        const mse = sumSquaredError / this.dataPoints.length;
        document.getElementById('mse-val').innerText = mse.toFixed(4);
    }

    updateLine() {
        const p1 = { x: 0, y: this.c };
        const p2 = { x: 10, y: this.m * 10 + this.c };

        this.chart.data.datasets[1].data = [p1, p2];
        this.chart.update();
    }

    resetpy() {
        this.isTraining = false;
        this.m = 0;
        this.c = 0;
        this.dataPoints = [];
        this.chart.data.datasets[0].data = [];
        this.chart.data.datasets[1].data = [];
        this.updateMSE();
        this.chart.update();
        document.getElementById('train-btn').innerText = "Train (Gradient Descent)";
        document.getElementById('m-val').innerText = "0.00";
        document.getElementById('c-val').innerText = "0.00";
    }
}
