import ASSETS from '../assets.js';
import Upgrade from './UpgradePickup.js';

export default class TempExplosiveShotUpgrade extends Upgrade {

    constructor(scene, x, y, speed) {
        super(scene, x, y, speed);

        this.setTexture(ASSETS.spritesheet.tiles.key, 2);
        this.setData('timedType', 'explosiveShot');
        this.timeBeforeRemove = 3;
    }


    SetUpgradeEffect(player) {
        player.setChanceToExplosiveShot(player.getChanceToExplosiveShot()+30);
        player.StartTimedUpgradeCounter(this);
    }


}