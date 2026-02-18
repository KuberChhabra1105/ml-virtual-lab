export default class LabOverview {
    constructor() {
        this.app = document.querySelector('#app');
        this.render();
    }

    render() {
        this.app.innerHTML = `
            <div class="lab-overview-container" style="
                padding: 80px 20px; 
                max-width: 1000px; 
                margin: 0 auto; 
                font-family: 'Inter', sans-serif;
            ">
                <header style="margin-bottom: 40px; border-bottom: 1px solid #eee; padding-bottom: 20px;">
                    <button id="btn-back-dashboard" style="
                        background: none; 
                        border: none; 
                        color: #576A8F; 
                        cursor: pointer; 
                        font-size: 1rem; 
                        display: flex; 
                        align-items: center; 
                        gap: 8px; 
                        margin-bottom: 15px;
                        padding: 0;
                    ">
                        <span>←</span> Back to Dashboard
                    </button>
                    <h1 style="color: #2b2b2b;">Machine Learning Lab</h1>
                    <p style="color: #666; max-width: 600px;">Explore fundamental algorithms through interactive simulations. Select an experiment below to begin.</p>
                </header>

                <div class="experiments-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 30px;">
                    
                    <!-- Experiment 1 -->
                    <div class="exp-card" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); transition: transform 0.2s;">
                        <div style="height: 120px; background: linear-gradient(135deg, #FF7444 0%, #ff9c7d 100%); display: flex; align-items: center; justify-content: center;">
                            <span style="font-size: 3rem; color: white;">📈</span>
                        </div>
                        <div style="padding: 20px;">
                            <h3 style="margin: 0 0 10px 0; color: #333;">Linear Regression</h3>
                            <p style="font-size: 0.9rem; color: #666; margin-bottom: 20px;">Master the basics of predictive modeling. Learn about cost functions, gradient descent, and fitting lines to data.</p>
                            <button id="start-regression" class="btn-primary" style="
                                display: block; 
                                width: 100%;
                                text-align: center; 
                                padding: 12px; 
                                background: #2b2b2b; 
                                color: white; 
                                border: none; 
                                border-radius: 6px; 
                                cursor: pointer;
                                font-weight: 500;
                            ">Start Experiment</button>
                        </div>
                    </div>

                    <!-- Experiment 2 -->
                    <div class="exp-card" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); transition: transform 0.2s;">
                        <div style="height: 120px; background: linear-gradient(135deg, #576A8F 0%, #8ca1c9 100%); display: flex; align-items: center; justify-content: center;">
                            <span style="font-size: 3rem; color: white;">🧠</span>
                        </div>
                        <div style="padding: 20px;">
                            <h3 style="margin: 0 0 10px 0; color: #333;">Neural Networks (ANN)</h3>
                            <p style="font-size: 0.9rem; color: #666; margin-bottom: 20px;">Visualize the architecture of a brain-inspired network. understand layers, nodes, weights, and forward propagation.</p>
                            <button id="start-ann" class="btn-primary" style="
                                display: block; 
                                width: 100%;
                                text-align: center; 
                                padding: 12px; 
                                background: #2b2b2b; 
                                color: white; 
                                border: none; 
                                border-radius: 6px; 
                                cursor: pointer;
                                font-weight: 500;
                            ">Start Experiment</button>
                        </div>
                    </div>

                    <!-- Experiment 3 -->
                    <div class="exp-card" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); transition: transform 0.2s;">
                        <div style="height: 120px; background: linear-gradient(135deg, #00c853 0%, #69f0ae 100%); display: flex; align-items: center; justify-content: center;">
                            <span style="font-size: 3rem; color: white;">💠</span>
                        </div>
                        <div style="padding: 20px;">
                            <h3 style="margin: 0 0 10px 0; color: #333;">K-Means Clustering</h3>
                            <p style="font-size: 0.9rem; color: #666; margin-bottom: 20px;">Explore unsupervised learning. Watch how centroids move to group similar data points together automatically.</p>
                            <button id="start-kmeans" class="btn-primary" style="
                                display: block; 
                                width: 100%;
                                text-align: center; 
                                padding: 12px; 
                                background: #2b2b2b; 
                                color: white; 
                                border: none; 
                                border-radius: 6px; 
                                cursor: pointer;
                                font-weight: 500;
                            ">Start Experiment</button>
                        </div>
                    </div>

                </div>
            </div>
            
            <style>
                .exp-card:hover { transform: translateY(-5px); }
            </style>
        `;

        this.setupInteractions();
    }

    setupInteractions() {
        document.getElementById('btn-back-dashboard').onclick = () => {
            window.location.hash = '/dashboard';
        };

        document.getElementById('start-regression').onclick = () => {
            window.location.hash = '/experiment/linear-regression';
        };

        document.getElementById('start-ann').onclick = () => {
            window.location.hash = '/experiment/ann';
        };

        document.getElementById('start-kmeans').onclick = () => {
            window.location.hash = '/experiment/kmeans';
        };
    }
}
