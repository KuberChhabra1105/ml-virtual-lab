import './styles/theme.css';
import './styles/global.css';
import Experience from './engine/experience.js';
import router from './router/index.js';

// Select canvas
const canvas = document.querySelector('canvas#webgl');

if (canvas) {
    // Initialize 3D Background (Persistent)
    const experience = new Experience(canvas);
    window.experience = experience; // For debugging

    // Initialize Router
    router.resolve();
} else {
    console.error("Canvas #webgl not found!");
}