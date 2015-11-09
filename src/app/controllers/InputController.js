import Config       from '../../Config';
import EventEmitter from '../mixins/EventEmitter';


export default class extends EventEmitter {
    constructor(player, id) {
        super();

        // Attach input listeners
        // using https://dmauro.github.io/Keypress/
        this.listener = new window.keypress.Listener();
        this.attachInput(this.listener);
    }

    /**
     * Initialize this Controller
     *
     * @return Promise
     *
     */
    init() {

    }

    attachInput(listener) {
        window.onclick = () => {
            this.emit("click");
        };

        listener.simple_combo("t", ()=>{
            this.emit("click");
        });

        listener.simple_combo("up", ()=>{
            this.emit("up");
        });

        listener.simple_combo("down", ()=>{
            this.emit("down");
        });

        listener.simple_combo("left", ()=>{
            this.emit("left");
        });

        listener.simple_combo("right", ()=>{
            this.emit("right");
        });

        listener.simple_combo("enter", ()=>{
            this.emit("enter");
        });
    }
}
