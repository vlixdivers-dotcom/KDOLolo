import ASSETS from '../assets.js';
import Upgrade from './UpgradePickup.js';

export default class MainWeaponFireRateUpgrade extends Upgrade {

    fireRateUpgradeValue = 1;

    constructor(scene, x, y, speed) {
        super(scene, x, y, speed);
        
        this.setTexture(ASSETS.spritesheet.tiles.key,2);
        this.setData('timedType', 'mainWeaponFireRate');
        this.timeBeforeRemove = 10;
    }


    SetUpgradeEffect(player) {
        this.baseValue = player.GetFireRate();
        player.setFireRate(this.baseValue - this.fireRateUpgradeValue);
        player.StartTimedUpgradeCounter(this);
    }

}