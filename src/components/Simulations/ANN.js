
export default class ANN {
    constructor(container) {
        this.container = container;
        this.canvas = null;
        this.ctx = null;
        this.layers = [3, 4, 3, 2]; // Layers architecture
        this.nodes = [];
        this.connections = [];
        this.pulse = null;

        this.init();
    }

    init() {
        this.container.innerHTML = `
            <div style="position: relative; width: 100%; height: 100%;">
                <canvas id="ann-canvas"></canvas>
                <div style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%);">
                    <button id="feed-forward-btn" class="btn-primary" style="padding: 12px 24px; background: #FF7444; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">Run Feed Forward</button>
                </div>
            </div>
        `;

        this.canvas = document.getElementById('ann-canvas');
        this.ctx = this.canvas.getContext('2d');

        // Handle Resize
        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Setup Interaction
        this.canvas.addEventListener('mousemove', (e) => this.handleHover(e));
        document.getElementById('feed-forward-btn').addEventListener('click', () => this.animatePulse());

        // Build Network
        this.buildNetwork();
        this.draw();
    }

    resize() {
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.buildNetwork(); // Rebuild positions
        this.draw();
    }

    buildNetwork() {
        this.nodes = [];
        this.connections = [];

        const layerGap = this.canvas.width / (this.layers.length + 1);
        const maxNodes = Math.max(...this.layers);

        this.layers.forEach((nodeCount, layerIndex) => {
            const x = (layerIndex + 1) * layerGap;
            const nodeGap = this.canvas.height / (nodeCount + 1);

            for (let i = 0; i < nodeCount; i++) {
                const y = (i + 1) * nodeGap;
                this.nodes.push({ x, y, layer: layerIndex, id: `${layerIndex}-${i}`, active: 0 });
            }
        });

        // Create Connections (Fully Connected)
        this.nodes.forEach(nodeA => {
            this.nodes.forEach(nodeB => {
                if (nodeB.layer === nodeA.layer + 1) {
                    this.connections.push({ from: nodeA, to: nodeB, weight: Math.random() });
                }
            });
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw Connections
        this.connections.forEach(conn => {
            const isActive = conn.from.active > 0 || conn.to.active > 0;
            this.ctx.beginPath();
            this.ctx.moveTo(conn.from.x, conn.from.y);
            this.ctx.lineTo(conn.to.x, conn.to.y);
            this.ctx.strokeStyle = isActive ? `rgba(255, 116, 68, ${0.5 + isActive})` : 'rgba(87, 106, 143, 0.2)';
            this.ctx.lineWidth = isActive ? 2 : 1;
            this.ctx.stroke();
        });

        // Draw Nodes
        this.nodes.forEach(node => {
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, 15, 0, Math.PI * 2);
            this.ctx.fillStyle = node.active > 0 ? '#FF7444' : 'white';
            this.ctx.strokeStyle = '#576A8F';
            this.ctx.lineWidth = 2;
            this.ctx.fill();
            this.ctx.stroke();
        });

        // Draw Pulse if active
        if (this.pulse) {
            this.updatePulse();
        }
    }

    handleHover(e) {
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        let hoverNode = null;
        this.nodes.forEach(node => {
            const dist = Math.sqrt((mouseX - node.x) ** 2 + (mouseY - node.y) ** 2);
            if (dist < 20) hoverNode = node;
        });

        if (hoverNode) {
            this.highlightConnections(hoverNode);
        } else {
            this.resetHighlight();
        }
        this.draw();
    }

    highlightConnections(node) {
        // Simple visual feedback
        this.nodes.forEach(n => n.active = 0);
        node.active = 0.5;
        this.connections.forEach(c => {
            if (c.from === node || c.to === node) {
                c.from.active = 0.3;
                c.to.active = 0.3;
            }
        });
    }

    resetHighlight() {
        if (!this.pulse) {
            this.nodes.forEach(n => n.active = 0);
        }
    }

    animatePulse() {
        // Start animation from Layer 0
        this.pulse = { layer: 0, progress: 0 };
        this.loopAnimation();
    }

    updatePulse() {
        // Propagate activation layer by layer
    }

    loopAnimation() {
        if (!this.pulse) return;

        // Simple layer-by-layer lighting up effect
        this.pulse.progress += 0.05;

        const currentLayerIdx = Math.floor(this.pulse.progress);

        if (currentLayerIdx >= this.layers.length) {
            this.pulse = null;
            this.resetHighlight();
            this.draw();
            return;
        }

        // Light up nodes in current layer
        this.nodes.forEach(node => {
            if (node.layer === currentLayerIdx) {
                node.active = 1 - (this.pulse.progress - currentLayerIdx); // Fade out
            } else {
                node.active = 0;
            }
        });

        this.draw();
        requestAnimationFrame(() => this.loopAnimation());
    }

    destroy() {
        window.removeEventListener('resize', this.resize);
        this.pulse = null;
        // Clear canvas if needed
    }
}
