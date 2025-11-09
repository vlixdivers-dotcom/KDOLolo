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
            args: ['assets/enemy.png', {frameWidth: 64,frameHeight: 64}]
        }
    },

    'spritesheet': {
        ships: {
            key: 'ships',
            args: ['assets/ships.png', {
                frameWidth: 64,
                frameHeight: 64,
            }]
        },
        tiles: {
            key: 'tiles',
            args: ['assets/tiles.png', {
                frameWidth: 32,
                frameHeight: 32
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