import React from "react";
import Battlefield, { ShipLayoutData } from "./Battlefield";
import "../styles/Game.css";

interface GameProps {
  fieldSize: number;
}

const shipLayoutData: ShipLayoutData = {
  shipTypes: {
    carrier: { size: 5, count: 1 },
    battleship: { size: 4, count: 1 },
    cruiser: { size: 3, count: 1 },
    submarine: { size: 3, count: 1 },
    destroyer: { size: 2, count: 1 },
  },
  // We can use current array index of ship instead of "id" field
  layout: [
    {
      ship: "carrier",
      id: 1,
      positions: [
        [2, 9],
        [3, 9],
        [4, 9],
        [5, 9],
        [6, 9],
      ],
    },
    {
      ship: "battleship",
      id: 2,
      positions: [
        [5, 2],
        [5, 3],
        [5, 4],
        [5, 5],
      ],
    },
    {
      ship: "cruiser",
      id: 3,
      positions: [
        [8, 1],
        [8, 2],
        [8, 3],
      ],
    },
    {
      ship: "submarine",
      id: 4,
      positions: [
        [3, 0],
        [3, 1],
        [3, 2],
      ],
    },
    {
      ship: "destroyer",
      id: 5,
      positions: [
        [0, 0],
        [1, 0],
      ],
    },
  ],
};

export const Game: React.FC<GameProps> = React.memo(({ fieldSize }) => {
  return (
    <div className="Game">
      <Battlefield shipLayoutData={shipLayoutData} areShipsVisible battleFieldSize={fieldSize} player="player1" />
      <Battlefield
        shipLayoutData={shipLayoutData}
        areShipsVisible={false}
        battleFieldSize={fieldSize}
        player="player2"
      />
    </div>
  );
});
