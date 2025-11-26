import ASSETS from '../assets.js';
export class EndGame extends Phaser.Scene {
    music;
    fadeInStarted = false;

    music;

    textImage;
    textImageMinZoom = 0.85;
    textImageMaxZoom = 1.15;
    textImageZooming = true;
    ableToStart = false;
    constructor() {
        super('EndGame');
    }

    preload() {

    }

    create() {
        this.textImage = this.add.image(this.scale.width / 2, 150, ASSETS.image.finText.key).setOrigin(0.5).setDepth(20);
        this.add.image(0, 0, ASSETS.image.fin.key).setOrigin(0).setDepth(10);
        this.music = this.sound.add(ASSETS.audio.introMusic.key, { loop: true, mute: false, volume: 0 });
        this.music.play();
    }


    update(time, delta) {




        if (!this.fadeInStarted) {
            this.fadeInStarted = true
            this.cameras.getCamera('').fadeIn(1500, 1, 1, 1, (camera, progress) => {
                this.music.volume = progress;
            }).on("camerafadeincomplete", () => {
                this.ableToStart = true;
            })
        }

  

        if (this.textImageZooming) {
            if (this.textImage.scaleX >= this.textImageMaxZoom) {
                this.textImageZooming = false;
            }
            else {
                this.textImage.scaleX += (delta / 2500);
                this.textImage.scaleY += (delta / 2500);
            }
        }
        else {
            if (this.textImage.scaleX <= this.textImageMinZoom) {
                this.textImageZooming = true;
            }
            else {
                this.textImage.scaleX -= (delta / 2500);
                this.textImage.scaleY -= (delta / 2500);
            }
        }

        if (this.fadeOutStarted || this.ableToStart) return;
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
