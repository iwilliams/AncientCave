import BaseObject   from './BaseObject';
import RoomRenderer from '../views/RoomRenderer';

export default class extends BaseObject {

    // Static Room Types
    static get TYPE_CAVE() {
        return {
            floor: '/dist/resources/images/goodtile.png',
            wall: '/dist/resources/images/pillars.png'
        };
    }
    static get TYPE_OUTSIDE() { return '/dist/resources/images/grass.png';}

    constructor(type, enemies, players, encounterRate) {
        super();

        this.floorResource  = type.floor;
        this.wallResource   = type.wall;

        this.isMoving       = false;
        this.isBattle       = false;
        this.enemies        = enemies;
        this.players        = players;
        this.isLooking      = false;

        this.encounterRate = encounterRate || 50;
        this.calculateNextEncounter();
    }

    init() {
        return new Promise((res, rej) => {
            this.renderer = new RoomRenderer(this);
            this.renderer.init()
                .then(res);
        });
    }

    lookForTrouble() {
        if (this.isLooking) return;
        if (this.isBattle) this.endBattle();
        this.isMoving  = true;
        this.isLooking = true;
        this.players.forEach((player)=>{
            player.isWalking = !player.isWalking;
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

            this.calculateNextEncounter();
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
        });
    }

    calculateNextEncounter() {
        var myRand = Math.floor(Math.random()*100/this.encounterRate);
        this.nextEncounter = myRand*50 + 25;
    }

    tick() {
        this.tickCount = this.tickCount || 0;
        if(this.isLooking) {
            //this.tickCount++;
            if(this.tickCount > this.nextEncounter) {
                this.startBattle();
            }
        }
    }

    render(ctx, frame) {
        this.renderer.render(ctx, frame);
    }
}
