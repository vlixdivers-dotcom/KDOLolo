import ASSETS from '../assets.js';

export default class Score extends Phaser.GameObjects.GameObject {

    scene = null;
    scoreValue = 0;
    scoreMilestone = [5, 15, 21, 32];
    scoreMilestoneIndex = 0;
    normalScoreLetters = [];
    litUpScoreLetters = [];

    constructor(scene) {
        super(scene);
        this.scene = scene;
    }

    preload() {
    }

    getScoreValue() {
        return this.scoreValue;
    }

    setScoreValue(value) {
        this.scoreValue = value;
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