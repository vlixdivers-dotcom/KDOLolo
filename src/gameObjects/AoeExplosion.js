import ASSETS from '../assets.js';
import ANIMATION from '../animation.js';

export default class AoeExplosion extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, 30 + (scene.scale.width/2) , y, ASSETS.spritesheet.aoeExplosion.key, 1);
        console.log(`${x} ${y}`);
        scene.add.existing(this);

        this.setDepth(10);
        this.anims.play(ANIMATION.aoeExplosion.key);


        // cleanup after animation completes
        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, function () {
            this.destroy();
        }, this);
    }
}