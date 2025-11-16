import ASSETS from '../assets.js';
export default class UpgradePickup extends Phaser.Physics.Arcade.Sprite {
    speed;
    timeBeforeRemove = 10;
    baseValue = undefined;


    constructor(scene, x, y, speed) {
        super(scene, x, y, ASSETS.spritesheet.pickupPlaceHolder.key);

        this.speed = speed;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setDepth(10);
        this.scene = scene;

        this.setDataEnabled();
        this.setData('timedType', 'mainWeaponFireRate');

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
        console.log("yeah");

        if (this.timeBeforeRemove >= 0) {
            this.baseValue = player.GetFireRate();
            player.StartTimedUpgradeCounter(this);
        }
    }


    getTimeBeforeRemove() {
        return this.timeBeforeRemove;
    }

    getBaseValue() {
        return this.baseValue;
    }
}