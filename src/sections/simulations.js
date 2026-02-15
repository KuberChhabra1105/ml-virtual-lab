import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default class SimulationsSection {
    constructor(experience) {
        this.container = document.querySelector('#app');
        this.initDOM();
        this.initAnimations();
    }

    initDOM() {
        this.element = document.createElement('section');
        this.element.id = 'simulations';
        this.element.style.backgroundColor = '#f9f5eb'; // Slightly different shade if needed, or transparent

        // Sim cards data
        const sims = [
            { title: 'Gradient Descent', desc: 'Visualize optimization landscapes.' },
            { title: 'Neural Network', desc: 'Interactive forward & backprop.' },
            { title: 'Clustering', desc: 'K-Means and DBSCAN in 3D.' }
        ];

        let cardsHTML = sims.map(sim => `
            <div class="sim-card" style="
                background: white; 
                padding: 40px; 
                border-radius: 4px; 
                box-shadow: 0 10px 40px var(--shadow-soft);
                opacity: 0;
                transform: translateY(40px);
            ">
                <h3 class="text-h3" style="margin-bottom: 1rem;">${sim.title}</h3>
                <p class="text-body">${sim.desc}</p>
            </div>
        `).join('');

        this.element.innerHTML = `
            <div class="container">
                <h2 class="text-h2" style="text-align: center; margin-bottom: 60px;">Available Simulations</h2>
                <div class="grid" style="
                    display: grid; 
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
                    gap: 32px;
                ">
                    ${cardsHTML}
                </div>
            </div>
        `;
        this.container.appendChild(this.element);
    }

    initAnimations() {
        const cards = this.element.querySelectorAll('.sim-card');

        ScrollTrigger.batch(cards, {
            start: 'top 80%',
            onEnter: batch => gsap.to(batch, {
                opacity: 1,
                y: 0,
                stagger: 0.15,
                overwrite: true,
                duration: 0.8,
                ease: 'power3.out'
            }),
            once: true // Only animate once
        });
    }
}
