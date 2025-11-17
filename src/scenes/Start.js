export class Start extends Phaser.Scene {
    cursor;
    constructor() {
        super('Start');

        console.log('yo');


    }

    create() {
        this.scale.lockOrientation('portrait');
        this.cursor = this.input.activePointer;
        // this.background = this.add.tileSprite(640, 360, 1280, 720, 'background');

        // const logo = this.add.image(640, 200, 'logo');

        // const ship = this.add.sprite(640, 360, 'ship');

        // ship.anims.create({
        //     key: 'fly',
        //     frames: this.anims.generateFrameNumbers('ship', { start: 0, end: 2 }),
        //     frameRate: 15,
        //     repeat: -1
        // });

        // ship.play('fly');

        // this.tweens.add({
        //     targets: logo,
        //     y: 400,
        //     duration: 1500,
        //     ease: 'Sine.inOut',
        //     yoyo: true,
        //     loop: -1
        // });
    }

    update() {
        if (this.cursor.isDown) this.scene.start('Game');
    }

}
