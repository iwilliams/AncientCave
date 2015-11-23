export default class {
    constructor(seed) {
        console.log("RNG CREATE");
        this._rng = new RNG(seed);
        window.rng = this._rng;
    }

    next() {
        return this._rng.random();
    }
}
