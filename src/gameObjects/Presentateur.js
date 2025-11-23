import ASSETS from '../assets.js';
import ANIMATION from '../animation.js';


export default class Presentateur extends Phaser.Physics.Arcade.Sprite {

    storySpeech = [[
        { text: "Salut les fachos", frame: 1 },
        { text: "C'est Rascal Prout", frame: 3 },
        { text: "Aujourd'hui dans l'actualité", frame: 2 },
        { text: "Bla ", frame: 2 },
        { text: "Bla ", frame: 2 },
        { text: "Bla ", frame: 2 },
        { text: "Truc raciste", frame: 1 },
        { text: "Bla ", frame: 2 },
        { text: "B... Qu'est ce que ? ", frame: 3 },
        { text: "On nous informe", frame: 0 },
        { text: "D'une manifestation ", frame: 0 },
        { text: "soudaine sur Paris", frame: 2 },
        { text: "Il y as pas à s'inquiéter", frame: 1 },
        { text: "Les forces de l'ordre vont les tap..", frame: 1 },
        { text: "..Maitriser", frame: 3 },
    ],
    [
        { text: "De retour", frame: 1 },
        { text: "pour decrypter l'actualité", frame: 1 },
        { text: "Apparemment la manifestation", frame: 2 },
        { text: "ne se passe pas comme prévue", frame: 2 },
        { text: "Jean Luc Mélenchon", frame: 0 },
        { text: "se serait emparer de la manifestation", frame: 0 },
        { text: "On aurait entendu", frame: 0 },
        { text: "'Vas-y Lolo abats la citadelle !!!'", frame: 0 },
    ],
    [
        { text: "Rien ne va plus", frame: 2 },
        { text: "J'ai reçu un appel de Bolloré", frame: 2 },
        { text: "On va devoir arrêter", frame: 1 },
        { text: "L'heure des frouts", frame: 3 },
        { text: "Une tragédie pour la Fronce", frame: 1 },
        { text: "Comment les gens vont savoir", frame: 2 },
        { text: "....", frame: 2 },
        { text: "....", frame: 0 },
        { text: "vont savoir quoi ...", frame: 3 },
    ],
    [
        { text: "L'individu se rapproche", frame: 0 },
        { text: "Décrit par nos gentis policiers", frame: 2 },
        { text: "Comme une islamo-gauchiste", frame: 3 },
        { text: "Elle serait actuellement", frame: 0 },
        { text: "sous grosse frozen", frame: 2 },
        { text: "Néanmoins elle représente", frame: 0 },
        { text: "un danger pour la république", frame: 0 },
        { text: "contrairement au RN", frame: 3 },
        { text: "*téléphone qui sonne*", frame: 0 },
        { text: "Oui Patron ?", frame: 2 },
        { text: "Elle est dans la rue..o..", frame: 1 },
        { text: "..Et l'emmision s'arrête ???", frame: 2 },
        { text: "D...D'accord", frame: 1 },
        { text: "Bon moi ça suffit", frame: 0 },
        { text: "Je fais ", frame: 0 },
        { text: "mes clics", frame: 1 },
        { text: "et mes claques", frame: 2 },
        { text: "Puis je vais recouvrir ma maison", frame: 0 },
        { text: "de tranches de jambon", frame: 3 },
    ],
    [
        { text: "AaaAAAaaaAA", frame: 3 },
        { text: "Que faire ", frame: 3 },
        { text: "Elle est lààà", frame: 3 },
    ],
    ];

    slidingSpeechLastIndex = 0;
    slidingSpeech = [
        "ALERTE : Nicolas Sarkozy aurait chier liquide à cause du régime yaourt ",
        "Le gauchisme responsable du froid ?",
        "Pourquoi Clément Viktorovich parle de Lego...Affaire à suivre",
        "L'aligot Hallal, jusqu'à où ira le wokisme...Affaire à suivre",
        "Alain Soral de gauche ?",
        "Pourquoi le PS est des traîte même pour nous...Affaire à suivre",
        "Même les bateaux commence à porter le voile, les féres musulman au portes de l'atlantide",
        "Bolloré, not all breton ?",
    ];

    textSliding = false;

    speechSFX;

    presentateurBoard;
    presentateurText;

    newText = false;
    timeBeforeNewLetter = 0.03;
    timeBeforeNewLetterCounter = 0;
    textToPrint = "Vous voulez dire ?";
    textToPrintIndex = 0;


    currentStoryDialog;
    currentStoryDialogIndex = 0;

    speaking = true;
    isSliding = false;
    inFrenzy = false;
    slideProgress = 0;

    deltaMultplicator = 1;

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
            fontFamily: 'Arial', fontSize: 18, color: '#ffffff',
            stroke: '#000000', strokeThickness: 2,
            align: 'center'
        }).setOrigin(0.5).setDepth(120)
        this.presentateurText.text = "";


        this.positionPres = [this.x, this.scene.scale.width + 100];
        this.speaking = true;

        this.speechSFX = this.scene.sound.add(ASSETS.audio.prout.key, { loop: false, mute: false, volume: 1 });
    }


    setAnimFrame(_nb) {
        this.setFrame(_nb);
    }

    startStoryText(round, cursor) {
        if (round === 4 && this.inFrenzy == false) {
            this.positionPres = [0 + this.width, this.scene.scale.width - this.width];
            this.inFrenzy = true;
        }
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
        this.presentateurText.x = this.scene.scale.width + this.presentateurText.width / 2;
        this.speaking = toSpeak;
        this.isSliding = true;
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        if (this.newText) {
            this.timeBeforeNewLetterCounter -= (delta / 1000);

            if (this.timeBeforeNewLetterCounter <= 0) {
                this.presentateurText.text += this.textToPrint[this.textToPrintIndex];
                this.timeBeforeNewLetterCounter = this.timeBeforeNewLetter;
                this.speechSFX.play();
                this.textToPrintIndex++;
            }

            if (this.textToPrintIndex >= this.textToPrint.length) {
                this.newText = false;
                this.textToPrintIndex = 0;
            }
        }

        if (this.textSliding) {
            this.presentateurText.x -= (delta / 1000) * 200;
            if (this.presentateurText.x < 0 - this.scene.scale.width - this.presentateurText.width / 2) {
                let textIndex = Phaser.Math.Between(0, this.slidingSpeech.length - 1);
                this.presentateurText.text = this.slidingSpeech[textIndex];
                this.presentateurText.x = this.scene.scale.width + this.presentateurText.width / 2;
            }
        }


        if (this.inFrenzy) {
            if (this.x <= this.positionPres[0]) {
                this.x -= (delta / 1000) * 1000;
            }

            if (this.x >= this.positionPres[1]) {
                this.x += (delta / 1000) * 100;
                return;
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
                this.x += (delta / 1000) * 100;
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