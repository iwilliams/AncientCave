// Import Utils
import Utils    from '../services/Utils';
import Logger   from '../services/Logger';
import Config   from '../../Config';
import Rng      from '../services/Rng';

// Import Controllers
import MultiplayerController     from './MultiplayerController';
import InputController           from './InputController';

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

        let yOffset = 2.5;
        let xOffset = Config.TILE_X - 3;

        // Create 4 players
        let job = "";
        if(queryParams.job == "knight") {
            job = Player.JOB_KNIGHT;
        } else if (queryParams.job == "villain") {
            job = Player.JOB_VILLAIN;
        } else if (queryParams.job == "herbalist") {
            job = Player.JOB_HERBALIST;
        } else if (queryParams.job == "clairvoyant") {
            job = Player.JOB_CLAIRVOYANT;
        }

        // Initialize Local Player
        let p1 = new Player(xOffset, yOffset, queryParams.name, job);
        this.players.set(p1.name, p1);
        promises.push(p1.init());
        window.player = p1;

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

        this.room.on("start-battle", ()=>{
            this.ui.toggleBattleOptions();
        });

        this.room.on("end-battle", ()=>{
            this.ui.toggleBattleOptions();
        });

        // Create all objects
        this.objects = new Set([
            this.room,
            ...this.players.values(),
            this.monster,
            this.ui
        ]);

        // Initialize Multiplayer Controller
        if(queryParams.host) {
            this.multiplayerController = new MultiplayerController(p1, null, queryParams.host);
        } else {
            let seed = "TEST";
            this.rng = new Rng(seed);
            this.multiplayerController = new MultiplayerController(p1, 'host', null, seed);
        }
        promises.push(this.multiplayerController.init());


        ///////////////////////////////////
        // LISTEN FOR MULTIPLAYER EVENTS //
        ///////////////////////////////////

        // Add player when peer connects
        this.multiplayerController.on("peer-connect", (message)=>{
            Logger.debug("Add player");
            let p = new Player(xOffset, ++yOffset, message.data.player.name, message.data.player.job);
            p.init().then(()=>{
                Logger.debug(`Add player with id ${message.from}`);
                this.players.set(message.from, p);
                Logger.log(this.players);
                this.objects.add(p);
            });

            // If this is our first connection and we don't already have a seed then set it
            if(!this.rng) {
                this.rng = new Rng(message.data.seed);
            }
        });

        // Remove the peers player from the game
        this.multiplayerController.on("peer-disconnect", (peer)=>{
            let playerToDelete = this.players.get(peer)
            this.players.delete(peer);
            this.objects.delete(playerToDelete);
        });

        // Sync Player state
        this.multiplayerController.on("player-state", (message)=>{
            Logger.debug("Set player to Ready");
            let player = this.players.get(message.from);
            player.ready = message.data.player.ready;
            player.action = message.data.player.action;

            if(!this.room.isBattle) {
                if(player.ready) player.action = "ready";
                this.updateRoomState();
            }
        });

        /////////////////////////////
        // LISTEN FOR INPUT EVENTS //
        /////////////////////////////

        // Initialize Input Controller
        this.inputController = new InputController();

        this.inputController.on('click', ()=>{
            if(!this.room.isBattle) {
                p1.ready = !p1.ready;
                if(player.ready) player.action = "ready";
                this.multiplayerController.click();
                this.updateRoomState();
            }
        });

        this.inputController.on('enter', ()=>{
            if(this.room.isBattle) {
                p1.ready = !p1.ready;
                p1.setAction(this.ui.getSelectedBattleOption());
                this.multiplayerController.click();
            }
        });

        this.inputController.on('up', ()=>{
            Logger.debug('up');
            if(this.ui.showBattleOptions) {
                this.ui.selectedBattleOptionIndex = (this.ui.selectedBattleOptionIndex+2)%4;
            }
        });

        this.inputController.on('down', ()=>{
            Logger.debug('down');
            if(this.ui.showBattleOptions) {
                this.ui.selectedBattleOptionIndex = (this.ui.selectedBattleOptionIndex+2)%4;
            }
        });

        this.inputController.on('left', ()=>{
            Logger.debug('left');
            if(this.ui.showBattleOptions) {
                if(this.ui.selectedBattleOptionIndex == 0) this.ui.selectedBattleOptionIndex = 1;
                else if(this.ui.selectedBattleOptionIndex == 1) this.ui.selectedBattleOptionIndex = 0;
                else if(this.ui.selectedBattleOptionIndex == 3) this.ui.selectedBattleOptionIndex = 2;
                else if(this.ui.selectedBattleOptionIndex == 2) this.ui.selectedBattleOptionIndex = 3;
            }
        });

        this.inputController.on('right', ()=>{
            Logger.debug('right');
            if(this.ui.showBattleOptions) {
                if(this.ui.selectedBattleOptionIndex == 0) this.ui.selectedBattleOptionIndex = 1;
                else if(this.ui.selectedBattleOptionIndex == 1) this.ui.selectedBattleOptionIndex = 0;
                else if(this.ui.selectedBattleOptionIndex == 3) this.ui.selectedBattleOptionIndex = 2;
                else if(this.ui.selectedBattleOptionIndex == 2) this.ui.selectedBattleOptionIndex = 3;
            }
        });

        return Promise.all(promises);
    }

    updateRoomState() {
        // Calculate if we should be moving based on player state
        // NEEDS TO BE MOVED
        let shouldMove = true;
        for (let player of this.players.values()) {
            shouldMove = shouldMove && player.ready;
        }

        // Decide if we need to start or end combat
        if(shouldMove && !this.room.isLooking) {
            this.room.setNextEncounter(this.rng.next() * 500);
            this.room.lookForTrouble();
        } else if(!this.room.isLooking && shouldMove) {
            this.room.setNextEncounter(this.rng.next() * 500);
            this.room.startLooking();
        }
    }


    /**
     * Progress Game Logic by calling tick on every object
     */
    tick(frame) {
        // Render everything
        this.objects.forEach((object)=>{
            this._ctx.save();
            object.tick();
            object.render(this._ctx, frame);
            this._ctx.restore();
        });
    }
}
