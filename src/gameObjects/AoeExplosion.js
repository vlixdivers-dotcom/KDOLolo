import ASSETS from '../assets.js';
import ANIMATION from '../animation.js';

export default class AoeExplosion extends Phaser.Physics.Arcade.Sprite {
    power = 1;
    constructor(scene, x, y, power) {
        super(scene,  (scene.scale.width / 2) + 10, y - 50, ASSETS.spritesheet.aoeExplosion.key, 1);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setSize(320, 64 * 3);
        this.setDepth(10);
        this.anims.play(ANIMATION.aoeExplosion.key);
        this.scene = scene;
        
        this.power = power;

        // cleanup after animation completes
        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, function () {
            this.scene.removeAoeExplosion(this);
            this.destroy();
        }, this);
    }

    getPower() {
        return this.power;
    }

    remove() {
    }
}