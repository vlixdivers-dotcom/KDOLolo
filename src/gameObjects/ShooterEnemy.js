import EnemyFlying from './EnemyFlying.js';
import ASSETS from '../assets.js';

export default class ShooterEnemy extends EnemyFlying {

    fireCounterMin = 3; // minimum fire rate
    fireCounterMax = 5; // maximum fire rate

    constructor(scene, x, y) {
        super(scene, x, y, ASSETS.image.enemyLBD.key);
        this.setTexture(ASSETS.image.enemyLBD.key);
        this.setSize(32, 64);
        this.health = 2;
        this.baseImage = ASSETS.image.enemyLBD.key;
        this.touchedImage = ASSETS.image.enemyLBDTouched.key;
        this.fireCounter = Phaser.Math.RND.between(this.fireCounterMin, this.fireCounterMax);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        if (this.fireCounter > 0) this.fireCounter -= delta / 1000;

        if (this.fireCounter <= 0) this.fire();

    }

    fire() {
        this.fireCounter = Phaser.Math.RND.between(this.fireCounterMin, this.fireCounterMax);
        this.scene.fireEnemyBullet(this.x, this.y, this.power);
    }
}