export default class {
    constructor() {
    }

    /**
     * Loads the resource by filename
     * @return Promise
     */
    loadResource(name, resource) {
        return new Promise((res, rej)=>{
            let img = document.createElement('img');
            img.onload = function() {
                console.log(`resource loaded: ${resource}`);
                res(this);
            }
            img.src = './dist/resources/images/' + resource;

            // If this is the first resource create it
            if(!this._resources) {
                this._resources = new Map();
            }
            this._resources.set(name, img);
        });
    }
}

