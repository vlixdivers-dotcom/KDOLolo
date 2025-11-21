import ASSETS from '../assets.js';
import Upgrade from './UpgradePickup.js';

export default class AoeTimerReset extends Upgrade {

    constructor(scene, x, y, speed) {
        super(scene, x, y, speed);
        
        this.setTexture(ASSETS.image.molotovAdd.key);
    }


    SetUpgradeEffect(player) {
        player.addAMolotov();
    }

}