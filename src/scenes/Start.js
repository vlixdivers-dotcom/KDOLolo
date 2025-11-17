import ASSETS from '../assets.js';


export class Start extends Phaser.Scene {
    cursor;

    heads = [];

    music;
    constructor() {
        super('Start');

        console.log('yo');



    }

    create() {
        this.scale.lockOrientation('portrait');


        this.add.image(0, 0, ASSETS.image.startBackground.key).setOrigin(0).setDepth(10);
        this.add.image(this.scale.width / 2, this.scale.height / 2, ASSETS.image.startTitle.key).setOrigin(0.5).setDepth(20);

        this.music = this.sound.add(ASSETS.audio.introMusic.key,{loop:true});

        this.music.play();


        this.heads = [this.add.image(50, 480, ASSETS.image.tete1.key).setOrigin(0.5, 1).setDepth(20),
        this.add.image(100, 480, ASSETS.image.tete2.key).setOrigin(0.5, 1).setDepth(20),
        this.add.image(200, 480, ASSETS.image.tete3.key).setOrigin(0.5, 1).setDepth(20),
        this.add.image(250, 480, ASSETS.image.tete4.key).setOrigin(0.5, 1).setDepth(20)];
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
        this.cursor = this.input.activePointer;
        if (this.cursor.isDown){
        this.music.stop();
        this.scene.start('Game');
        } 
    }

}
