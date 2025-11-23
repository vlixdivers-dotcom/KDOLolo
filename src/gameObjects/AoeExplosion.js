import ASSETS from '../assets.js';
import ANIMATION from '../animation.js';

export default class AoeExplosion extends Phaser.Physics.Arcade.Sprite {
    power = 1;
    enemiesTouched = 0;
    maxTouch = 10;
    constructor(scene, x, y, power) {
        super(scene, (scene.scale.width / 2) + 10, y - 50, ASSETS.spritesheet.aoeExplosion.key, 1);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setSize(320, 64 * 3);
        this.setDepth(10);
        this.anims.play(ANIMATION.aoeExplosion.key);
        this.scene = scene;


        // cleanup after animation completes
        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, function () {
            this.scene.removeAoeExplosion(this);
        }, this);
        this.maxTouch = 10 + (1 * this.scene.getCurrentRound());

    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.checkWorldBounds();

    }

    getPower() {
        return this.power;
    }

    getEnemiesTouched() {
        return this.enemiesTouched;
    }

    checkWorldBounds() {
        if (this.y < 0) {
            //this.scene.removeAoeExplosion(this);
        }
    }
    setEnemiesTouched(value) {
        this.enemiesTouched = value;
    }


    canDealDamage() {
        return this.enemiesTouched <= this.maxTouch;
    }
}