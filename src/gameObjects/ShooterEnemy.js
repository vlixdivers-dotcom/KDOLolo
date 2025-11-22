import EnemyFlying from './EnemyFlying.js';
import ASSETS from '../assets.js';

export default class ShooterEnemy extends EnemyFlying {

    fireCounterMin = 1; // minimum fire rate
    fireCounterMax = 3; // maximum fire rate

    constructor(scene, x, y) {
        super(scene, x, y, ASSETS.image.enemyLBD.key);
        this.setTexture(ASSETS.image.enemyLBD.key);
        this.health = 2;

        this.fireCounter = Phaser.Math.RND.between(this.fireCounterMin, this.fireCounterMax);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        if (this.fireCounter > 0) this.fireCounter -= delta / 1000;

        if (this.fireCounter <= 0) this.fire();

        console.log(this.fireCounter)
    }

    fire() {
        this.fireCounter = Phaser.Math.RND.between(this.fireCounterMin, this.fireCounterMax);
        this.scene.fireEnemyBullet(this.x, this.y, this.power);
    }
}