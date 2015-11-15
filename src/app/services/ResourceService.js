import Logger from './Logger.js';

let resourceDir = './dist/resources/';

export default class {

    /**
     * Loads the resource by filename
     * @return Promise
     */
    static loadImage(resource) {
        return new Promise((res, rej)=>{
            let img = document.createElement('img');
            img.onload = function() {
                Logger.log(`resource loaded: ${resource}`);
                res(img);
            }
            img.src = resourceDir + 'images/' + resource;
        });
    }
}

