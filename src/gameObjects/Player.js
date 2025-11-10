import ASSETS from '../assets.js';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    velocityIncrement = 50;
    velocityMax = 500;
    drag = 1000;
    fireRate = 2000;
    fireCounter = 0;
    health = 1;

    clickCount = 0;
    clickCountTimerValue = .05;
    clickCountTimer = .05;
    inPointerEvent = false;

    constructor(scene, x, y, shipId) {
        super(scene, x, y, ASSETS.spritesheet.ships.key, shipId);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true); // prevent ship from leaving the screen
        this.setDepth(100); // make ship appear on top of other game objects
        this.scene = scene;
        this.setMaxVelocity(this.velocityMax); // limit maximum speed of ship
        this.setDrag(this.drag);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if (this.fireCounter > 0) this.fireCounter--;
        this.checkInput((delta / time));
    }

    checkInput(dt) {
        const cursors = this.scene.cursors; // get cursors object from Game scene
        const pointer = this.scene.input.activePointer;

      if (this.clickCount >= 2) {
            this.clickCount = 0;
            this.clickCountTimer = this.clickCountTimerValue;
            this.launchAoe();
            return;
        }



        this.clickCountTimer -= dt;
        if (this.clickCountTimer <= 0) {
            this.clickCount = 0;
            this.clickCountTimer = this.clickCountTimerValue;
        }

        //const moveDirection = { x: 0, y: 0 }; // default move direction
        if (pointer.isDown) {
            this.fire();
            this.x = pointer.x;

            if (!this.inPointerEvent) {
                this.clickCount++;
                this.clickCountTimer = this.clickCountTimerValue;
            }
            this.inPointerEvent = true;

        } else {
            this.inPointerEvent = false;

        }

       // console.log(this.clickCount + "  " + this.clickCountTimer);
  

    }

    fire() {
        if (this.fireCounter > 0) return;

        this.fireCounter = this.fireRate;

        this.scene.fireBullet(this.x, this.y);
    }

    launchAoe(){
        this.scene.fireAoe(this.x, this.y);
    }

    hit(damage) {
        this.health -= damage;

        if (this.health <= 0) this.die();
    }
    revive() {

        this.setVisible(true); // destroy sprite so it is no longer updated
    }
    die() {
        this.scene.addExplosion(this.x, this.y);
        this.setVisible(false); // destroy sprite so it is no longer updated
    }
}