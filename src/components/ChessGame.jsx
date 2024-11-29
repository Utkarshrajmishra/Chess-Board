import React, { useState, useMemo, useCallback } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { Pieces } from "../constant/Pieces";

const ChessGame = () => {
  const [game, setGame] = useState(new Chess());
  const [moveLog, setMoveLog] = useState([]);
  const [highlightedSquares, setHighlightedSquares] = useState([]); // Track highlighted squares
  const [selectedSquare, setSelectedSquare] = useState(null); // Track the selected piece

  const getGameStatus = () => {
    if (game.isGameOver()) {
      if (game.isCheckmate()) return "Checkmate";
      if (game.isDraw()) return "Draw";
      if (game.isStalemate) return "Stalemate";
      return "Game Over";
    }

    if (game.isCheck()) return "Check";

    return `${game.turn() === "w" ? "White" : "Black"} to move`;
  };

  // Handle square click to select a piece and highlight its possible moves
  const onSquareClick = (square) => {
    const piece = game.get(square);
    if (!piece) {
      // If no piece is selected, return early
      return;
    }

    // If the same piece is clicked again, clear the highlights
    if (selectedSquare === square) {
      setSelectedSquare(null);
      setHighlightedSquares([]);
    } else {
      setSelectedSquare(square);
      const moves = game.legal_moves({ square }); // Get legal moves for the selected piece
      const moveSquares = moves.map((move) => move.to); // Extract the target squares
      setHighlightedSquares(moveSquares); // Set the highlighted squares
    }
  };

  const onDrop = useCallback(
    (sourceSquare, targetSquare) => {
      try {
        const move = game.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: "q",
        });

        if (move) {
          setGame(new Chess(game.fen()));
          const moveNotation = `${game.turn() === "w" ? "Black" : "White"}: ${
            move.san
          }`;
          setMoveLog((prev) => [...prev, move]);
          setHighlightedSquares([]); // Clear highlighted squares after the move
          setSelectedSquare(null); // Deselect the piece
          return true;
        }
        return false;
      } catch (error) {
        return false;
      }
    },
    [game]
  );

  // Use useMemo to create customPieces only once
  const customPieces = useMemo(() => {
    return {
      wP: ({ squareWidth }) => (
        <img src={Pieces[0]} width={squareWidth} height={squareWidth} />
      ),
      bP: ({ squareWidth }) => (
        <img src={Pieces[1]} width={squareWidth} height={squareWidth} />
      ),
      wK: ({ squareWidth }) => (
        <img src={Pieces[2]} width={squareWidth} height={squareWidth} />
      ),
      bK: ({ squareWidth }) => (
        <img src={Pieces[3]} width={squareWidth} height={squareWidth} />
      ),
      wQ: ({ squareWidth }) => (
        <img src={Pieces[4]} width={squareWidth} height={squareWidth} />
      ),
      bQ: ({ squareWidth }) => (
        <img src={Pieces[5]} width={squareWidth} height={squareWidth} />
      ),
      wB: ({ squareWidth }) => (
        <img src={Pieces[6]} width={squareWidth} height={squareWidth} />
      ),
      bB: ({ squareWidth }) => (
        <img src={Pieces[7]} width={squareWidth} height={squareWidth} />
      ),
      wN: ({ squareWidth }) => (
        <img src={Pieces[8]} width={squareWidth} height={squareWidth} />
      ),
      bN: ({ squareWidth }) => (
        <img src={Pieces[9]} width={squareWidth} height={squareWidth} />
      ),
      wR: ({ squareWidth }) => (
        <img src={Pieces[10]} width={squareWidth} height={squareWidth} />
      ),
      bR: ({ squareWidth }) => (
        <img src={Pieces[11]} width={squareWidth} height={squareWidth} />
      ),
    };
  }, []);

  return (
    <>
      <Chessboard
        position={game.fen()}
        onPieceDrop={onDrop}
        onSquareClick={onSquareClick} // Add square click handler
        boardWidth={560}
        customPieces={customPieces}
        customBoardStyle={{
          borderRadius: "4px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
        }}
        customDarkSquareStyle={{ backgroundColor: "#22c55e" }} // Green
        customLightSquareStyle={{ backgroundColor: "#F5F5DC" }} // Off-white
        highlightedSquares={highlightedSquares} // Pass highlighted squares
      />
      <div>{getGameStatus()}</div>
    </>
  );
};

export default ChessGame;
