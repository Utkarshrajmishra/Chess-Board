import React, { createContext, useState, useMemo, useCallback } from "react";
import { Chess } from "chess.js";

export const ChessGameContext = createContext();

export const ChessGameProvider = ({ children }) => {
  const [game, setGame] = useState(new Chess());
  const [moveLog, setMoveLog] = useState([]);
  const [highlightedSquares, setHighlightedSquares] = useState([]);
  const [selectedSquare, setSelectedSquare] = useState(null);

  // Get the current game status
  const gameStatus = useMemo(() => {
    if (game.isGameOver()) {
      if (game.isCheckmate()) return "Checkmate!";
      if (game.isDraw()) return "Draw!";
      if (game.isStalemate()) return "Stalemate!";
      return "Game Over!";
    }
    if (game.isCheck()) return "Check!";
    return `${game.turn() === "w" ? "White" : "Black"} to move`;
  }, [game]);

  // Handle square clicks
  const onSquareClick = useCallback(
    (square) => {
      const piece = game.get(square);

      // Clear selection if clicking the same square again
      if (selectedSquare === square) {
        setSelectedSquare(null);
        setHighlightedSquares([]);
        return;
      }

      // If a piece is selected and clicked square is valid, make the move
      if (selectedSquare && highlightedSquares.includes(square)) {
        const move = game.move({
          from: selectedSquare,
          to: square,
          promotion: "q",
        });

        if (move) {
          setGame(new Chess(game.fen()));
          setMoveLog((prev) => [...prev, move]);
          setHighlightedSquares([]);
          setSelectedSquare(null);
        }
        return;
      }

      // If no piece is selected or square is empty, highlight possible moves
      if (!piece) return;

      setSelectedSquare(square);
      const moves = game.legal_moves({ square }); // Get legal moves
      const moveSquares = moves.map((move) => move.to); // Extract target squares
      setHighlightedSquares(moveSquares);
    },
    [game, selectedSquare, highlightedSquares]
  );

  // Handle piece drop (drag-and-drop)
  const onPieceDrop = useCallback(
    (sourceSquare, targetSquare) => {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });

      if (move) {
        setGame(new Chess(game.fen()));
        setMoveLog((prev) => [...prev, move]);
        setHighlightedSquares([]);
        setSelectedSquare(null);
        return true;
      }
      return false;
    },
    [game]
  );

  const value = {
    game,
    moveLog,
    gameStatus,
    highlightedSquares,
    selectedSquare,
    onSquareClick,
    onPieceDrop,
  };

  return (
    <ChessGameContext.Provider value={value}>
      {children}
    </ChessGameContext.Provider>
  );
};
