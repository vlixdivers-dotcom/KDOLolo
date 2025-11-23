import ASSETS from '../assets.js';


export default class PlayerBullet extends Phaser.Physics.Arcade.Sprite {
    power = 1;
    moveVelocity = 600;

    explosive = false;
    piercing = false;

    enemiesTouched = 0;
    maxTouch = 2;

    timeAfterTrigger = 0;


    explosionAnim;
    constructor(scene, x, y, power, explosive = false, piercing = false) {
        super(scene, x, y, ASSETS.spritesheet.bullets.key, 0);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.power = power;

        this.explosive = explosive;
        this.piercing = piercing;
        this.setSize(12 * (explosive ? 5.2 : 1), 32 * (explosive ? 1 : 1)); // resize hitbox to correctly fit image instead of using the entire tile size
        this.setDepth(10);
        this.scene = scene;
        this.setVelocityY(-this.moveVelocity); // bullet vertical speed


    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        this.checkWorldBounds();

        if (this.enemiesTouched > 0) {
            this.timeAfterTrigger += delta / 1000;
            if (this.timeAfterTrigger > 0.05) this.removeCollision();
        }
    }

    getPower() {
        return this.power;
    }

    // is this bullet above the screen?
    checkWorldBounds() {
        if (this.y < 0) {
            this.remove();
        }
    }


    getIsPiercing() {
        return this.piercing;
    }

    getIsExplosive() {
        return this.explosive;
    }

    getEnemiesTouched() {
        this.timeAfterTrigger = 0;
        return this.enemiesTouched;
    }

    setEnemiesTouched(value) {
        if (this.explosive && this.enemiesTouched === 0)
        {
            this.scene.addExplosion(this.x,this.y)
        }
        this.enemiesTouched = value;

        if (this.explosive && this.enemiesTouched > this.maxTouch) {
            this.remove();
        }
    }


    remove() {
        this.scene.removeBullet(this);

    
    }


    removeCollision() {

        this.remove();

    }

}