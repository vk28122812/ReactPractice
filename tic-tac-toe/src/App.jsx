import { useState } from "react";
import GameOver from "./components/GameOver";
import Player from "./components/Player";
import Header from "./components/Header";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./WinningCombinations";

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];



function deriveActivePlayer(gameTurns) {
  let activePlayer = "X";
  if (gameTurns.length && gameTurns[0].player === "X") {
    activePlayer = "O";
  }
  return activePlayer;
}

function deriveWinner(gameBoard, players) {
  let winner;
  for (const comb of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[comb[0].row][comb[0].column];
    const secondSquareSymbol = gameBoard[comb[1].row][comb[1].column];
    const thirdSquareSymbol = gameBoard[comb[2].row][comb[2].column];
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      secondSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  // const [ activePlayer, setActivePlayer] = useState("X");
  const PLAYERS = {
    X: "Player 1",
    O: "Player 2",
  };
  const [gameTurns, setGameTurns] = useState([]);
  const [playerNames, setPlayerNames] = useState(PLAYERS);
  const gameBoard = deriveGameBoard(gameTurns);
  const activePlayer = deriveActivePlayer(gameTurns);
  const winner = deriveWinner(gameBoard, playerNames);
  const hasDraw = gameTurns.length == 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    //  setActivePlayer( (currActivePlayer) => currActivePlayer==="X"?"O":"X");
    setGameTurns((prevTurns) => {
      let currPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayerNames((prevPlayers) => {
      return {
        ...prevPlayers,
        symbol: newName,
      };
    });
  }
  function handleRestart() {
    setGameTurns([]);
  }

  return (
    <>
      <Header />
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player
              initialName={PLAYERS.X}
              symbol="X"
              isActive={activePlayer === "X"}
              onChangeName={handlePlayerNameChange}
            />
            <Player
              initialName={PLAYERS.O}
              symbol="O"
              isActive={activePlayer === "O"}
              onChangeName={handlePlayerNameChange}
            />
          </ol>
          {(winner || hasDraw) && (
            <GameOver winner={winner} onRestart={handleRestart} />
          )}
          <GameBoard board={gameBoard} onSelectSquare={handleSelectSquare} />
        </div>
        <Log turns={gameTurns} />
      </main>
    </>
  );
}

export default App;
