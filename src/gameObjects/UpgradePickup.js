import ASSETS from '../assets.js';
export default class UpgradePickup extends Phaser.Physics.Arcade.Sprite {
    speed;
    timeBeforeRemove = -1;
    chanceToDrop = 16.67;

    constructor(scene, x, y, speed) {
        super(scene, x, y, ASSETS.spritesheet.pickupPlaceHolder.key);

        this.speed = 150;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setDepth(10);
        this.scene = scene;

        this.setDataEnabled();
        this.setData('timedType', 'base');

    }


    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.y += this.speed * (delta / 1000);
        if (this.y > this.scene.scale.height + 64) {
            this.remove(true);
        }
    }


    remove(outOfBounds = false) {
        this.scene.removeUpgradePickup(this);
    }

    SetUpgradeEffect(player) {
        player.StartTimedUpgradeCounter(this);
    }


    getTimeBeforeRemove() {
        return this.timeBeforeRemove;
    }

    getBaseValue() {
        return this.baseValue;
    }
}