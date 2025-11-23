import ASSETS from '../assets.js';

export default class Score extends Phaser.GameObjects.GameObject {

    scene = null;
    scoreValue = 0;
    scoreMilestone = [20, 50, 90, 135];
    scoreMilestoneIndex = 0;
    normalScoreLetters = [];
    litUpScoreLetters = [];
    nbCopsNeutralized = 0;
    nbCopsNeutralizedText;

    constructor(scene) {
        super(scene);
        this.scene = scene;

        this.nbCopsNeutralizedText = this.scene.add.text(0, 100, 'POLICIER "NEUTRALISER": ' + this.nbCopsNeutralized, {
            fontFamily: 'vintageWarehouse', fontSize: 6, color: '#FF0000',
            stroke: '#000000', strokeThickness: 4,
            align: 'center'
        })
            .setOrigin(0)
            .setDepth(100);
    }

    preload() {
    }

    getScoreValue() {
        return this.scoreValue;
    }

    setScoreValue(value) {
        this.scoreValue = value;
        this.nbCopsNeutralized++;
        this.nbCopsNeutralizedText.text = ('POLICIER "NEUTRALISER": ' + this.nbCopsNeutralized);
        this.changeLettersOpacity();

        if (this.getMilestoneValue() >= this.scoreMilestone[this.scoreMilestoneIndex]) {
            this.scene.setInBetweenRound(1);
        }
    }


    getMilestoneValue() {
        return this.scoreValue - (this.scoreMilestoneIndex > 0 ? this.scoreMilestone[this.scoreMilestoneIndex - 1] : 0);
    }

    changeLettersOpacity() {
        let i = Phaser.Math.RoundTo(Phaser.Math.FloorTo(this.scoreValue / 10), 0);

        const alphaValue = this.getMilestoneValue() / this.scoreMilestone[this.scoreMilestoneIndex];


        if (this.scoreMilestoneIndex < this.normalScoreLetters.length)
            this.litUpScoreLetters[this.scoreMilestoneIndex].setAlpha(alphaValue);
    }

    setNormalScoreLetters(arrayValue) {
        this.normalScoreLetters = arrayValue;
    }

    setLitUpScoreLetters(arrayValue) {
        this.litUpScoreLetters = arrayValue;
    }

    getNormalScoreLetters() {
        return this.normalScoreLetters;
    }

    getLitUpScoreLetters() {
        return this.litUpScoreLetters;
    }


    getScoreMilestoneIndex() {
        return this.scoreMilestoneIndex;
    }

    setScoreMilestoneIndex(value) {
        this.scoreMilestoneIndex = value;
    }
}