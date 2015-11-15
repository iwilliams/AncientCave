import Ui from './Ui';
import BattleUiRenderer from '../views/BattleUiRenderer';

export default class extends Ui {
    /**
     * Creates a UI window
     *
     * @param width            - % Width of the UI Element
     * @param height           - % Height of the UI Element
     * @param offsetX          - % X offset
     * @param offsetY          - % Y offset
     * @param playerCharacters - array of playerCharacters
     * @param enemies          - array of playerCharacters
     */
    constructor(width, height, offsetX, offsetY, playerCharacters, enemies) {
        super(width, height, offsetX, offsetY);

        this.playerCharacters = playerCharacters;
        this.enemies          = enemies;
    }

    /**
     * Initialization Promise
     */
    init() {
        return new Promise((res, rej) => {
            this.renderer = new BattleUiRenderer(this);
            this.renderer.init()
                .then(res);
        });
    }
}
