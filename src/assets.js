export default {
    // 'audio': {
    //     score: {
    //         key: 'sound',
    //         args: ['assets/sound.mp3', 'assets/sound.m4a', 'assets/sound.ogg']
    //     },
    // },
    'image': {
        enemy: {
            key: 'crs',
            args: ['assets/enemy.png', { frameWidth: 64, frameHeight: 64 }]
        },

        // aScoreN: {
        //     key: 'aScoreN',
        //     args: ['assets/ScoreLetter/normal/a.png', {
        //         frameWidth: 16,
        //         frameHeight: 29
        //     }]
        // },
        // bScoreN: {
        //     key: 'bScoreN',
        //     args: ['assets/ScoreLetter/normal/b.png', {
        //         frameWidth: 16,
        //         frameHeight: 29,
        //     }]
        // },
        // cScoreN: {
        //     key: 'cScoreN',
        //     args: ['assets/ScoreLetter/normal/c.png', {
        //         frameWidth: 16,
        //         frameHeight: 29,
        //     }]
        // },

        // aScoreLU: {
        //     key: 'aScoreLU',
        //     args: ['assets/ScoreLetter/litUp/a.png', {
        //         frameWidth: 16,
        //         frameHeight: 29,
        //     }]
        // },
        // bScoreLU: {
        //     key: 'bScoreLU',
        //     args: ['assets/ScoreLetter/litUp/b.png', {
        //         frameWidth: 16,
        //         frameHeight: 29,
        //     }]
        // },
        // cScoreLU: {
        //     key: 'cScoreLU',
        //     args: ['assets/ScoreLetter/litUp/c.png', {
        //         frameWidth: 16,
        //         frameHeight: 29,
        //     }]
        // }
    },
    'spritesheet': {
        ships: {
            key: 'ships',
            args: ['assets/player.png', {
                frameWidth: 83,
                frameHeight: 99,
            }]
        },
        tiles: {
            key: 'tiles',
            args: ['assets/tiles.png', {
                frameWidth: 32,
                frameHeight: 32
            }]
        },
        bullets: {
            key: 'stone',
            args: ['assets/bullet.png', {
                frameWidth: 32,
                frameHeight: 32,
            }]
        },
        aoe: {
            key: 'aoe',
            args: ['assets/aoe.png', {
                frameWidth: 32,
                frameHeight: 32,
            }]
        },
        aoeExplosion: {
            key: 'aoeExplosion',
            args: ['assets/explosion_sheet.png', {
                frameWidth: 320,
                frameHeight: 160,
            }]
        },
        aoeFrame: {
            key: 'aoeFrame',
            args: ['assets/aoe_frame.png', {
                frameWidth: 24,
                frameHeight: 24,
            }]
        },
        presentateur: {
            key: 'presentateur',
            args: ['assets/Presentateur/presentateur_sheet.png', {
                frameWidth: 96,
                frameHeight: 80,
            }]
        },
    }

    // 'scoreUILitUp': {
    //     a: {
    //         key: 'a',
    //         args: ['assets/ScoreLetter/litUp/a.png', {
    //             frameWidth: 16,
    //             frameHeight: 29,
    //         }]
    //     },
    //     b: {
    //         key: 'b',
    //         args: ['assets/ScoreLetter/litUp/b.png', {
    //             frameWidth: 16,
    //             frameHeight: 29,
    //         }]
    //     },
    //     c: {
    //         key: 'c',
    //         args: ['assets/ScoreLetter/litUp/c.png', {
    //             frameWidth: 16,
    //             frameHeight: 29,
    //         }]
    //     },
    // }
};