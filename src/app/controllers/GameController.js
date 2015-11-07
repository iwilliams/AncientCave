// Import Utils
import Utils    from '../services/Utils';
import Logger   from '../services/Logger';
import Config   from '../../Config';
import Rng      from '../services/Rng';

// Import Controllers
import HostController     from './HostController';
import ClientController   from './ClientController';

// Import Models
import Player   from '../models/Player';
import Monster  from '../models/Monster';
import Room     from '../models/Room';
import Ui       from '../models/Ui';
import BattleUi from '../models/BattleUi';

export default class {

    // Pass ctx
    constructor(ctx) {
        this._ctx = ctx;
    }

    /**
     * Initialize this Controller
     *
     * @return Promise
     *
     */
    init() {
        let queryParams = Utils.parseQuery(window.location.search);

        this.players = new Map();
        let promises = [];

        let yOffset = 1.60;
        let xOffset = Config.TILE_X - 3;

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
        promises.push(p1.init());

        //let p2 = new Player(++xOffset, ++yOffset, "Stooks", Player.JOB_CLAIRVOYANT);
        //players.push(p2);
        //let p3 = new Player(--xOffset, ++yOffset, "Mecha", Player.JOB_VILLAIN);
        //players.push(p3);
        //let p4 = new Player(++xOffset, ++yOffset, "Space Squid", Player.JOB_HERBALIST);
        //players.push(p4);

        // Init all players
        //promises.push(p2.init());
        //promises.push(p3.init());
        //promises.push(p4.init());

        //// Add a baddie
        this.monster = new Monster(1, 1, Monster.TYPE_WURM);
        promises.push(this.monster.init());
        this.monster.hide();

        // Initialize UI
        this.ui = new BattleUi(0, 0, 0, 0, this.players, this.players);
        promises.push(this.ui.init());

        // Initialize Room
        this.room = new Room(Room.TYPE_CAVE, [this.monster], this.players);
        promises.push(this.room.init());

        // Create all objects
        this.objects = [this.room, ...this.players.values(), this.monster, this.ui];
        //this.objects = [...this.players.values()];
        //this.objects = [this.room, ...this.players, this.necro];

        // Attach input listeners
        // using https://dmauro.github.io/Keypress/
        this.listener = new window.keypress.Listener();
        this.attachInput(this.listener);

        // Initialize Multiplayer Controller
        if(queryParams.host) {
            this.multiplayerController = new ClientController(queryParams.host, p1);
            this.multiplayerController.on("host-connect", (seed)=>{
                this.rng = new Rng(seed);
                this.room.setNextEncounter(this.rng.next() * 1000);
            });
        } else {
            this.rng = new Rng("TEST");
            this.room.setNextEncounter(this.rng.next() * 1000);
            this.multiplayerController = new HostController(p1, "TEST");
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

        return Promise.all(promises);
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

    tick(frame) {
        // Calculate if we should be moving based on player state
        // NEEDS TO BE MOVED
        let shouldMove = true;
        for (let player of this.players.values()) {
            shouldMove = shouldMove && player.ready;
        }

        // Decide if we need to start or end combat
        if(shouldMove && !this.room.isLooking) {
            this.room.lookForTrouble();
        } else if(!this.room.isLooking && shouldMove) {
            this.room.startLooking();
        }

        // Render everything
        this.objects.forEach((object)=>{
            this._ctx.save();
            object.tick();
            object.render(this._ctx, frame);
            this._ctx.restore();
        });
    }
}
