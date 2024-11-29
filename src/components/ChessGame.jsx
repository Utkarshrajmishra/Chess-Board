import React, { useState, useMemo, useCallback, useContext } from "react";
import { Chessboard } from "react-chessboard";
import { Pieces } from "../constant/Pieces";
import { ChessGameContext } from "../context/GameContext";

const ChessGame = () => {
  const { game, gameStatus, highlightedSquares, onSquareClick, onPieceDrop } =
    useContext(ChessGameContext);

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
      <div>
        <Chessboard
          position={game.fen()}
          onPieceDrop={onPieceDrop}
          onSquareClick={onSquareClick} // Add square click handler
          boardWidth={400}
          customPieces={customPieces}
          customBoardStyle={{
            borderRadius: "4px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
          }}
          customDarkSquareStyle={{ backgroundColor: "#90a955" }} // Green
          customLightSquareStyle={{ backgroundColor: "#ffffff" }} // Off-white
          highlightedSquares={highlightedSquares} // Pass highlighted squares
        />
      </div>
    </>
  );
};

export default ChessGame;
