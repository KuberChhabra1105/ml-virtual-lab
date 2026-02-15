import gsap from 'gsap';

export default class Navigation {
    constructor() {
        this.toggle = document.querySelector('#nav-toggle');
        this.overlay = document.querySelector('#nav-overlay');
        this.links = document.querySelectorAll('.nav-link');
        this.isOpen = false;

        this.init();
    }

    init() {
        if (!this.toggle || !this.overlay) return;

        this.toggle.addEventListener('click', () => {
            this.toggleMenu();
        });

        this.links.forEach((link) => {
            link.addEventListener('click', () => {
                if (this.isOpen) this.toggleMenu();
            });
        });
    }

    toggleMenu() {
        this.isOpen = !this.isOpen;

        const tl = gsap.timeline();

        if (this.isOpen) {
            // Open
            tl.to(this.overlay, {
                autoAlpha: 1,
                duration: 0.5,
                ease: 'power2.inOut'
            })
                .to(this.links, {
                    y: 0,
                    opacity: 1,
                    duration: 0.4,
                    stagger: 0.1,
                    ease: 'power2.out'
                }, '-=0.2');

            // Animate hamburger to X
            gsap.to(this.toggle.children[0], { rotation: 45, y: 4, duration: 0.3 });
            gsap.to(this.toggle.children[1], { rotation: -45, y: -4, duration: 0.3 });

        } else {
            // Close
            tl.to(this.links, {
                y: 20,
                opacity: 0,
                duration: 0.3,
                stagger: 0.05,
                ease: 'power2.in'
            })
                .to(this.overlay, {
                    autoAlpha: 0,
                    duration: 0.5,
                    ease: 'power2.inOut'
                }, '-=0.1');

            // Reset hamburger
            gsap.to(this.toggle.children[0], { rotation: 0, y: 0, duration: 0.3 });
            gsap.to(this.toggle.children[1], { rotation: 0, y: 0, duration: 0.3 });
        }
    }
}
