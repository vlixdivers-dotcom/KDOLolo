import ASSETS from '../assets.js';


export class Start extends Phaser.Scene {
    cursor;

    heads = [];

    music;

    angleToInvertRotation = 30;

    musicPlay = false;
    constructor() {
        super('Start');
    }

    create() {
        this.scale.lockOrientation('portrait');


        this.add.image(0, 0, ASSETS.image.startBackground.key).setOrigin(0).setDepth(10);
        this.add.image(this.scale.width / 2, this.scale.height / 2, ASSETS.image.startTitle.key).setOrigin(0.5).setDepth(20);
        
        this.music = this.sound.add(ASSETS.audio.introMusic.key, { loop: true,mute:false });
        this.music.play();


        this.heads = [{ image: this.add.image(22 + 30, 36 + 50, ASSETS.image.tete1.key).setOrigin(0.5).setDepth(20), rotation: 1 },
        { image: this.add.image(226 + 30, 32 + 50, ASSETS.image.tete2.key).setOrigin(0.5).setDepth(20), rotation: -1 },
        { image: this.add.image(262 + 30, 163 + 50, ASSETS.image.tete3.key).setOrigin(0.5).setDepth(20), rotation: 1 },
        { image: this.add.image(8 + 30, 183 + 50, ASSETS.image.tete4.key).setOrigin(0.5).setDepth(20), rotation: -1 },
        { image: this.add.image(49 + 30, 338 + 50, ASSETS.image.tete5.key).setOrigin(0.5).setDepth(20), rotation: 1 },
        { image: this.add.image(191 + 60, 328 + 70, ASSETS.image.tete6.key).setOrigin(0.5).setDepth(20), rotation: -1 }
        ];
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
        this.sound.unlock();

        // if (!this.musicPlay){

        //     this.musicPlay = true;
        // }

        this.heads.forEach((element) => {
            element.image.angle += (0.75 * element.rotation);
            if (element.image.angle * element.rotation > this.angleToInvertRotation) {
                element.rotation *= -1;
            }
        })


        this.cursor = this.input.activePointer;
        if (this.cursor.isDown) {
            this.scene.start('Game');
            this.music.stop();
        }
    }

}
