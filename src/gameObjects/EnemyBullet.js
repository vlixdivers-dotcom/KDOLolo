import ASSETS from '../assets.js';

export default class EnemyBullet extends Phaser.Physics.Arcade.Sprite {
    power = 1;
    moveVelocity = 200;

    constructor(scene, x, y, power) {
        const tileId = 11;
        super(scene, x, y, ASSETS.spritesheet.tiles.key, tileId + power);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.power = power;
        this.setSize(16, 24); // resize hitbox to correctly fit image instead of using the entire tile size
        this.setFlipY(true); // flip image vertically to point downwards
        this.setDepth(10);
        this.scene = scene;
        this.setVelocityY(this.moveVelocity * power * 0.5); // bullet vertical speed
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        this.checkWorldBounds();
    }

    getPower() {
        return this.power;
    }

    // is this bullet below the screen?
    checkWorldBounds() {
        if (this.y > this.scene.scale.height) {
            this.die();
        }
    }

    die() {
        this.scene.removeEnemyBullet(this);
    }
}