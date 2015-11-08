import Engine from './app/services/Engine';

// Create new instance of game
var engine = new Engine(document.body);

// Initialize it
engine.init();

// DEBUG
window.engine = engine;

