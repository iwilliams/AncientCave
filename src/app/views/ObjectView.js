export default class {

    constructor(object) {
        this._object = object;
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

    /**
     * Initialize all resources associated with this object
     */
    init() {
        return new Promise((res, rej)=>{
            res();
            let resourcePromises = [];
            for(let image of this._images) {
                ResourceService.loadImage(image.name, image.image);
            }

            Promise.all(resourcePromises).then((images)=>{
                for(let image of images) {
                    if(!this._resources)
                        this._resources = new Map();

                    this._resources.set(image.name, image.image);
                }

                // Resolve Promise
                res();
            });
        });
    }
}
