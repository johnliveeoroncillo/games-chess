const chess = document.getElementById('chess');
const chess_pieces = document.getElementById('chess-pieces');
const tiles = 64;
const max = 8;
const chessSquareArray = [];

const pieces = [];

class Piece {
    move;
    name;
    attack;
    constructor(options) {
        this.move = options.move;
        this.name = options.name;
        this.attack = options.attack;
    }

    init() {
        
    }
}

class Tile {
    point = [];
    index = -1;

    constructor(index, pointB) {
        this.index = index;
        const realIndex = Number(index) + 1;
        if (realIndex >= 57) this.point.push(1);
        else if (realIndex >= 49) this.point.push(2);
        else if (realIndex >= 41) this.point.push(3);
        else if (realIndex >= 33) this.point.push(4);
        else if (realIndex >= 25) this.point.push(5);
        else if (realIndex >= 17) this.point.push(6);
        else if (realIndex >= 9) this.point.push(7);
        else if (realIndex >= 1) this.point.push(8);

        this.point.push(pointB);
    }

    square() {
        const chessSquare = document.createElement("div")
        chessSquare.classList.add("chessSquare")
        chessSquare.setAttribute('id', this.index);
        chessSquare.setAttribute("point", this.point);
        chessSquare.style.backgroundColor = this.color(this.index);
        chessSquare.style.color = this.color(this.index) === '#FFF' ? '#000' : '#FFF';
        chessSquare.style.position = "relative";

        const span = document.createElement('span');
        span.innerHTML = this.point;
        span.style.position = "absolute";
        span.style.top = "50%";
        span.style.left = "50%";
        span.style.transform = "translate(-50%, -50%)";
    
        chessSquare.appendChild(span);

        return chessSquare;
    }
    
    color(i) {
        if ((i >= 0 && i <= 7) || (i >= 16 && i <= 23) || (i >= 32 && i <= 39) || (i >= 48 && i <= 55)){
            return i % 2 === 0 ? "#FFF" : "#000";
        }
        if ((i >= 8 && i <= 15) || (i >= 24 && i <= 31) || (i >= 40 && i <= 47) || (i >= 56 && i <= 63)){
            return i % 2 !== 0 ? "#FFF" : "#000";
        }
    }
}

function init() {
    let numOfSquares = 0;
    let resetSquare = 0;
    const chessBoard = chess;
    while (numOfSquares < tiles){
        resetSquare ++;
        const chessSquare = new Tile(numOfSquares, resetSquare);
        chessSquareArray.push(chessSquare.square());
        numOfSquares += 1;
        if (resetSquare === max) resetSquare = 0;
    }
    chessSquareArray.forEach((element, i) => {
        return chessBoard.append(element)
    })

    pieces.push(new Piece({
        move: {
            cross: ["+1", "0"],
        },
        name: "Pawn",
        attack: {
            diagonal: ["+1", "+1"],
        }
    }));

    pieces.forEach(piece => {
        const option = document.createElement('option');
        option.innerHTML = piece.name;
        option.value = piece.name;
        chess_pieces.append(option);
    });
}

init();
