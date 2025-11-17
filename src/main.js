import { Boot } from './scenes/Boot.js';
import { Preloader } from './scenes/Preloader.js';
import { Start } from './scenes/Start.js';
import { Game } from './scenes/Game.js';
import { GameOver } from './scenes/GameOver.js';

const config = {
    type: Phaser.AUTO,
    title: 'KDOLolo',
    description: '',
    parent: 'game-container',
    width: 320,
    height: 480,
    backgroundColor: '#000000',
    pixelArt: false,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 0 }
        }
    },
    scene: [
        Boot,
        Preloader,
        Start,
        Game,
        GameOver
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        forcePortrait: true
    },
}

new Phaser.Game(config);
            