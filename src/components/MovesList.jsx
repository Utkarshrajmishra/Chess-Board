import { useContext } from "react";
import { ChessGameContext } from "../context/GameContext";

const MovesList = () => {
  const { moveLog, gameStatus } = useContext(ChessGameContext);
  return (
    <div className="flex flex-col overflow-x-auto rounded w-[405px] h-[200px] bg-neutral-800 gap-2 p-4 overflow-auto">
      <div className="text-white">
        {moveLog && moveLog.length > 0 ? (
          moveLog.reduce((rows, move, index) => {
            if (index % 2 === 0) {
              const whiteMove = move.san;
              const blackMove = moveLog[index + 1]?.san || "";
              rows.push(
                <div
                  key={index}
                  className={`flex justify-between p-1 ${
                    Math.floor(index / 2) % 2 === 0 ? "bg-neutral-700" : ""
                  } px-4`}
                >
                  <span className="mr-2 text-sm">
                    {Math.floor(index / 2) + 1}.
                  </span>
                  <span className="mr-4 font-inter text-sm">{whiteMove}</span>
                  <span className="text-sm font-inter">{blackMove}</span>
                </div>
              );
            }
            return rows;
          }, [])
        ) : (
          <p>No moves yet</p>
        )}
      </div>
    </div>
  );
};

export default MovesList;
