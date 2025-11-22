import ASSETS from '../assets.js';
export class EndGame extends Phaser.Scene {
    music;
    fadeInStarted = false;


    textImage;
    textImageMinZoom = 0.85;
    textImageMaxZoom = 1.15;
    textImageZooming = true;
    constructor() {
        super('EndGame');
    }

    preload() {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

        // this.load.image('background', 'assets/background.png');
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
            this.cameras.getCamera('').fadeIn(1500, 0, 0, 0, (camera, progress) => {
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

    }
}
