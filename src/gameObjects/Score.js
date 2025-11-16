import ASSETS from '../assets.js';

export default class Score extends Phaser.GameObjects.GameObject {

    scene = null;
    scoreValue = 0;
    normalScoreLetters = [];
    litUpScoreLetters = [];

    constructor(scene) {
        super(scene);
    }

    preload() {
    }

    getScoreValue() {
        return this.scoreValue;
    }

    setScoreValue(value) {

        this.scoreValue = value;
        this.changeLettersOpacity();
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


}