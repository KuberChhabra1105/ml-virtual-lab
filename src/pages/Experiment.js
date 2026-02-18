import LabService from '../services/LabService.js';
import Quiz from '../components/Quiz.js';

export default class Experiment {
    constructor(labId) {
        this.labId = labId;
        this.app = document.querySelector('#app');
        this.data = LabService.getExperiment(labId);
        this.activeTab = 'Theory';
        this.currentSim = null;

        // Enable Controls for Experiment
        document.body.classList.add('experiment-mode');

        this.render();
    }

    // Called if we had a lifecycle manager, but simpler to rely on Constructor for now
    unmount() {
        document.body.classList.remove('experiment-mode');

        // Destroy current simulation with extra care
        if (this.currentSim) {
            if (typeof this.currentSim.destroy === 'function') {
                this.currentSim.destroy();
            }
            this.currentSim = null;
        }

        // Restore Home UI if needed (though navigating away usually destroys it)
        const heroUI = document.getElementById('home-container');
        if (heroUI) heroUI.style.display = 'block';
    }

    render() {
        // Cleanup Home UI artifacts
        const heroUI = document.getElementById('home-container');
        if (heroUI) heroUI.style.display = 'none';

        this.app.innerHTML = `
            <div class="experiment-layout" style="
                display: grid; 
                grid-template-columns: 280px 1fr; 
                height: 100vh;
                font-family: 'Inter', sans-serif;
                background-color: #FFF8DE;
                z-index: 10;
                position: relative;
            ">
                <!-- Sidebar -->
                <aside class="sidebar" style="
                    background: rgba(43, 43, 43, 0.95); 
                    backdrop-filter: blur(10px);
                    color: white; 
                    padding: 30px 20px; 
                    display: flex; 
                    flex-direction: column;
                    border-right: 1px solid rgba(255,255,255,0.1);
                    z-index: 20;
                ">
                    <h3 style="margin-bottom: 40px; font-size: 1.1rem; letter-spacing: 0.05em; color: rgba(255,255,255,0.7); text-transform: uppercase;">LAB ORBIT // ${this.labId}</h3>
                    
                    <nav style="display: flex; flex-direction: column; gap: 8px;">
                        ${this.renderNavButton('Theory')}
                        ${this.renderNavButton('Procedure')}
                        ${this.renderNavButton('Simulation')}
                        ${this.renderNavButton('Quiz')}
                    </nav>
                    
                    <button id="btn-exit-lab" style="
                        margin-top: auto; 
                        background: none;
                        border: none;
                        color: rgba(255,255,255,0.5); 
                        cursor: pointer;
                        font-size: 0.9rem; 
                        transition: color 0.2s;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        padding: 0;
                        text-align: left;
                    ">
                        <span>←</span> Exit Lab
                    </button>
                </aside>

                <!-- Main Content Area -->
                <main class="content-area" style="
                    position: relative; 
                    height: 100vh; 
                    overflow-y: auto; 
                    background: rgba(245, 247, 250, 0.92);
                ">
                    <!-- Guidance Overlay -->
                    <div id="guidance-toast" style="
                        position: absolute; 
                        top: 20px; 
                        right: 20px; 
                        background: white; 
                        padding: 10px 15px; 
                        border-radius: 8px; 
                        box-shadow: 0 4px 12px rgba(0,0,0,0.1); 
                        font-size: 0.9rem; 
                        color: #555; 
                        border-left: 4px solid #FF7444;
                        z-index: 100;
                        transition: opacity 0.3s;
                    ">
                        Select a tab to begin learning.
                    </div>

                    <div id="tab-content" style="padding: 60px; max-width: 900px; margin: 0 auto; min-height: 80vh;">
                        ${this.data.theory}
                    </div>
                </main>
            </div>
        `;

        this.setupTabs();
        this.updateGuidance('Theory');
    }

    renderNavButton(name) {
        const isActive = this.activeTab === name;
        const bg = isActive ? 'rgba(255, 116, 68, 0.2)' : 'transparent';
        const color = isActive ? '#FF7444' : 'rgba(255,255,255,0.8)';
        const border = isActive ? '1px solid rgba(255,116,68,0.5)' : '1px solid transparent';

        return `<button class="tab-btn" data-tab="${name}" style="
            padding: 12px 16px;
            background: ${bg};
            color: ${color};
            border: ${border};
            border-radius: 8px;
            text-align: left;
            cursor: pointer;
            transition: all 0.2s;
            font-weight: 500;
        ">${name}</button>`;
    }

    setupTabs() {
        const buttons = document.querySelectorAll('.tab-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.activeTab = e.target.dataset.tab;

                // Update Buttons
                buttons.forEach(b => {
                    b.style.background = 'transparent';
                    b.style.color = 'rgba(255,255,255,0.8)';
                    b.style.border = '1px solid transparent';
                });
                e.target.style.background = 'rgba(255, 116, 68, 0.2)';
                e.target.style.color = '#FF7444';
                e.target.style.border = '1px solid rgba(255,116,68,0.5)';

                this.updateContent();
                this.updateGuidance(this.activeTab);
            });
        });

        // Exit Button Listener
        const exitBtn = document.getElementById('btn-exit-lab');
        if (exitBtn) {
            exitBtn.onclick = () => {
                // IMPORTANT: Cleanup before leaving
                this.unmount();
                window.location.hash = '/lab/machine-learning';
            };
        }
    }

    updateGuidance(tab) {
        const toast = document.getElementById('guidance-toast');
        if (!toast) return;

        let msg = "";
        switch (tab) {
            case 'Theory': msg = "Objective: Understand the core mathematical concepts."; break;
            case 'Procedure': msg = "Follow the step-by-step guide to run the experiment."; break;
            case 'Simulation': msg = "Interactive Mode: Adjust parameters and observe real-time results."; break;
            case 'Quiz': msg = "Knowledge Check: Test your understanding to complete the module."; break;
        }
        toast.innerHTML = `<strong>${tab}</strong>: ${msg}`;
    }

    updateContent() {
        const container = document.querySelector('#tab-content');
        if (!container) return;

        // Reset container style
        container.style.maxWidth = '900px';

        switch (this.activeTab) {
            case 'Theory':
                // Cleanup simulation if present
                if (this.currentSim && typeof this.currentSim.destroy === 'function') {
                    this.currentSim.destroy();
                    this.currentSim = null;
                }
                container.innerHTML = this.data.theory;
                break;
            case 'Procedure':
                // Cleanup simulation if present
                if (this.currentSim && typeof this.currentSim.destroy === 'function') {
                    this.currentSim.destroy();
                    this.currentSim = null;
                }
                container.innerHTML = this.data.procedure;
                break;
            case 'Simulation':
                container.style.maxWidth = '100%';
                container.innerHTML = '<div id="simulation-container" style="width: 100%; height: 75vh; background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); overflow: hidden; position: relative;"></div>';

                // Destroy previous simulation
                if (this.currentSim && typeof this.currentSim.destroy === 'function') {
                    this.currentSim.destroy();
                    this.currentSim = null;
                }

                // Small delay to ensure container is in DOM for Chart.js/Sliders
                setTimeout(() => {
                    this.renderSimulation();
                }, 50);
                break;
            case 'Quiz':
                // Cleanup simulation when going to Quiz
                if (this.currentSim && typeof this.currentSim.destroy === 'function') {
                    this.currentSim.destroy();
                    this.currentSim = null;
                }

                container.innerHTML = '<div id="quiz-container"></div>';
                const questions = this.data.quiz || [];
                // Fallback if empty
                if (questions.length === 0) {
                    container.innerHTML = '<p>No quiz available for this lab.</p>';
                } else {
                    new Quiz(document.getElementById('quiz-container'), questions);
                }
                break;
        }
    }

    renderSimulation() {
        const container = document.getElementById('simulation-container');
        if (!container) return;

        if (this.labId === 'ann') {
            import('../components/Simulations/ANN.js').then(module => {
                this.currentSim = new module.default(container);
            });
        } else if (this.labId === 'kmeans') {
            import('../components/Simulations/KMeans.js').then(module => {
                this.currentSim = new module.default(container);
            });
        } else {
            // Default to Linear Regression
            import('../components/Simulations/LinearRegression.js').then(module => {
                this.currentSim = new module.default(container);
            });
        }
    }
}
