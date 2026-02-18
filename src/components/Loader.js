import gsap from 'gsap';

export default class Loader {
    constructor(experience) {
        // Simple entry animation
        const heroText = document.querySelector('#hero h1');
        const heroP = document.querySelector('#hero p');
        const heroBtn = document.querySelector('#start-btn');

        const tl = gsap.timeline();
        
        tl.from(heroText, { y: 50, opacity: 0, duration: 1, ease: 'power3.out' })
          .from(heroP, { y: 20, opacity: 0, duration: 0.8 }, '-=0.5')
          .from(heroBtn, { y: 20, opacity: 0, duration: 0.5 }, '-=0.3');
    }
}