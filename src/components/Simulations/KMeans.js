import Chart from 'chart.js/auto';

export default class KMeans {
    constructor(container) {
        this.container = container;
        this.points = [];
        this.centroids = [];
        this.k = 3;
        this.colors = ['#FF7444', '#576A8F', '#00ff88'];
        this.iteration = 0;
        this.status = 'Ready';

        this.init();
    }

    init() {
        this.container.innerHTML = `
            <div style="display: flex; gap: 20px; height: 100%;">
                <div style="flex: 1; position: relative;">
                    <canvas id="kmeans-chart"></canvas>
                    <div style="position: absolute; top: 10px; right: 10px; background: rgba(255, 255, 255, 0.9); padding: 5px 10px; border-radius: 4px; border: 1px solid #ccc;">
                        Status: <span id="km-status" style="font-weight: bold; color: #576A8F;">Ready</span>
                    </div>
                </div>
                <div style="width: 250px; padding: 20px; background: #f5f5f5; border-radius: 8px;">
                    <h3>K-Means Controls</h3>
                    <p>Iteration: <span id="iter-count">0</span></p>
                    <button id="init-btn" class="btn-primary" style="width: 100%; margin-bottom: 10px; padding: 10px; background: #576A8F; color: white; border: none; border-radius: 4px; cursor: pointer;">1. Initialize</button>
                    <button id="step-assign-btn" class="btn-primary" style="width: 100%; margin-bottom: 10px; padding: 10px; background: #FF7444; color: white; border: none; border-radius: 4px; cursor: pointer;">2. Assign Clusters</button>
                    <button id="step-update-btn" class="btn-primary" style="width: 100%; margin-bottom: 10px; padding: 10px; background: #FF7444; color: white; border: none; border-radius: 4px; cursor: pointer;">3. Update Centroids</button>
                    <button id="reset-km-btn" class="btn-primary" style="width: 100%; padding: 10px; background: #e53e3e; color: white; border: none; border-radius: 4px; cursor: pointer;">Reset</button>
                </div>
            </div>
        `;

        this.ctx = document.getElementById('kmeans-chart').getContext('2d');
        this.statusEl = document.getElementById('km-status');
        this.initData();
        this.setupChart();
        this.setupListeners();
    }

    initData() {
        this.points = [];
        for (let i = 0; i < 50; i++) {
            this.points.push({
                x: Math.random() * 10,
                y: Math.random() * 10,
                cluster: -1
            });
        }

        this.centroids = [];
        for (let i = 0; i < this.k; i++) {
            this.centroids.push({
                x: Math.random() * 10,
                y: Math.random() * 10,
                color: this.colors[i]
            });
        }
        this.iteration = 0;
        this.updateStatus('Initialized');
    }

    setupChart() {
        this.chart = new Chart(this.ctx, {
            type: 'scatter',
            data: {
                datasets: [
                    {
                        label: 'Data Points',
                        data: this.points,
                        backgroundColor: (ctx) => {
                            const raw = ctx.raw;
                            if (!raw) return '#ccc';
                            return raw.cluster === -1 ? '#ccc' : this.colors[raw.cluster];
                        },
                        pointRadius: 5
                    },
                    {
                        label: 'Centroids',
                        data: this.centroids,
                        backgroundColor: this.colors,
                        pointRadius: 15,
                        pointStyle: 'rectRot'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { type: 'linear', min: 0, max: 10 },
                    y: { type: 'linear', min: 0, max: 10 }
                },
                animation: {
                    duration: 500
                }
            }
        });
    }

    setupListeners() {
        document.getElementById('init-btn').addEventListener('click', () => this.reset());
        document.getElementById('step-assign-btn').addEventListener('click', () => this.assignClusters());
        document.getElementById('step-update-btn').addEventListener('click', () => this.updateCentroids());
        document.getElementById('reset-km-btn').addEventListener('click', () => this.reset());
    }

    assignClusters() {
        let changed = false;
        this.points.forEach(point => {
            let minDist = Infinity;
            let closest = -1;

            this.centroids.forEach((centroid, idx) => {
                const dist = Math.sqrt((point.x - centroid.x) ** 2 + (point.y - centroid.y) ** 2);
                if (dist < minDist) {
                    minDist = dist;
                    closest = idx;
                }
            });

            if (point.cluster !== closest) changed = true;
            point.cluster = closest;
        });

        this.updateStatus('Clusters Assigned');
        this.updateChart();
    }

    updateCentroids() {
        let maxMove = 0;
        this.centroids.forEach((centroid, idx) => {
            const clusterPoints = this.points.filter(p => p.cluster === idx);
            if (clusterPoints.length > 0) {
                const avgX = clusterPoints.reduce((sum, p) => sum + p.x, 0) / clusterPoints.length;
                const avgY = clusterPoints.reduce((sum, p) => sum + p.y, 0) / clusterPoints.length;

                const moveDist = Math.sqrt((centroid.x - avgX) ** 2 + (centroid.y - avgY) ** 2);
                if (moveDist > maxMove) maxMove = moveDist;

                centroid.x = avgX;
                centroid.y = avgY;
            }
        });

        this.iteration++;
        document.getElementById('iter-count').innerText = this.iteration;

        if (maxMove < 0.01) {
            this.updateStatus('Converged (Mo < 0.01)');
        } else {
            this.updateStatus('Centroids Moved');
        }

        this.updateChart();
    }

    updateStatus(msg) {
        this.status = msg;
        if (this.statusEl) {
            this.statusEl.innerText = msg;
            this.statusEl.style.color = msg.includes('Converged') ? '#00ff88' : '#576A8F';
        }
    }

    updateChart() {
        this.chart.data.datasets[0].data = this.points;
        this.chart.data.datasets[1].data = this.centroids;
        this.chart.update();
    }

    reset() {
        this.initData();
        document.getElementById('iter-count').innerText = 0;
        this.updateChart();
    }

    destroy() {
        if (this.chart) {
            this.chart.destroy();
        }
    }
}
