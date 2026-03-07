// Standard Tetromino defs: Matrices are square for standard SRS (Super Rotation System) like rotation
// We use integer codes mapping to colors inside Renderer

export const SHAPES = {
    I: {
        matrix: [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        code: 1,
        color: '#00ffff' // Cyan
    },
    J: {
        matrix: [
            [2, 0, 0],
            [2, 2, 2],
            [0, 0, 0]
        ],
        code: 2,
        color: '#0000ff' // Blue
    },
    L: {
        matrix: [
            [0, 0, 3],
            [3, 3, 3],
            [0, 0, 0]
        ],
        code: 3,
        color: '#ffa500' // Orange
    },
    O: {
        matrix: [
            [4, 4],
            [4, 4]
        ],
        code: 4,
        color: '#ffff00' // Yellow
    },
    S: {
        matrix: [
            [0, 5, 5],
            [5, 5, 0],
            [0, 0, 0]
        ],
        code: 5,
        color: '#00ff00' // Green
    },
    T: {
        matrix: [
            [0, 6, 0],
            [6, 6, 6],
            [0, 0, 0]
        ],
        code: 6,
        color: '#800080' // Purple
    },
    Z: {
        matrix: [
            [7, 7, 0],
            [0, 7, 7],
            [0, 0, 0]
        ],
        code: 7,
        color: '#ff0000' // Red
    }
};

export const COLORS = {
    0: 'transparent',
    1: SHAPES.I.color,
    2: SHAPES.J.color,
    3: SHAPES.L.color,
    4: SHAPES.O.color,
    5: SHAPES.S.color,
    6: SHAPES.T.color,
    7: SHAPES.Z.color,
    // Ghost piece color
    8: 'rgba(255, 255, 255, 0.2)'
};
