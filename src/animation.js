import ASSETS from './assets.js';

export default {
    'explosion':
    {
        key: 'explosion',
        texture: ASSETS.spritesheet.tiles.key,
        frameRate: 10,
        config: { start: 4, end: 8 },
    },

    'aoeExplosion':
    {
        key: 'aoeExplosion',
        texture: ASSETS.spritesheet.aoeExplosion.key,
        frameRate: 12,
        config: { start: 1, end: 10 },
    },
};