import ASSETS from '../assets.js';
import ANIMATION from '../animation.js';


export default class Presentateur extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, ASSETS.spritesheet.presentateur.key, 1);

        scene.add.existing(this);

        this.setDepth(100);
        //this.anims.play(ANIMATION.presentateurSheet.key);
        this.scene = scene;

    }


    setAnimFrame(_nb){
        this.setFrame(_nb);
    }
}