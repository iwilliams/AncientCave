import Config       from '../../Config';

export default class {
    constructor() {
        this._soundPath = "./dist/resources/sounds/";
    }

    loadResources() {
        let promises = [];

        let sounds = [
            {
                "name": "menu-move",
                "url": this._soundPath + "menu-move.mp3"
            },
            {
                "name": "menu-select",
                "url": this._soundPath + "menu-select.mp3"
            },
            {
                "name": "cooldown-ready",
                "url": this._soundPath + "cooldown-ready.mp3"
            }
        ];

        this._sounds = new Map();

        for(let sound of sounds) {
            promises.push(new Promise((res, rej)=>{
                // Load the sound
                this._sounds.set(sound.name, new Howl({
                    urls: [sound.url],
                    onload: res,
                    onloaderror: rej
                }));
            }));
        }

        return Promise.all(promises);
    }

    play(soundName) {
        let sound = this._sounds.get(soundName);
        sound.play();
    }
}
