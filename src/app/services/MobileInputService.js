import Config       from '../../Config';
import EventEmitter from '../mixins/EventEmitter';

export default class extends EventEmitter {
    constructor() {
        super();
        document.getElementById("up").addEventListener("click", ()=>{
            this.emit("up")
        });
        document.getElementById("down").addEventListener("click", ()=>{
            this.emit("down")
        });
        document.getElementById("left").addEventListener("click", ()=>{
            this.emit("left")
        });
        document.getElementById("right").addEventListener("click", ()=>{
            this.emit("right")
        });
        document.getElementById("confirm").addEventListener("click", ()=>{
            this.emit("confirm")
        });
    }
}
