import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default class LabEntrySection {
    constructor(experience) {
        this.container = document.querySelector('#app');
        this.initDOM();
        this.initAnimations();
    }

    initDOM() {
        this.element = document.createElement('section');
        this.element.id = 'lab-entry';
        this.element.style.minHeight = '80vh';
        this.element.style.textAlign = 'center';

        this.element.innerHTML = `
            <div class="container">
                <h2 class="text-hero" style="font-size: clamp(40px, 6vw, 80px);">Ready to Experiment?</h2>
                <button class="cta-button" style="
                    margin-top: 40px;
                    padding: 20px 48px;
                    background-color: var(--accent-strong);
                    color: white;
                    font-size: 18px;
                    font-weight: 600;
                    border-radius: 4px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    transition: transform 0.3s ease;
                ">
                    Enter Laboratory
                </button>
            </div>
        `;
        this.container.appendChild(this.element);

        // Basic hover effect for button
        const btn = this.element.querySelector('.cta-button');
        btn.addEventListener('mouseenter', () => gsap.to(btn, { scale: 1.05 }));
        btn.addEventListener('mouseleave', () => gsap.to(btn, { scale: 1 }));
    }

    initAnimations() {
        // Transition animation logic could go here
        // For now, just a reveal

        gsap.from(this.element.querySelector('h2'), {
            scrollTrigger: {
                trigger: this.element,
                start: 'top 70%'
            },
            y: 50,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out'
        });

        gsap.from(this.element.querySelector('.cta-button'), {
            scrollTrigger: {
                trigger: this.element,
                start: 'top 60%'
            },
            y: 30,
            opacity: 0,
            duration: 1,
            delay: 0.2,
            ease: 'power3.out'
        });
    }
}
