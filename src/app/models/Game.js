import BaseModel from './BaseModel';

let STATES = [
    "main menu",
    "lobby",
    "playing"
];

export default class extends BaseModel {

    constructor() {
        super(STATES)
        this.state = "main menu";
    }

    checkPlayerAction(p) {
        if(this.currentState === "playing") {
            if(this._room.currentState === "idle") {
                let readyToMove = true;
                for(let player of this.players.values()) {
                    readyToMove = readyToMove && player.currentAction.get("action") === "ready";
                }

                if(readyToMove) {
                    this._lookForTrouble();
                }
            } else if (this._room.currentState === "battle") {
                let actionName = p.currentAction.get("action");
                if(actionName !== "thinking" && p.readyToAttack) {
                    this._playerAction(p);
                }
            }
        }
    }

    _startPlaying() {
        // Create a room
        this._room        = new Room();
        this._ui          = new Ui();
        this.currentState = "playing";

        for(let player of this.players.values()) {
            player.currentState = "idle";
        }
    }

    _lookForTrouble() {
        // Set room to moving
        this._room.currentState = "moving";
        this._moveTimer = this._rng.quick()*200;

        // Set players to walking
        for(let player of this.players.values()) {
            player.resetActionCycle();
            player.currentState = "walking";
        }

        // Create enemies
        let enemy = new Enemy();
        this.emit("add-enemy", enemy);

        this._enemies = new Set([
            enemy
        ]);

    }

    _startBattle() {
        this._room.currentState = "battle";
        this._ui.setBattleOptions();

        for(let player of this.players.values()) {
            player.beginCombat();

            player.onCooldown = ()=>{
                this.checkPlayerAction(player);
                this.emit("player-cooldown", player);
            };

            player.chargeCooldown();
        }

        for(let enemy of this.enemies.values()) {
            enemy.onCooldown = ()=>{
                let players = [...this.players.values()];
                players.sort((a,b) => {return a.name > b.name});
                let targetPlayer = players[parseInt(this._rng.quick()*players.length)];
                targetPlayer.damage();
                enemy.chargeCooldown();
            };

            enemy.chargeCooldown();
        }

        this.emit('start-battle');
    }

    _playerAction(p) {
        let action = p.currentAction;
        if(action.get("action") === "attack") {
            p.walkForward(()=>{
                p.attack(()=>{
                    Logger.debug("Game ATTACK");
                    this._combatPhase();
                    p.nextActionCycle();
                    p.walkBack(()=>{
                        if(this._room.currentState === "idle") {
                            p.endCombat();
                        }
                    });
                });
            });
        } else {
            p.nextActionCycle();
        }
    }

    _combatPhase() {
        let shouldEndBattle = true;
        for(let enemy of this._enemies.values()) {
            enemy.health--;
            shouldEndBattle = shouldEndBattle && (enemy.health <= 0);
        }

        if(shouldEndBattle) {
            this._endBattle();
        }
    }

    _endBattle() {
        for(let player of this.players.values()) {
            if(player.currentState === "idle") {
                player.endCombat();
            }
        }

        this._enemies = new Set();

        this._room.currentState = "idle";
        this._ui.setIdleOptions();
        this.emit('end-battle');
    }

    /**
     * Adds a player regardless of remote or local
     */
    addPlayer(p, isLocal) {
        let yPos = 2.2;

        if(this._players.size) {
            yPos += 1.1*this._players.size;
        }

        p.yPos = yPos;

        this._players.set(p.id, p);
        if(isLocal) {
            this._localPlayer = p;
        }
        this.emit("add-player", p);
    }

    // Simulation Logic
    tick() {
        if(this._room && this._room.currentState === "moving") {
            this._moveTimer--;
            if(this._moveTimer <= 0) {
                this._startBattle();
            }
        }

        let objs = [...this.players.values()];

        if(this.enemies)
            objs = [...objs, ...this.enemies.values()];

        for(let obj of objs)
            obj.tick();
    }

    handleMessage(message) {
        if(message.event === "tick") {
            this.tick();
        } else {
            Logger.debug("Message recieved from dispatcher");
            Logger.log(message);

            // Assign event name and data
            let eventName = message.event;
            let data = message.data;

            if(eventName == "game-start") {
                this.currentState = "main menu";
            } else if(message.event == "game-state") {
                this.currentState = data;
            } else if(message.event == "rng-set") {
                this._rng = data;
                window.rng = this._rng;
            } else if(message.event == "add-player") {
                let p = new Player(data.name, message.from, data.job);
                this.addPlayer(p, data.isLocal);
            } else if(message.event == "player-remove") {
                // Remove the peers player from the game
                // Get and then delete player
                let playerToRemove = this._players.get(data);
                let playerRemoved  = this._players.delete(playerToRemove.id);

                // Make sure the player was there
                if(playerRemoved) {
                    this.emit("remove-player", playerToRemove);

                    if(this.currentState == "lobby") {
                        for(let player of this._players.values()) {
                            player.currentState = "idle";
                        }
                    }
                }
            } else if(message.event == "player-job") {
                // Alter player's job
                let player = this._players.get(message.from);
                player.job = data.job;
            } else if(message.event == "player-state") {
                // Alter player's state
                let player = this._players.get(message.from);
                player.currentState = data.state;

                // Progress Game logic accoridng to player state
                this.checkPlayerState();
            } else if(message.event == "player-action") {
                let player = this._players.get(message.from);

                let action = Immutable.Map(data);
                player.currentAction = action;

                this.checkPlayerAction(player);
            }
        }
    }
}
