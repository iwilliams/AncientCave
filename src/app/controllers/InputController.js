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
    }
}
