import ASSETS from '../assets.js';
import Upgrade from './UpgradePickup.js';

export default class Heal extends Upgrade {


    constructor(scene, x, y, speed) {
        super(scene, x, y, speed);
        this.setTexture(ASSETS.spritesheet.tiles.key,2);
    }


    SetUpgradeEffect(player) {
        player.heal(player.getHealth()+1);
    }

}