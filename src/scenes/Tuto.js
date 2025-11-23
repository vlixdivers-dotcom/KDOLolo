import ASSETS from '../assets.js';

export class Tuto extends Phaser.Scene {

    fadeOutStarted = false;
    fadeInStarted = false;
    ableToStart = false;
    timerBeforeAbleToStart = 3;
    blinkingTextTimer = 10;
    pressPlayText;

    constructor() {
        super('Tuto');
    }

    create() {
        this.scale.lockOrientation('portrait');
        this.add.image(0, 0, ASSETS.image.tuto.key).setOrigin(0);


        // this.music = this.sound.add(ASSETS.audio.introMusic.key, { loop: true, mute: false, volume: 0 });
        // this.music.play();
    }

    update(time, delta) {


        if (this.timerBeforeAbleToStart > 0 && this.ableToStart == false) {
            this.timerBeforeAbleToStart -= delta / 1000;
        } else if (this.timerBeforeAbleToStart <= 0 && this.ableToStart == false) {
            this.ableToStart = true;
        }

        if (!this.fadeInStarted) {
            this.fadeInStarted = true
            this.cameras.getCamera('').fadeIn(200, 0, 0, 0, (camera, progress) => {
                // this.music.volume = progress;
            }).on("camerafadeincomplete", () => {
            })
        }


        if (this.fadeOutStarted || !this.ableToStart) return;
        this.cursor = this.input.activePointer;
        if (this.cursor.isDown) {
            this.cameras.getCamera('').fadeOut(1000, 0, 0, 0, (camera, progress) => {
            }).on("camerafadeoutcomplete", () => {
                this.scene.start('Game');
            })
            this.fadeOutStarted = true;
        }
    }
}
