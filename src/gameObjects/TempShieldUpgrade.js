import ASSETS from '../assets.js';
import Upgrade from './UpgradePickup.js';

export default class TempShieldUpgrade extends Upgrade {

    fireRateUpgradeValue = 1;

    constructor(scene, x, y, speed) {
        super(scene, x, y, speed);
        
        this.setTexture(ASSETS.image.tempShield.key);
        this.setData('timedType', 'shield');
        this.timeBeforeRemove = 10;
    }


    SetUpgradeEffect(player) {
        player.putOnShield();
        player.StartTimedUpgradeCounter(this);
    }

}