import './style.css'

// 1 - Initialize canvas
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const BLOCK_SIZE = 20;
const BOARD_WIDTH = 14
const BOARD_HEIGHT = 30

// Tetris board dimensions
canvas.width = BLOCK_SIZE * BOARD_WIDTH
canvas.height = BLOCK_SIZE * BOARD_HEIGHT

context.scale (BLOCK_SIZE, BLOCK_SIZE)

// 3 - Board
//  '0' - represent a void
//  '1' - represent a block
const board  = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
]

// 4 - Pieces
const piece = {
    position: { x: 5, y: 5 }, // initial position on the board
    shape: [
        [1, 1], // square
        [1, 1]
    ]
}

// 2 - Game Loop
// 8 - Autodrop
let dropCounter = 0
let lastTime = 0
function update(time = 0) {
    const deltaTime = time - lastTime
    lastTime = time

    dropCounter += deltaTime
    if (dropCounter > 1000) {
        piece.position.y++
        dropCounter = 0
    }

    draw()
    window.requestAnimationFrame(update) // Loop - alternative: The setInterval() method
}


function draw() {
    context.fillStyle = "#000" // Background - black
    context.fillRect(0, 0, canvas.width, canvas.height)

    // Draw the board
    board.forEach((row, y) => {
        row.forEach((value, x) => {
            if(value === 1) {
                context.fillStyle = 'yellow'
                context.fillRect(x, y, 1, 1)
            }
        })
    })

    // Draw the pieces
    piece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                context.fillStyle = "red"
                context.fillRect(x + piece.position.x, y + piece.position.y, 1, 1)
            }
        })
    })
}

// Move the piece
document.addEventListener('keydown', event => {
    if(event.key === 'ArrowLeft') {
        piece.position.x--  // move the piece
        if(checkCollision()) { // if there is a collision back the piece to the previous place
            piece.position.x++
        }
    }

    if(event.key === 'ArrowRight') {
        piece.position.x++
        if(checkCollision()) {
            piece.position.x--
        }
    }

    if(event.key === 'ArrowDown') {
        piece.position.y++
        if(checkCollision()) {
            piece.position.y--
            solidifyPiece()
            removeRows()
        }
    }
})

// To check the collision
function checkCollision() {
    return piece.shape.find((row, y) => {
        return row.find((value, x) => {
            return (
                value !== 0 &&
                board[y + piece.position.y]?.[x + piece.position.x] !== 0
            )
        })
    })
}

// After reaching the end of the board, a piece became part of the board
function solidifyPiece() {
    piece.shape.forEach((row, x) => {
        row.forEach((value, y) => {
            if(value === 1) {
                board[y + piece.position.y][x + piece.position.x] = 1
            }
        })

    })

    // Reset the piece's position
    piece.position.x = 0
    piece.position.y = 0
}

// removes the solidified lines at the button
function removeRows() {
    const rowsToRemove = []
    board.forEach((row, y) => {
        if(row.every(value => value === 1)) {
            rowsToRemove.push(y)
        }
    })

    // New row on the top with zeros
    rowsToRemove.forEach(y => {
        board.splice(y, 1)
        const newRow = Array(BOARD_WIDTH).fill(0)
        board.unshift(newRow)
    })
}

update()

