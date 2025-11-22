import EnemyFlying from './EnemyFlying.js';
import ASSETS from '../assets.js';

export default class TankEnemy extends EnemyFlying {
    constructor(scene, x, y) {
        super(scene, x, y, ASSETS.image.enemyTank.key);


        this.setSize(176, 128);
        this.setTexture(ASSETS.image.enemyTank.key);
        this.baseImage = ASSETS.image.enemyTank.key;
        this.touchedImage = ASSETS.image.enemyTankTouched.key;
        this.health = 100;

    }


}