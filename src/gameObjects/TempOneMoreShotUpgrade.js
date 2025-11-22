import ASSETS from '../assets.js';
import Upgrade from './UpgradePickup.js';

export default class TempOneMoreShotUpgrade extends Upgrade {


    constructor(scene, x, y, speed) {
        super(scene, x, y, speed);
        
        this.setTexture(ASSETS.image.tempMultiShot.key);
        this.setData('timedType', 'oneMoreShot');
        this.timeBeforeRemove = 30;
    }


    SetUpgradeEffect(player) {
        player.setChanceToMultiShots(player.getChanceToMultiShots() + 20);
        player.setNbShots(player.getNBShots() + 1);
        player.StartTimedUpgradeCounter(this);
    }

}