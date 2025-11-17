import ASSETS from '../assets.js';

export default class Score extends Phaser.GameObjects.GameObject {

    scene = null;
    scoreValue = 0;
    scoreMilestone = [10,20,30,40];
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

        if (this.scoreValue >= this.scoreMilestone[this.scoreMilestoneIndex]){
            this.scene.setInBetweenRound(1);
        }
    }


    changeLettersOpacity() {
        let i = Phaser.Math.RoundTo(Phaser.Math.FloorTo(this.scoreValue / 10), 0);
        if (i < this.normalScoreLetters.length)
            this.litUpScoreLetters[i].setAlpha((this.scoreValue / 10) - i);
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