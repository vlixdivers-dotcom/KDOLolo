import ASSETS from '../assets.js';


export default class PlayerBullet extends Phaser.Physics.Arcade.Sprite {
    power = 1;
    moveVelocity = 600;

    explosive =false;
    piercing =false;

    constructor(scene, x, y, power, explosive = false, piercing = false) {
        super(scene, x, y, ASSETS.spritesheet.bullets.key, 0);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.power = power;

        this.explosive = explosive;
        this.piercing = piercing;
        console.log(power);
        this.setSize(12 * (explosive ? 5.2 : 1 ) , 32 * (explosive ? 2 : 1 )); // resize hitbox to correctly fit image instead of using the entire tile size
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


    getIsPiercing(){
        return this.piercing;
    }

    remove() {
        this.scene.removeBullet(this);

        if (this.explosive){

        }
    }
}