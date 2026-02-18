import gsap from 'gsap';

export default class Nav {
    constructor() {
        this.toggle = document.querySelector('.nav-toggle');
        this.isOpen = false;
        
        if(this.toggle) {
            this.toggle.addEventListener('click', () => this.toggleMenu());
        }
    }

    toggleMenu() {
        this.isOpen = !this.isOpen;
        
        const lines = this.toggle.querySelectorAll('div');
        if(this.isOpen) {
            gsap.to(lines[0], { rotation: 45, y: 4, duration: 0.3 });
            gsap.to(lines[1], { rotation: -45, y: -4, duration: 0.3 });
        } else {
            gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3 });
            gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3 });
        }
    }
}