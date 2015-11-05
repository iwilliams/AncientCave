import Logger   from './Logger';
import HostController   from '../controllers/HostController';
import ClientController   from '../controllers/ClientController';
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

    // http://codetheory.in/controlling-the-frame-rate-with-requestanimationframe/
    loop() {
        requestAnimationFrame(this.loop.bind(this));

        let now = Date.now();
        let delta = now - this.then;
        //console.log(delta);

        if (delta > this.interval) {
            this.then = now - (delta % this.interval);

            this.frame = this.frame || 1;
            this.frame = (this.frame%Config.FPS) ? this.frame : 1;

            this._canvas.width = Config.CANVAS_WIDTH;
            this._canvas.height = Config.CANVAS_HEIGHT;
            this._ctx.imageSmoothingEnabled = false;

            this._ctx.fillStyle = "#000";
            this._ctx.fillRect(0, 0, Config.CANVAS_WIDTH, Config.CANVAS_HEIGHT);

            this._canvas.width = Config.CANVAS_WIDTH;
            this._canvas.height = Config.CANVAS_HEIGHT;
            this._ctx.imageSmoothingEnabled = false;

            let shouldMove = true;
            for (let player of this.players.values()) {
                shouldMove = shouldMove && player.ready;
            }

            if(!this.room.isLooking && shouldMove) {
                this.room.lookForTrouble();
            } else if(this.room.isLooking && !shouldMove) {
                this.room.stopLooking();
            }

            this.objects.forEach((object)=>{
                this._ctx.save();
                object.tick();
                object.render(this._ctx, this.frame);
                this._ctx.restore();
            });

            let time_el = (this.then - this.first)/1000;
            ++this.counter;
            let fps = parseInt(this.counter/time_el);

            let fontSize          = 5*Config.SPRITE_SCALE;
            this._ctx.font        = fontSize + "px Courier New";
            this._ctx.fillStyle   = "#ffffff";

            this._ctx.fillText(this.frame + "/" + Config.FPS + " " + fps + "fps", 20, 20);

            this.frame++;
        }
    }

    /**
     * Resize Handler
     * @todo: does this belong here?
     */
    resize() {
        Config.calculate();
        this._canvas.width = Config.CANVAS_WIDTH;
        this._canvas.height = Config.CANVAS_HEIGHT;
        this._ctx.imageSmoothingEnabled = false;
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
        let queryParams = Utils.parseQuery(window.location.search);

        this._element.appendChild(this._canvas);
        this._ctx = this._canvas.getContext('2d');
        this._ctx.imageSmoothingEnabled = false;

        this.players = new Map();
        let promises = [];

        let yOffset = 1.60;
        let xOffset = Config.TILE_X - 3;

        console.log(queryParams.job);
        // Create 4 players
        let job = "";
        if(queryParams.job == "knight") {
            console.log("knight");
            job = Player.JOB_KNIGHT;
        } else if (queryParams.job == "villain") {
            job = Player.JOB_VILLAIN;
        } else if (queryParams.job == "herbalist") {
            job = Player.JOB_HERBALIST;
        } else if (queryParams.job == "clairvoyant") {
            job = Player.JOB_CLAIRVOYANT;
        }

        let p1 = new Player(xOffset, yOffset, queryParams.name, job);
        this.players.set(p1.name, p1);

        //let p2 = new Player(++xOffset, ++yOffset, "Stooks", Player.JOB_CLAIRVOYANT);
        //players.push(p2);
        //let p3 = new Player(--xOffset, ++yOffset, "Mecha", Player.JOB_VILLAIN);
        //players.push(p3);
        //let p4 = new Player(++xOffset, ++yOffset, "Space Squid", Player.JOB_HERBALIST);
        //players.push(p4);

        // Init all players
        promises.push(p1.init());
        //promises.push(p2.init());
        //promises.push(p3.init());
        //promises.push(p4.init());

        //// Add a baddie
        this.necro = new Monster(1, 1);
        promises.push(this.necro.init());
        this.necro.hide();

        // Initialize UI
        this.ui = new BattleUi(0, 0, 0, 0, this.players, this.players);
        promises.push(this.ui.init());

        // Initialize Room
        this.room = new Room(Room.TYPE_CAVE, [this.necro], this.players);
        promises.push(this.room.init());

        // Create all objects
        this.objects = [this.room, ...this.players.values(), this.necro, this.ui];
        //this.objects = [this.room, ...this.players, this.necro];

        // Attach input listeners
        // using https://dmauro.github.io/Keypress/
        this.listener = new window.keypress.Listener();
        this.attachInput(this.listener);

        // Initialize Multiplayer Controller
        if(queryParams.host) {
            this.multiplayerController = new ClientController(queryParams.host, p1);
        } else {
            this.multiplayerController = new HostController(p1);
        }

        this.multiplayerController.on("player-connect", (player)=>{
            console.log("add player");
            let p = new Player(xOffset, ++yOffset, player.name, player.job);
            p.init().then(()=>{
                this.players.set(p.name, p);
                this.objects.push(p);
            });
        });

        this.multiplayerController.on("player-state", (player)=>{
            this.players.get(player.name).ready = player.ready;
            console.log(this.players);
        });

        this.multiplayerController.on("click", (player)=>{
            if(!this.room.isLooking) {
                this.room.lookForTrouble();
            } else {
                //this.room.endBattle();
                this.room.stopLooking();//lookForTrouble();
            }
        });

        promises.push(this.multiplayerController.init());

        Promise.all(promises).then(()=>{
            this.then = Date.now();
            this.interval = 1000/Config.FPS;
            this.first = this.then;
            this.counter = 0;
            window.requestAnimationFrame(this.loop.bind(this));
        });



        // Attach resize event
        //window.resize = this.resize.bind(this);
        window.addEventListener("resize", this.resize.bind(this));

        // Attach Fullscreen event
        document.getElementsByTagName("button")[0].addEventListener("click", this.requestFullscreen.bind(this));

        Logger.banner('Game Started');
    }

    attachInput(listener) {

        function lookForTrouble() {
            this.multiplayerController.click();
            if(!this.room.isLooking) {
                this.room.lookForTrouble();
            } else {
                //this.room.endBattle();
                this.room.stopLooking();//lookForTrouble();
            }
        }

        window.onclick = () => {
            this.multiplayerController.click();

        };

        //listener.simple_combo("t", ()=>{
            //lookForTrouble();
        //});
    }
}
