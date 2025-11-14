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
        pickupPlaceHolder: {
            key: 'pickupPlaceHolder',
            args: ['assets/pickup/placeholder.png', {
                frameWidth: 32,
                frameHeight: 32,
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