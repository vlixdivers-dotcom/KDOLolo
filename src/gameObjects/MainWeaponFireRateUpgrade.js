import ASSETS from '../assets.js';
import Upgrade from './UpgradePickup.js';

export default class MainWeaponFireRateUpgrade extends Upgrade {

    fireRateUpgradeValue = 0.2;

    constructor(scene, x, y, speed) {
        super(scene, x, y, speed);
        
        this.setTexture(ASSETS.image.tempFireRate.key);
        this.setData('timedType', 'mainWeaponFireRate');
        this.timeBeforeRemove = 15;
    }


    SetUpgradeEffect(player) {
        player.setFireRate(player.GetFireRate() - this.fireRateUpgradeValue);
        player.StartTimedUpgradeCounter(this);
    }

}