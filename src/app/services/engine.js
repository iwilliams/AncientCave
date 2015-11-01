import Logger   from './Logger';
import Player   from '../models/Player';
import Monster  from '../models/Monster';
import Room     from '../models/Room';
import Ui       from '../models/Ui';
import BattleUi from '../models/BattleUi';
import Utils    from './Utils';
import Config   from '../../Config';

export default class {
    constructor(element) {
        this._element = element;
        this._canvas = document.createElement('canvas');

        this._canvas.width = Config.CANVAS_WIDTH;
        this._canvas.height = Config.CANVAS_HEIGHT;
    }

    loop() {
        this.frame = this.frame || 1;
        this.frame = (this.frame%Config.FPS) ? this.frame : 1;
        this._ctx.fillStyle = "#000";
        this._ctx.fillRect(0, 0, Config.CANVAS_WIDTH, Config.CANVAS_HEIGHT);

        this.objects.forEach((object)=>{
            this._ctx.save();
            object.tick();
            object.render(this._ctx, this.frame);
            this._ctx.restore();
        });

        this.frame++;

        setTimeout(()=>{
            window.requestAnimationFrame(this.loop.bind(this));
        }, 1000/Config.FPS);
    }

    /**
     * Resize Handler
     * @todo: does this belong here?
     */
    resize() {
        console.log("resize");
        Config.calculate();
        this._canvas.width = Config.CANVAS_WIDTH;
        this._canvas.height = Config.CANVAS_HEIGHT;
    }

    /**
     * Request the game goes full screen, will fullscreen the canvas element
     * Found: https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
     */
    requestFullscreen() {
        if (this._canvas.requestFullscreen) {
            this._canvas.requestFullscreen();
        } else if (this._canvas.msRequestFullscreen) {
            this._canvas.msRequestFullscreen();
        } else if (this._canvas.mozRequestFullScreen) {
            this._canvas.mozRequestFullScreen();
        } else if (this._canvas.webkitRequestFullscreen) {
            this._canvas.webkitRequestFullscreen();
        }
    }

    /**
     * Initialize the engine
     */
    init() {
        this._element.appendChild(this._canvas);
        this._ctx = this._canvas.getContext('2d');
        this._ctx.imageSmoothingEnabled = false;

        let players = [];
        let playerPromises = [];

         //Initialize all players
        //for(let y = 0; y < Config.TILE_Y - 2; y++) {
            //for(let x = 0; x < Config.TILE_X; x++) {
                //let p = new Player(x, y);
                //players.push(p);
                //playerPromises.push(p.init());
            //}
        //}

        // Create 4 players
        let p1 = new Player(13, 3, "ROMEDA");
        players.push(p1);
        let p2 = new Player(14, 4, "Stooks");
        players.push(p2);
        let p3 = new Player(13, 5, "Mecha");
        players.push(p3);
        let p4 = new Player(14, 6, "Space Squid");
        players.push(p4);

        // Init all players
        playerPromises.push(p1.init());
        playerPromises.push(p2.init());
        playerPromises.push(p3.init());
        playerPromises.push(p4.init());

        this.players = new Set(players);

        //// Add a baddie
        this.necro = new Monster(1, 1);
        playerPromises.push(this.necro.init());
        this.necro.hide();

        // Initialize UI
        this.ui = new BattleUi(0, 0, 0, 0, players, players);
        playerPromises.push(this.ui.init());

        // Initialize Room
        this.room = new Room(Room.TYPE_OUTSIDE, [this.necro], this.players);
        playerPromises.push(this.room.init());

        // Create all objects
        this.objects = [this.room, ...this.players, this.necro, this.ui];


        Promise.all(playerPromises).then(()=>{
            window.requestAnimationFrame(this.loop.bind(this));
        });

        // Attach input listeners
        // using https://dmauro.github.io/Keypress/
        this.listener = new window.keypress.Listener();
        this.attachInput(this.listener);


        // Attach resize event
        //window.resize = this.resize.bind(this);
        window.addEventListener("resize", this.resize.bind(this));

        // Attach Fullscreen event
        document.getElementsByTagName("button")[0].addEventListener("click", this.requestFullscreen.bind(this));

        Logger.banner('Game Started');
    }

    attachInput(listener) {

        listener.register_combo({
            "keys"              : "a",
            "on_keydown"        : this.room.lookForTrouble,
            "on_keyup"          : this.room.stopLooking,
            "on_release"        : null,
            "this"              : this.room,
            "prevent_default"   : false,
            "prevent_repeat"    : true,
            "is_unordered"      : false,
            "is_counting"       : false,
            "is_exclusive"      : false,
            "is_solitary"       : false,
            "is_sequence"       : false
        });


        listener.simple_combo("t", ()=>{
            // Toggle walking and battle
            if(!this.room.isBattle) {
                this.room.lookForTrouble();
            } else {
                this.room.endBattle();
                this.room.lookForTrouble();
            }
            //this.necro.toggle();
        });
    }
}
