import ASSETS from '../assets.js';

export class GameOver extends Phaser.Scene {

    fadeOutStarted = false;
    fadeInStarted = false;
    ableToStart = false;
    timerBeforeAbleToStart = 2;
    blinkingTextTimer = 10;
    pressPlayText;

    constructor() {
        super('GameOver');
    }

    create() {
        this.scale.lockOrientation('portrait');
       this.add.image(0, 0, ASSETS.image.gameOver.key).setOrigin(0);

        this.pressPlayText = this.add.text(this.scale.width / 2, this.scale.height / 2 + 175, 'APPUIE POUR CONTINUER LA LUTTE', {
            fontFamily: 'vintageWarehouse', fontSize: '10px', fill: '#FFF', stroke: '#000000', strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5).setDepth(30);

        this.music = this.sound.add(ASSETS.audio.introMusic.key, { loop: true, mute: false, volume: 0 });
        this.music.play();
    }

    update(time, delta) {

        this.blinkingTextTimer -= delta / 1000;

        this.pressPlayText.setAlpha(Phaser.Math.FloorTo((this.blinkingTextTimer) % 2));


        if (this.blinkingTextTimer <= 0) this.blinkingTextTimer = 10;

        if (!this.fadeInStarted) {
            this.fadeInStarted = true
            this.cameras.getCamera('').fadeIn(1500, 0, 0, 0, (camera, progress) => {
                this.music.volume = progress;
            }).on("camerafadeincomplete", () => {
                this.ableToStart = true;
            })
        }


        if (this.fadeOutStarted || !this.ableToStart) return;
        this.cursor = this.input.activePointer;
        if (this.cursor.isDown) {
            this.cameras.getCamera('').fadeOut(2000, 0, 0, 0, (camera, progress) => {
                this.music.volume = 1 - progress;
            }).on("camerafadeoutcomplete", () => {
                this.scene.start('Game');
            })
            this.fadeOutStarted = true;
        }
    }
}
