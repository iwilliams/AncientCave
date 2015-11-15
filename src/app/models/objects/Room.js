import BaseObject     from './BaseObject'; // Can't call this Object b/c of conflict xD
import RoomRenderer from '../views/RoomRenderer';
import Logger       from '../services/Logger';

let FILLABLE = new Set([
    "enemies",
    "type",
    "isMoving",
    "isBattle",
    "isLooking",
    "nextEncounter",
    "encounterRate",
    "tickCount"
]);

class Room extends BaseObject {

    // Static Room Types
    static get TYPE_CAVE() {
        return {
            floor: 'goodtile.png',
            wall: 'shitwall.png'
        };
    }

    static get TYPE_TEMPLE() {
        return {
            floor: 'grass.png',
            wall: 'pillars.png'
        };
    }

    constructor(type, enemies, players, encounterRate) {
        super(FILLABLE);
        this.players        = players;
        this.type = type;
        this.isMoving       = false;
        this.isBattle       = false;
        this.enemies        = enemies;
        this.isLooking      = false;
        this.encounterRate = encounterRate || 50;
    }

    attachEvents(eventBuss) {
        eventBuss.on("player-state", ()=> {
            let ready = true;

            for(let player of this.players.values()) {
                ready = player.ready && ready;
            }

            if(ready) {
                if(!this.isLooking && !this.isBattle) {
                    this.setNextEncounter(100);
                    this.lookForTrouble();
                } else {

                }
                eventBuss.emit("room-state");
            }
        });
    }

    init() {
        this.renderer = new RoomRenderer(this);
        return this.renderer.init();
    }

    lookForTrouble() {
        if (this.isLooking) return;
        if (this.isBattle) this.endBattle();
        this.isMoving  = true;
        this.isLooking = true;
    }

    stopLooking() {
        if (!this.isLooking) return;
        this.isMoving  = false;
        this.isLooking = false;
        this.players.forEach((player)=>{
            player.isWalking = !player.isWalking;
        });
    }

    endBattle() {
        if(this.isBattle) {
            this.isBattle = false;
            this.enemies.forEach((enemy)=>{
                enemy.toggle();
            });
            this.emit("end-battle");
        }
    }

    startBattle() {
        this.tickCount = 0;
        this.isBattle  = true;
        this.isLooking = false;
        this.isMoving  = false;
        this.enemies.forEach((enemy)=>{
            enemy.toggle();
        });
        this.players.forEach((player)=>{
            player.isWalking = false;
            player.ready     = false;
            player.action    = "wait";
        });
        this.emit("start-battle");
    }

    setNextEncounter(ticks) {
        this.nextEncounter = ticks;
    }

    tick() {
        this.tickCount = this.tickCount || 0;
        if(this.isLooking) {
            this.tickCount++;
            if(this.tickCount > this.nextEncounter) {
                this.startBattle();
            }
        }
    }

    render(ctx, frame) {
        this.renderer.render(ctx, frame);
    }
}

export default Room;
