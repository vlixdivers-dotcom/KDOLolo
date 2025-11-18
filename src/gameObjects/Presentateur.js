import ASSETS from '../assets.js';
import ANIMATION from '../animation.js';


export default class Presentateur extends Phaser.Physics.Arcade.Sprite {
    presentateurBoard;
    presentateurText;

    newText = false;
    timeBeforeNewLetter = 0.2;
    timeBeforeNewLetterCounter = 0;
    textToPrint = "Vous voulez dire ?";
    textToPrintIndex = 0;
    constructor(scene, x, y, board) {
        super(scene, x, y, ASSETS.spritesheet.presentateur.key, 3);

        scene.add.existing(this);

        this.setDepth(100);
        //this.anims.play(ANIMATION.presentateurSheet.key);
        this.scene = scene;

        this.presentateurBoard = board;

        this.presentateurText = this.scene.add.text(this.presentateurBoard.x + this.presentateurBoard.width / 2,
            this.presentateurBoard.y + this.presentateurBoard.height / 2, "Vous voulez dire ?", {
            fontFamily: 'Arial', fontSize: 20, color: '#ffffff',
            stroke: '#000000', strokeThickness: 2,
            align: 'center'
        }).setOrigin(0.5).setDepth(120)
        this.presentateurText.text = "";

    }


    setAnimFrame(_nb) {
        this.setFrame(_nb);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        if (this.newText) {
            this.timeBeforeNewLetterCounter -= delta / 1000;

            if (this.timeBeforeNewLetterCounter <= 0) {
                this.presentateurText.text += this.textToPrint[this.textToPrintIndex];
                this.timeBeforeNewLetterCounter = this.timeBeforeNewLetter;
                this.textToPrintIndex++;
            }

            if (this.textToPrintIndex >= this.textToPrint.length) {
                this.newText = false;
                this.textToPrintIndex = 0;
            }
        }
    }


    setNewTextToPrint(text) {
        this.textToPrint = text;
        this.newText = true;
        this.textToPrintIndex = 0;
    }
}