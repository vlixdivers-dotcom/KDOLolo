import ASSETS from '../assets.js';


export default class PlayerBullet extends Phaser.Physics.Arcade.Sprite {
    power = 1;
    moveVelocity = 1000;

    constructor(scene, x, y, power) {
        super(scene, x, y, ASSETS.spritesheet.bullets.key, power-1);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setSize(12, 32); // resize hitbox to correctly fit image instead of using the entire tile size
        this.setDepth(10);
        this.scene = scene;
        this.setVelocityY(-this.moveVelocity); // bullet vertical speed
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        this.checkWorldBounds();
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

    remove() {
        this.scene.removeBullet(this);
    }
}