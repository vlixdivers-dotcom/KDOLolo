import ASSETS from '../assets.js';
import ANIMATION from '../animation.js';


export default class Presentateur extends Phaser.Physics.Arcade.Sprite {

    storySpeech = [[
        { text: "Salut les fachos", frame: 1 },
        // { text: "C'est Rascal Prout", frame: 3 },
        // { text: "Aujourd'hui dans l'actualité", frame: 2 },
        // { text: "Bla ", frame: 2 },
        // { text: "Bla ", frame: 2 },
        // { text: "Bla ", frame: 2 },
        // { text: "Truc raciste", frame: 1 },
        // { text: "Bla ", frame: 2 },
        // { text: "B... Qu'est ce que ? ", frame: 3 },
        // { text: "On nous informe", frame: 0 },
        // { text: "D'une manifestation ", frame: 0 },
        // { text: "Soudaine sur paris", frame: 2 },
        // { text: "Il y as pas à s'inquiéter", frame: 1 },
        // { text: "Les forces de l'ordre vont les tap..", frame: 1 },
        // { text: "..Maitriser", frame: 2 },
    ],
    [
        { text: "C'est Rascal Prout", frame: 3 },
    ],
    [
        { text: "C'est Rascal Prout", frame: 3 },
    ],
    [
        { text: "Je m'en vais couvrir ma maison de tranche de jambon", frame: 2 },
        { text: "de tranche de jambon", frame: 3 },
    ],
    ];

    slidingSpeech = [
        "ALERTE : Nicolas Sarkozy aurait chier liquide à cause du régime yaourt ",
        "Le gauchisme responsable du froid ?",
        "Pourquoi Clément Viktorovich parle de Lego...Affaire à suivre",
    ];
    
    textSliding = false;


    presentateurBoard;
    presentateurText;

    newText = false;
    timeBeforeNewLetter = 0.1;
    timeBeforeNewLetterCounter = 0;
    textToPrint = "Vous voulez dire ?";
    textToPrintIndex = 0;


    currentStoryDialog;
    currentStoryDialogIndex = 0;

    speaking = true;
    isSliding = false;
    slideProgress = 0;


    positionPres;
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


        this.positionPres = [this.x, this.scene.scale.width + 100];
        this.speaking = true;

    }


    setAnimFrame(_nb) {
        this.setFrame(_nb);
    }

    startStoryText(round, cursor) {

        if (this.currentStoryDialogIndex === 0) {

            this.slidePresentateur(true);

            this.textSliding = false;
            this.presentateurText.x = this.presentateurBoard.x + this.presentateurBoard.width / 2,
                this.presentateurText.y = this.presentateurBoard.y + this.presentateurBoard.height / 2
            this.currentStoryDialog = this.storySpeech[round]
            this.setNewTextToPrint(this.currentStoryDialog[this.currentStoryDialogIndex].text);
            this.setFrame(this.currentStoryDialog[this.currentStoryDialogIndex].frame);

            this.currentStoryDialogIndex += 1;
        }
        else {
            if (cursor && !this.newText) {
                if (this.currentStoryDialogIndex < this.currentStoryDialog.length) {
                    this.setNewTextToPrint(this.currentStoryDialog[this.currentStoryDialogIndex].text);
                    this.setFrame(this.currentStoryDialog[this.currentStoryDialogIndex].frame);
                    this.currentStoryDialogIndex += 1;
                }
                else {
                    this.scene.finishPresentateurDialog();
                    this.currentStoryDialog = null;
                    this.currentStoryDialogIndex = 0;
                    this.startSlidingText();
                    this.slidePresentateur(false);
                }
            }
        }
    }

    slidePresentateur(toSpeak) {
        this.speaking = toSpeak;
        this.isSliding = true;
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        if (this.newText) {
            this.timeBeforeNewLetterCounter -= (delta / 1000) * 10;

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

        if (this.textSliding) {
            this.presentateurText.x -= (delta / 1000) * 200;
            console.log(0 - this.scene.scale.width - this.presentateurText.width/2);
            if (this.presentateurText.x < 0 - this.scene.scale.width - this.presentateurText.width/2) {
                this.presentateurText.x = this.scene.scale.width + this.presentateurText.width/2 ;
            }
        }


        if (this.isSliding) {
            if (this.speaking) {
                if (this.x <= this.positionPres[0]) {
                    this.isSliding = false;
                    return;
                }

                 
                this.x -= (delta / 1000) * 1000;
            }
            else {

                if (this.x >= this.positionPres[1]) {
                    this.isSliding = false;
                    return;
                }
              
                this.x += (delta / 1000)*100;
            }
        }

    }


    startSlidingText() {
        let textIndex = Phaser.Math.Between(0, this.slidingSpeech.length - 1);
        this.presentateurText.text = this.slidingSpeech[textIndex];
        this.textSliding = true;
    }

    setNewTextToPrint(text) {
        this.presentateurText.text = "";
        this.textToPrint = text;
        this.newText = true;
        this.textToPrintIndex = 0;
    }
}