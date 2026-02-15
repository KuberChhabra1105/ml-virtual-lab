import './styles/theme.css';
import './styles/global.css';

import Experience from './engine/experience.js';
import Scroll from './scroll.js';


import HeroSection from './sections/hero.js';
import AboutSection from './sections/about.js';
import SimulationsSection from './sections/simulations.js';
import LabEntrySection from './sections/labEntry.js';

import Nav from './ui/nav.js';
import Loader from './ui/loader.js';

// Select canvas
const canvas = document.querySelector('canvas#webgl');

// Initialize core systems
const experience = new Experience(canvas);
new Scroll();
new Nav();
new Loader();

// Create sections
experience.hero = new HeroSection(experience);
experience.about = new AboutSection(experience);
experience.simulations = new SimulationsSection(experience);
experience.labEntry = new LabEntrySection(experience);
