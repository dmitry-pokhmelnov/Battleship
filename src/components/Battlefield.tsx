import React, { useCallback, useEffect, useState } from "react";
import { Cell, CellProps } from "./Cell";
import "../styles/Battlefield.css";
import { connect } from "react-redux";
import { setCurrentPlayer } from "./actions/setCurrentPlayerAction";

interface BattleFieldProps {
  areShipsVisible: boolean;
  shipLayoutData: ShipLayoutData;
  battleFieldSize?: number;
  player: string;
  currentPlayer: string;
  setCurrentPlayer: (player: string) => {};
}

interface ShipType {
  size: number;
  count: number;
}

type BattleFieldState = CellProps[][];

export interface ShipLayoutData {
  shipTypes: { [key: string]: ShipType };
  layout: { ship: string; id: number; positions: number[][] }[];
}

export const Battlefield: React.FC<BattleFieldProps> = React.memo(
  ({ areShipsVisible, shipLayoutData, battleFieldSize }) => {
    const [field, setField] = useState<BattleFieldState>([]);

    const endTurn = useCallback(() => {
      console.log("EndTurn");
    }, []);

    const checkShipDestroyed = useCallback(
      (prevFieldState: CellProps[][], shipId: number) => {
        shipLayoutData.layout.forEach((ship) => {
          if (ship.id === shipId) {
            let destroyed = true;

            ship.positions.forEach((position) => {
              if (prevFieldState[position[0]][position[1]].wasHit === false) {
                destroyed = false;
              }
            });

            if (destroyed) {
              ship.positions.forEach((position) => {
                for (let i = position[0] - 1; i < position[0] - 1 + 3; i++) {
                  for (let j = position[1] - 1; j < position[1] - 1 + 3; j++) {
                    if (prevFieldState[i] && prevFieldState[i][j]) {
                      prevFieldState[i][j].wasHit = true;
                    }
                  }
                }
              });
            }
          }
        });
      },
      [shipLayoutData.layout]
    );

    const cellClickHandler = useCallback(
      (i: number, j: number, shipId?: number) => {
        setField((field) => {
          const currentField = field.map((row) => row.slice());
          currentField[i][j].wasHit = true;

          if (shipId) {
            checkShipDestroyed(currentField, shipId);
          }

          return currentField;
        });

        endTurn();
      },
      [checkShipDestroyed, endTurn]
    );

    const fillEmptyLayoutByEmptyCells = useCallback(
      (layout: CellProps[][]) => {
        for (let i = 0; i < layout.length; i++) {
          for (let j = 0; j < layout[i].length; j++) {
            layout[i][j] = {
              isShip: false,
              visible: true,
              onClick: () => cellClickHandler(i, j),
            };
          }
        }
        return layout;
      },
      [cellClickHandler]
    );

    const getEmptyBattlefield = useCallback((): CellProps[][] => {
      const size = battleFieldSize || 10;
      const emptyLayout = new Array(size);

      for (let i = 0; i < emptyLayout.length; i++) {
        emptyLayout[i] = new Array(size);
      }

      return fillEmptyLayoutByEmptyCells(emptyLayout);
    }, [battleFieldSize, fillEmptyLayoutByEmptyCells]);

    const getBattlefieldMap = useCallback(
      (shipLayoutData: ShipLayoutData) => {
        const battlefield = getEmptyBattlefield();

        shipLayoutData.layout.forEach((ship) => {
          ship.positions.forEach((value) => {
            battlefield[value[0]][value[1]] = {
              isShip: true,
              wasHit: false,
              shipId: ship.id,
              visible: areShipsVisible,
              onClick: () => cellClickHandler(value[0], value[1], ship.id),
            };
          });
        });

        return battlefield;
      },
      [areShipsVisible, cellClickHandler, getEmptyBattlefield]
    );

    useEffect(() => {
      setField(getBattlefieldMap(shipLayoutData));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shipLayoutData]);

    const renderRow = useCallback((row: CellProps[], rowIndex: number) => {
      return row.map((cellProps, colIndex) => <Cell key={`${rowIndex},${colIndex}`} {...cellProps} />);
    }, []);

    const renderBattlefield = useCallback(() => {
      return field.map((row, index) => (
        <div key={index} className="row">
          {renderRow(row, index)}
        </div>
      ));
    }, [field, renderRow]);

    return <div className="Battlefield">{renderBattlefield()}</div>;
  }
);

const mapStateToProps = (state: any) => ({
  currentPlayer: state.currentPlayer,
});

const mapDispatchToProps = (dispatch: any) => ({
  setCurrentPlayer: (player: string) => dispatch(setCurrentPlayer(player)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Battlefield);
