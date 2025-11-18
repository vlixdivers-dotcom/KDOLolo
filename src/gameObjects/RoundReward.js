import ASSETS from '../assets.js';

export default class RoundReward extends Phaser.GameObjects.GameObject {
    player = null;
    scene = null;

    shown = false;
    choiceIndex = 0;

    blackBackground = null;
    firstChoice = {
        image: null,
        title: null,
        description: null,
    }
    secondChoice = {
        image: null,
        title: null,
        description: null,
    }


    choices = [[
        {
            imagePath: ASSETS.image.bN.key,
            title: 'Livre de Merdella',
            description: 'Cette bouse te remplie de rage,\n les parpaings se lancent comme par magie',
        },
        {
            imagePath: ASSETS.image.aN.key,
            title: 'Whey de Facho in Shape',
            description: 'La combinaison de molécule te boost,\n deux parpaings peuvent être lancés'
        }],
    [
        {
            imagePath: ASSETS.image.bN.key,
            title: 'Larmes de Sarkozy',
            description: 'Acre et remplie de haine,\n certains parpaings en sont recouvers',
        },
        {
            imagePath: ASSETS.image.aN.key,
            title: 'Talc de Baba',
            description: 'Une paille pour du talc ?,\n whoooo tu te sens rapide !!'
        }],
    [
        {
            imagePath: ASSETS.image.bN.key,
            title: 'Images de Sainte Soline',
            description: 'Chargeeeeeeez,\n prends plus de molotov camarade !',
        },
        {
            imagePath: ASSETS.image.aN.key,
            title: 'Slip de Bolloré',
            description: 'Retiré lors de sa chute,\n utilise le pour lancé des parpaings'
        }],
    [
        {
            imagePath: ASSETS.image.bN.key,
            title: 'Les faits',
            description: 'La vérité est dérangeante pour les fachos,\n les mots sont perçant..',
        },
        {
            imagePath: ASSETS.image.aN.key,
            title: 'Troisiéme Oeil',
            description: 'Toute cette babosserie a payé,\n tu sens ton troisiéme oeil s\'ouvrir'
        }]
    ];

    constructor(scene, player) {
        super(scene);

        this.scene = scene;
        this.player = player;

        this.blackBackground = this.scene.add.rectangle(0, 0, 320, 480, '#FFFFFF').setOrigin(0).setDepth(110).setAlpha(this.shown / 2);

        this.firstChoice.image = this.scene.add.image(this.scene.scale.width / 2,
            (this.scene.scale.height / 2) - 100, this.choices[0][0].imagePath).setOrigin(0.5).setDepth(120).setAlpha(this.shown);
        this.firstChoice.title = this.scene.add.text(this.firstChoice.image.x,
            this.firstChoice.image.y + 26, this.choices[0][0].title, {
            fontFamily: 'Arial', fontSize: 16, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(120).setAlpha(this.shown);
        this.firstChoice.description = this.scene.add.text(this.firstChoice.title.x,
            this.firstChoice.title.y + 24, this.choices[0][0].description, {
            fontFamily: 'Arial', fontSize: 12, color: '#ffffff',
            stroke: '#000000', strokeThickness: 2,
            align: 'center'
        }).setOrigin(0.5).setDepth(120).setAlpha(this.shown);


        this.secondChoice.image = this.scene.add.image(this.scene.scale.width / 2,
            this.scene.scale.height / 2 + 25, this.choices[0][1].imagePath).setOrigin(0.5).setDepth(120).setAlpha(this.shown);
        this.secondChoice.title = this.scene.add.text(this.secondChoice.image.x,
            this.secondChoice.image.y + 26, this.choices[0][1].title, {
            fontFamily: 'Arial', fontSize: 16, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(120).setAlpha(this.shown);
        this.secondChoice.description = this.scene.add.text(this.secondChoice.title.x,
            this.secondChoice.title.y + 24, this.choices[0][1].description, {
            fontFamily: 'Arial', fontSize: 12, color: '#ffffff',
            stroke: '#000000', strokeThickness: 2,
            align: 'center'
        }).setOrigin(0.5).setDepth(120).setAlpha(this.shown);

        this.firstChoice.image.setInteractive().on('pointerdown', (e) => {
            this.setEffectToPlayer(true);
        });

        this.secondChoice.image.setInteractive().on('pointerdown', (e) => {
            this.setEffectToPlayer(false);
        });
    }



    showReward(currentRound) {

        this.shown = true;
        this.choiceIndex = currentRound;

        this.blackBackground.setAlpha(this.shown / 2);

        if (currentRound >= this.choices.length)
            return;


        this.firstChoice.image.setTexture(this.choices[currentRound][0].imagePath).setAlpha(this.shown);
        this.firstChoice.title.setText(this.choices[currentRound][0].title).setAlpha(this.shown);
        this.firstChoice.description.setText(this.choices[currentRound][0].description).setAlpha(this.shown);

        this.secondChoice.image.setTexture(this.choices[currentRound][1].imagePath).setAlpha(this.shown);
        this.secondChoice.title.setText(this.choices[currentRound][1].title).setAlpha(this.shown);
        this.secondChoice.description.setText(this.choices[currentRound][1].description).setAlpha(this.shown);
    }

    hideReward() {
        this.shown = false;

        this.blackBackground.setAlpha(this.shown / 2);

        this.firstChoice.image.setAlpha(this.shown);
        this.firstChoice.title.setAlpha(this.shown);
        this.firstChoice.description.setAlpha(this.shown);

        this.secondChoice.image.setAlpha(this.shown);
        this.secondChoice.title.setAlpha(this.shown);
        this.secondChoice.description.setAlpha(this.shown);
    }

    setEffectToPlayer(firstChoice) {

        if (firstChoice) {
            switch (this.choiceIndex) {
                case 0:
                    this.player.haveLivreDeMerdellaUpgrade();
                    break;
                case 1:
                    this.player.haveLarmeUpgrade();
                    break;
                case 2:
                    this.player.haveSainteSolineUpgrade();
                    break;
                case 3:
                    this.player.haveLesFaitsUpgrade();
                    break;
                default:
                    break;
            }
        } else {
            switch (this.choiceIndex) {
                case 0:
                    this.player.haveWheyUpgrade();
                    break;
                case 1:
                    this.player.haveTalcUpgrade();
                    break;
                case 2:
                    this.player.haveSlipUpgrade();
                    break;
                case 3:
                    this.player.haveTroisiemeOeilUpgrade();
                    break;
                default:
                    break;
            }
        }
        this.hideReward();
        this.scene.launchNextRound();

    }

}