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

            this.objects.forEach((object)=>{
                this._ctx.save();
                object.tick();
                object.render(this._ctx, this.frame);
                this._ctx.restore();
            });

            let time_el = (this.then - this.first)/1000;
            ++this.counter;
            let fps = this.counter/time_el

            let fontSize          = 5*Config.SPRITE_SCALE;
            this._ctx.font        = fontSize + "px Courier New";
            this._ctx.fillStyle   = "#ffffff";

            this._ctx.fillText(this.frame + "/" + Config.FPS + " " + fps, 20, 20);

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
        console.log(queryParams);

        var peer = new Peer({
            key: Config.API_KEY,
            //secure: true,
            debug: 3
        });

        if(!queryParams.p) {
            peer.on('open', function(id) {
              console.log('My peer ID is: ' + id);
            });

            peer.on('connection', (connection)=>{
                // This `connection` is a DataConnection object with which we can send
                // data.
                // The `open` event firing means that the connection is now ready to
                // transmit data.
                //
                this.connection = connection;
                connection.on('open', ()=>{
                    // Send 'Hello' on the connection.
                    //connection.send('Hello Client!');

                    let clientPlayer = new Player(++xOffset, ++yOffset, "Stooks", Player.JOB_CLAIRVOYANT);
                    clientPlayer.init().then(()=>{
                        console.log("push new player");
                        this.objects.push(clientPlayer);
                        this.players.push(clientPlayer);
                    });
                });

                connection.on('data', (data)=>{
                    // Append the data to body.
                    console.log(data);
                    if(!this.room.isLooking) {
                        this.room.lookForTrouble();
                    } else {
                        //this.room.endBattle();
                        this.room.stopLooking();//lookForTrouble();
                    }
                });

                // Attach input listeners
                // using https://dmauro.github.io/Keypress/
                this.listener = new window.keypress.Listener();
                this.attachInput(this.listener);
            });
        } else {
            let c = peer.connect(queryParams.p);
            this.connection = c;
            c.on('data', (data)=>{
                // When we receive 'Hello', send ' world'.
                console.log(data);
                //c.send('Hello Host!');

                if(!this.room.isLooking) {
                    this.room.lookForTrouble();
                } else {
                    //this.room.endBattle();
                    this.room.stopLooking();//lookForTrouble();
                }
            });

            // Attach input listeners
            // using https://dmauro.github.io/Keypress/
            this.listener = new window.keypress.Listener();
            this.attachInput(this.listener);
        }

        this._element.appendChild(this._canvas);
        this._ctx = this._canvas.getContext('2d');
        this._ctx.imageSmoothingEnabled = false;

        let players = [];
        let playerPromises = [];

        let yOffset = 1.60;
        let xOffset = Config.TILE_X - 3;

        // Create 4 players
        let p1 = new Player(xOffset, yOffset, "ROMEDA", Player.JOB_HERBALIST);
        players.push(p1);
        //let p2 = new Player(++xOffset, ++yOffset, "Stooks", Player.JOB_CLAIRVOYANT);
        //players.push(p2);
        //let p3 = new Player(--xOffset, ++yOffset, "Mecha", Player.JOB_HERBALIST);
        //players.push(p3);
        //let p4 = new Player(++xOffset, ++yOffset, "Space Squid", Player.JOB_CLAIRVOYANT);
        //players.push(p4);

        // Init all players
        playerPromises.push(p1.init());
        //playerPromises.push(p2.init());
        //playerPromises.push(p3.init());
        //playerPromises.push(p4.init());

        this.players = players;

        //// Add a baddie
        this.necro = new Monster(1, 1);
        playerPromises.push(this.necro.init());
        this.necro.hide();

        // Initialize UI
        this.ui = new BattleUi(0, 0, 0, 0, players, players);
        playerPromises.push(this.ui.init());

        // Initialize Room
        this.room = new Room(Room.TYPE_CAVE, [this.necro], this.players);
        playerPromises.push(this.room.init());

        // Create all objects
        this.objects = [this.room, ...this.players, this.necro, this.ui];
        //this.objects = [this.room, ...this.players, this.necro];


        Promise.all(playerPromises).then(()=>{
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
        window.onclick = () => {

            this.connection.send('Hello Client!');

            if(!this.room.isLooking) {
                this.room.lookForTrouble();
            } else {
                //this.room.endBattle();
                this.room.stopLooking();//lookForTrouble();
            }
        };

        listener.simple_combo("t", ()=>{
            // Toggle walking and battle
            //if(!this.room.isLooking) {
                //this.room.lookForTrouble();
            //} else {
                //this.room.endBattle();
                //this.room.stopLooking();lookForTrouble();
            //}
            //this.necro.toggle();
        });
    }
}
