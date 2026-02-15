import gsap from 'gsap';

export default class Loader {
    constructor(experience) {
        this.experience = experience;
        this.element = document.querySelector('#loader');
        this.text = document.querySelector('.loader-text');

        // Simple artificial delay or wait for asset manager
        // Since we don't have heavy assets yet, we'll simulate a clean intro
        this.init();
    }

    init() {
        // Initial state
        gsap.set(this.text, { y: 20, opacity: 0 });

        const tl = gsap.timeline({
            onComplete: () => {
                this.hide();
            }
        });

        tl.to(this.text, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out'
        })
            .to(this.text, {
                opacity: 0,
                y: -20,
                duration: 0.8,
                ease: 'power2.in',
                delay: 0.5
            });
    }

    hide() {
        gsap.to(this.element, {
            opacity: 0,
            duration: 1,
            ease: 'power2.inOut',
            onComplete: () => {
                this.element.style.display = 'none';
            }
        });
    }
}
