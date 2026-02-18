import Navbar from '../components/Navbar.js';
// import AuthService from '../services/AuthService.js'; // Not needed for forced nav

export default class Home {
    constructor() {
        this.app = document.querySelector('#app');
        this.render();
    }

    render() {
        // Cleanup from Experiment Page
        document.body.classList.remove('experiment-mode');

        if (window.experience && window.experience.canvas) {
            window.experience.canvas.style.display = 'block';
        }

        this.app.innerHTML = `
            <section id="home-container" style="
                height: 100vh; 
                width: 100%;
                position: relative;
                overflow: hidden;
            ">
                <!-- Top Section: Title -->
                <div style="
                    position: absolute; 
                    top: 15%; 
                    width: 100%; 
                    text-align: center; 
                    pointer-events: none;
                ">
                    <h1 style="
                        font-size: 3.5rem; 
                        margin: 0; 
                        background: linear-gradient(to bottom, #2b2b2b, #555); 
                        -webkit-background-clip: text; 
                        -webkit-text-fill-color: transparent;
                        text-shadow: 0 10px 30px rgba(0,0,0,0.1);
                    ">Neural Architectures</h1>
                    <p style="
                        font-size: 1.2rem; 
                        color: #666; 
                        margin-top: 10px; 
                        font-weight: 300;
                    ">Interactive 3D Machine Learning Laboratory</p>
                </div>

                <!-- Bottom Section: Login Panel -->
                <div style="
                    position: absolute; 
                    bottom: 15%; 
                    left: 50%; 
                    transform: translateX(-50%);
                    width: 90%;
                    max-width: 400px;
                    z-index: 10;
                ">
                    <div class="glass-panel" style="
                        background: rgba(255, 255, 255, 0.65);
                        backdrop-filter: blur(16px);
                        -webkit-backdrop-filter: blur(16px);
                        padding: 30px;
                        border-radius: 24px;
                        border: 1px solid rgba(255, 255, 255, 0.5);
                        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                        text-align: center;
                    ">
                        <h2 style="margin-bottom: 20px; font-weight: 500; font-size: 1.5rem;">Access Laboratory</h2>
                        
                        <button id="student-login-btn" class="btn-primary" style="
                            width: 100%; 
                            padding: 14px; 
                            margin-bottom: 12px;
                            background: #FF7444; 
                            color: white; 
                            border: none; 
                            border-radius: 12px; 
                            font-weight: 600; 
                            font-size: 1rem; 
                            cursor: pointer;
                            box-shadow: 0 4px 12px rgba(255, 116, 68, 0.3);
                            transition: transform 0.1s;
                        ">Student Login</button>
                        
                        <button id="guest-access-btn" class="btn-secondary" style="
                            width: 100%; 
                            padding: 14px; 
                            background: rgba(255,255,255,0.5); 
                            color: #576A8F; 
                            border: 1px solid #576A8F; 
                            border-radius: 12px; 
                            font-weight: 600; 
                            font-size: 1rem; 
                            cursor: pointer;
                            transition: transform 0.1s;
                        ">Guest Access</button>
                    </div>
                </div>
            </section>
        `;

        new Navbar();
        this.setupDirectNavigation();
    }

    setupDirectNavigation() {
        // Force Navigation Logic
        const studentBtn = document.getElementById('student-login-btn');
        const guestBtn = document.getElementById('guest-access-btn');

        if (studentBtn) {
            studentBtn.addEventListener('click', () => {
                // 1. Force Auth State
                localStorage.setItem('user', JSON.stringify({ username: 'Student', role: 'student' }));
                // 2. Direct Navigation
                window.location.hash = '/dashboard';
            });
        }

        if (guestBtn) {
            guestBtn.addEventListener('click', () => {
                localStorage.setItem('user', JSON.stringify({ username: 'Guest', role: 'guest' }));
                window.location.hash = '/dashboard';
            });
        }
    }
}
