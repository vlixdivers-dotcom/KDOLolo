import EnemyFlying from './EnemyFlying.js';
import ASSETS from '../assets.js';

export default class ShieldedEnemy extends EnemyFlying {


    constructor(scene, x, y) {
        super(scene, x, y, ASSETS.image.enemyLBD.key);
        this.setTexture( ASSETS.image.enemyShielded.key);
        this.health = 3;

    }
}