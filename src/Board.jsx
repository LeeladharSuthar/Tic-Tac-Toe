import { useState } from 'react';
export default function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    let [next, setNext] = useState("X");

    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        const nextSquares = squares.slice();
        nextSquares[i] = next;
        setSquares(nextSquares);
        next == "X" ? setNext("O") : setNext("X");
    }
    function reset(){
        setSquares(Array(9).fill(null));
        setNext("X");
    }

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Player move: ' + (next=="X" ? 'X' : 'O');
    }

    return <>
        <div>
            <h1>{status}</h1>
        </div>
        <div className="board-row">
            <Square value={squares[0]} click={handleClick} idx="0" />
            <Square value={squares[1]} click={handleClick} idx="1" />
            <Square value={squares[2]} click={handleClick} idx="2" />
        </div>
        <div className="board-row">
            <Square value={squares[3]} click={handleClick} idx="3" />
            <Square value={squares[4]} click={handleClick} idx="4" />
            <Square value={squares[5]} click={handleClick} idx="5" />
        </div>
        <div className="board-row">
            <Square value={squares[6]} click={handleClick} idx="6" />
            <Square value={squares[7]} click={handleClick} idx="7" />
            <Square value={squares[8]} click={handleClick} idx="8" />
        </div>

        <br />
        <button onClick={reset}>
            Reset
        </button>
    </>
}

function Square({ value, click, idx }) {
    function update() {
        click(idx);
    }
    return <button className="square" onClick={update}>{value}</button>;
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}