import ASSETS from '../assets.js';
import Upgrade from './UpgradePickup.js';

export default class TempShieldUpgrade extends Upgrade {

    fireRateUpgradeValue = 1;

    constructor(scene, x, y, speed) {
        super(scene, x, y, speed);
        
        this.setTexture(ASSETS.spritesheet.tiles.key,2);
        this.setData('timedType', 'shield');
        this.timeBeforeRemove = 3;
    }


    SetUpgradeEffect(player) {
        player.setFireRate(player.GetFireRate() - this.fireRateUpgradeValue);
        player.StartTimedUpgradeCounter(this);
    }

}