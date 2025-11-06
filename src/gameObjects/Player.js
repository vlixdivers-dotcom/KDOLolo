import ASSETS from '../assets.js';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    velocityIncrement = 50;
    velocityMax = 500;
    drag = 1000;
    fireRate = 10;
    fireCounter = 0;
    health = 1;

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

        this.checkInput();
    }

    checkInput() {
        const cursors = this.scene.cursors; // get cursors object from Game scene
        const leftKey = cursors.left.isDown;
        const rightKey = cursors.right.isDown;
        const upKey = cursors.up.isDown;
        const downKey = cursors.down.isDown;
        const spaceKey = cursors.space.isDown;

        const pointer = this.scene.input.activePointer;


        const moveDirection = { x: 0, y: 0 }; // default move direction

        // if (leftKey) moveDirection.x--;
        // if (rightKey) moveDirection.x++;
        // if (upKey) moveDirection.y--;
        // if (downKey) moveDirection.y++;

        if (pointer.isDown) {
            this.fire();
            console.log("body position = " + this.body.position.x + "pointer position = " + pointer.x);
            this.x = pointer.x;
            
        }
        // if (spaceKey || pointer.isDown) this.fire();

        // this.body.velocity.x += moveDirection.x * this.velocityIncrement; // increase horizontal velocity
        // this.body.velocity.y += moveDirection.y * this.velocityIncrement; // increase vertical velocity
    }

    fire() {
        if (this.fireCounter > 0) return;

        this.fireCounter = this.fireRate;

        this.scene.fireBullet(this.x, this.y);
    }

    hit(damage) {
        this.health -= damage;

        if (this.health <= 0) this.die();
    }

    die() {
        this.scene.addExplosion(this.x, this.y);
        this.destroy(); // destroy sprite so it is no longer updated
    }
}