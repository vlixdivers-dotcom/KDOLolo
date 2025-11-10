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
        }
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
    },
    // 'sprites': {
    //     enemy: {
    //         key: 'crs',
    //         args: ['assets/enemy.png']
    //     }
    // },
};