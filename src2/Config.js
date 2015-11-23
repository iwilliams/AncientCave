let config = {};
/**
 * Should be set up to recalculate on the fly when things chagne.
 * Not working right at all for window size chagnes.
 */
config.API_KEY = "xahxx0yuy5le4s4i";

// 16x9 Aspect Ratio
config.ASPECT_WIDTH  = 1920;
config.ASPECT_HEIGHT = 1080;

config.TILE_X = 16; // MUST BE MULTIPLE OF 16
config.TILE_Y = (config.TILE_X*config.ASPECT_HEIGHT)/config.ASPECT_WIDTH;

config.calculate = function() {
    // Horizontal or Vertical percentage that the game view should occupy
    config.PERCENTAGE = 1;

    // Caclulate canvas width and height according to above percentage and aspect ratio
    config.CANVAS_WIDTH  = window.outerWidth*config.PERCENTAGE;
    config.CANVAS_HEIGHT = (config.CANVAS_WIDTH*config.ASPECT_HEIGHT)/config.ASPECT_WIDTH;

    // Make sure the window will fit vertically
    if(config.CANVAS_HEIGHT > window.innerHeight) {
        config.CANVAS_HEIGHT  = window.outerHeight*config.PERCENTAGE;
        config.CANVAS_WIDTH = (config.CANVAS_HEIGHT*config.ASPECT_WIDTH)/config.ASPECT_HEIGHT;
    }

    // Determine Sprite Scaling
    config.SPRITE_SIZE   = 24;
    config.SPRITE_SCALE  = config.CANVAS_WIDTH/(config.TILE_X*config.SPRITE_SIZE);
    config.TILE_SIZE     = config.SPRITE_SIZE*config.SPRITE_SCALE;

    // Set FPS
    config.FPS = 30;
}

config.calculate();

export default config;
