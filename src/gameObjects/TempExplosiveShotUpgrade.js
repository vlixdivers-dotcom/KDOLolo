import ASSETS from '../assets.js';
import Upgrade from './UpgradePickup.js';

export default class TempExplosiveShotUpgrade extends Upgrade {

    constructor(scene, x, y, speed) {
        super(scene, x, y, speed);

        this.setTexture(ASSETS.image.tempExplosiveShot.key);
        this.setData('timedType', 'explosiveShot');
        this.timeBeforeRemove = 30;
    }


    SetUpgradeEffect(player) {
        player.setChanceToExplosiveShots(player.getChanceToExplosiveShots()+20);
        player.StartTimedUpgradeCounter(this);
    }


}