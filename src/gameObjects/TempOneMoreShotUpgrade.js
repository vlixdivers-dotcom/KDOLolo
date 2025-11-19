import ASSETS from '../assets.js';
import Upgrade from './UpgradePickup.js';

export default class TempOneMoreShotUpgrade extends Upgrade {


    constructor(scene, x, y, speed) {
        super(scene, x, y, speed);
        
        this.setTexture(ASSETS.spritesheet.tiles.key,2);
        this.setData('timedType', 'oneMoreShot');
        this.timeBeforeRemove = 3;
    }


    SetUpgradeEffect(player) {
        player.setChanceToMultiShots(100);
        player.setNBShots(player.getNBShots()+1);
        player.StartTimedUpgradeCounter(this);
    }

}