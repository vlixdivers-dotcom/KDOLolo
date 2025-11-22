import EnemyFlying from './EnemyFlying.js';
import ASSETS from '../assets.js';

export default class ShieldedEnemy extends EnemyFlying {


    constructor(scene, x, y) {
        super(scene, x, y, ASSETS.image.enemyShielded.key);
        this.setTexture(ASSETS.image.enemyShielded.key);
        this.setSize(32, 64);

        this.baseImage = ASSETS.image.enemyShielded.key;
        this.touchedImage = ASSETS.image.enemyShieldedTouched.key;

        this.health = 3;

    }
}