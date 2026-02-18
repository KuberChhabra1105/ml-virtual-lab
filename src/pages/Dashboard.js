export default class Dashboard {
    constructor() {
        this.app = document.querySelector('#app');
        this.render();
    }

    render() {
        this.app.innerHTML = `
            <div class="dashboard-container" style="padding: 100px 20px; max-width: 1200px; margin: 0 auto;">
                <header style="margin-bottom: 40px;">
                    <h1>Welcome, Student</h1>
                    <p>Track your progress and access your enrolled labs.</p>
                </header>

                <div class="dashboard-grid">
                    <div class="lab-card" style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h2>Machine Learning Lab</h2>
                        <p style="margin: 15px 0; color: #666;">Fundamentals of ML: Regression, Neural Networks, and Clustering.</p>
                        <button id="btn-enter-lab" class="btn-primary" style="display: inline-block; padding: 10px 20px; background: #FF7444; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 1rem;">Enter Lab</button>
                    </div>
                </div>

                <div style="margin-top: 50px;">
                    <button id="logout-btn" style="background: transparent; border: none; color: #576A8F; cursor: pointer; font-size: 1rem;">← Logout</button>
                </div>
            </div>
        `;

        this.setupInteractions();
    }

    setupInteractions() {
        // Force a small delay to ensure DOM is ready
        setTimeout(() => {
            const enterBtn = document.getElementById('btn-enter-lab');
            if (enterBtn) {
                enterBtn.onclick = () => {
                    console.log("Navigating to Lab...");
                    window.location.hash = '/lab/machine-learning';
                };
            }

            const logoutBtn = document.getElementById('logout-btn');
            if (logoutBtn) {
                logoutBtn.onclick = () => {
                    localStorage.removeItem('user');
                    window.location.hash = '/';
                    window.location.reload(); // Hard reset to clear 3D cache
                };
            }
        }, 100);
    }
}
