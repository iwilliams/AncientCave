import EventEmitter   from '../mixins/EventEmitter';
import RoomRenderer from '../views/RoomRenderer';

export default class extends EventEmitter {

    // Static Room Types
    static get TYPE_CAVE() {
        return {
            floor: 'goodtile.png',
            wall: 'pillars.png'
        };
    }

    static get TYPE_TEMPLE() {
        return {
            floor: 'grass.png',
            wall: 'pillars.png'
        };
    }

    constructor(type, enemies, players, encounterRate) {
        super();
        this.type = type;
        this.isMoving       = false;
        this.isBattle       = false;
        this.enemies        = enemies;
        this.players        = players;
        this.isLooking      = false;
        this.isVisible      = true;

        this.encounterRate = encounterRate || 50;
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
        this.players.forEach((player)=>{
            player.isWalking = !player.isWalking;
            player.action = "walk";
            console.log(player.isWalking);
        });
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
