import ASSETS from '../assets.js';
import UpgradePickup from '../gameObjects/UpgradePickup.js';
export default class TimedUpgradePickup extends UpgradePickup {

    constructor(scene, x, y, speed) {
        super(scene, x, y, speed);
        this.setTexture(ASSETS.spritesheet.tiles.key, 2);
        this.setData('timedType', 'aoe');
    }

 



}