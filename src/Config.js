let config = {};

// 16x9 Aspect Ratio
config.ASPECT_WIDTH  = 1920;
config.ASPECT_HEIGHT = 1080;

config.CANVAS_WIDTH  = 1000;
config.CANVAS_HEIGHT = (config.CANVAS_WIDTH * config.ASPECT_HEIGHT)/config.ASPECT_WIDTH;

config.TILE_X = 16; // MUST BE MULTIPLE OF 16
config.TILE_Y = (config.TILE_X * config.ASPECT_HEIGHT)/config.ASPECT_WIDTH;

config.SPRITE_SIZE   = 24;
config.SPRITE_SCALE = config.CANVAS_WIDTH/(config.TILE_X * config.SPRITE_SIZE);

config.FPS = 1000/10;

export default config;
