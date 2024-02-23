const PLAYFIELD_COLUMNS = 10;
const PLAYFIELD_ROWS = 20;
const TETROMINO_NAMES = [
    'O',
    'J',
    'L',
    'H'
]

const TETROMINOES = {
    'O' : [
        [1,1],
        [1,1],
    ],
    'J': [
        [1,0,0],
        [1,1,1],
        [0,0,0],
    ],
    'L': [
        [1],
        [1],
        [1],
        [1],
    ],
    'H': [
        [1,1,1,1],
        [],
        [],
        [],
    ]
}

function convertPositionToIndex(row, column) {
    return row * PLAYFIELD_COLUMNS + column;
}

let playField;
let tetromino;


function generatePlayField() {
    for (let i= 0; i < PLAYFIELD_ROWS * PLAYFIELD_COLUMNS; i++){
        const div = document.createElement('div');
        document.querySelector('.grid').append(div);
    }

    playField = new Array(PLAYFIELD_ROWS).fill()
                    .map( () => new Array(PLAYFIELD_COLUMNS).fill(0) )
    console.log(playField);
    // console.table(playField)
}

function generateTetromino(){
    const name = TETROMINO_NAMES[3];
    const matrix = TETROMINOES[name];
    console.log(matrix);
    tetromino = {
        name,
        matrix,
        row: 3,
        column: 5
    }
}

generatePlayField();
generateTetromino();
const cells = document.querySelectorAll('.grid div');

function drawPlayField() {
    // console.log(cells);

    for (let row = 0; row < PLAYFIELD_ROWS; row++) {
        for (let column = 0; column < PLAYFIELD_COLUMNS; column++) {
            if (playField[row][column] === 0) {
                continue;
            }
            const name = playField[row][column];
            const cellIndex = convertPositionToIndex(row, column);
            cells[cellIndex].classList.add(name);
        }
    }
}

function drawTetromino(){
    const name = tetromino.name;
    const tetrominoMatrixSize = tetromino.matrix.length;


    for (let row = 0; row < tetrominoMatrixSize; row++){
        for (let column = 0; column < tetrominoMatrixSize; column++) {
            if (!tetromino.matrix[row][column]){
                continue;
            }
            const cellIndex = convertPositionToIndex(
                tetromino.row + row,
                tetromino.column + column
            )
            // console.log(cellIndex);
            cells[cellIndex].classList.add(name);
        }
        // column
    }
    // row
}

// drawTetromino();
// drawPlayField();

function draw() {
    cells.forEach(cell => cell.removeAttribute('class'));
    drawTetromino();
    drawPlayField();
}


document.addEventListener('keydown', onKeyDown);
function onKeyDown(e) {
    console.log(e);
    switch (e.key) {
        case 'ArrowDown':
            moveTetrominoDown();
            break;
        case 'ArrowLeft':
            moveTetrominoLeft();
            break;
        case 'ArrowRight':
            moveTetrominoRight();
            break;
    }

    draw();
}

function moveTetrominoDown() {
    tetromino.row += 1;
    drawTetromino();
}

function moveTetrominoLeft() {
    tetromino.column -= 1;
    drawTetromino();
}

function moveTetrominoRight() {
    tetromino.column += 1;
    drawTetromino();
}