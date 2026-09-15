import { Titanium } from './src/Titanium.js';

// Initialize the optimizer
const smoother = new Titanium({
  intensity: 'ultra', // Options: light, medium, ultra
  fpsTarget: 120
});

// Start tracking and smoothing animations
smoother.activate();

export { Titanium } from './src/Titanium.js';
