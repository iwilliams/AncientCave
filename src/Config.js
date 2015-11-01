let config = {};
/**
 * Should be set up to recalculate on the fly when things chagne.
 * Not working right at all for window size chagnes.
 */
config.calculate = function() {
    config.PERCENTAGE = .90;

    // 16x9 Aspect Ratio
    config.ASPECT_WIDTH  = 1920;
    config.ASPECT_HEIGHT = 1080;

    config.CANVAS_WIDTH  = window.outerWidth*config.PERCENTAGE;
    config.CANVAS_HEIGHT = (config.CANVAS_WIDTH*config.ASPECT_HEIGHT)/config.ASPECT_WIDTH;

    // Make sure the window will fit vertically
    if(config.CANVAS_HEIGHT > window.innerHeight) {
        config.CANVAS_HEIGHT  = window.outerHeight*config.PERCENTAGE;
        config.CANVAS_WIDTH = (config.CANVAS_HEIGHT*config.ASPECT_WIDTH)/config.ASPECT_HEIGHT;
    }

    config.TILE_X = 16; // MUST BE MULTIPLE OF 16
    config.TILE_Y = (config.TILE_X*config.ASPECT_HEIGHT)/config.ASPECT_WIDTH;

    config.SPRITE_SIZE   = 24;
    config.SPRITE_SCALE  = config.CANVAS_WIDTH/(config.TILE_X*config.SPRITE_SIZE);

    config.FPS = 60;
}

config.calculate();

export default config;
