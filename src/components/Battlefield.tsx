import React from "react";
import Cell, { CellProps } from "./Cell";
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
interface BattleFieldState {
  field: CellProps[][];
}

export interface ShipLayoutData {
  shipTypes: { [key: string]: ShipType };
  layout: { ship: string; id: number; positions: number[][] }[];
}

class BattleField extends React.Component<BattleFieldProps, BattleFieldState> {
  constructor(props: BattleFieldProps) {
    super(props);
    this.state = { field: this.getBattlefieldMap(props.shipLayoutData) };
  }

  cellClickHandler = (i: number, j: number, shipId?: number) => {
    if (this.props.currentPlayer !== this.props.player) return;
    const prevFieldState = this.state.field;
    prevFieldState[i][j].wasHitted = true;
    shipId && this.checkShipDestroyed(prevFieldState, shipId);
    this.setState({
      field: prevFieldState
    });
    this.endTurn();
  };

  checkShipDestroyed = (prevFieldState: CellProps[][], shipId: number) => {
    this.props.shipLayoutData.layout.forEach(ship => {
      if (ship.id === shipId) {
        let destroyed = true;
        ship.positions.forEach(position => {
          if (prevFieldState[position[0]][position[1]].wasHitted === false)
            destroyed = false;
        });
        if (destroyed) {
          ship.positions.forEach(position => {
            for (let i = position[0] - 1; i < position[0] - 1 + 3; i++) {
              for (let j = position[1] - 1; j < position[1] - 1 + 3; j++) {
                if (prevFieldState[i] && prevFieldState[i][j]) {
                  prevFieldState[i][j].wasHitted = true;
                }
              }
            }
          });
        }
      }
    });
  };

  endTurn() {
    console.log("EndTurn");
    setCurrentPlayer(this.props.player === "player1" ? "player1" : "player2");
  }

  getEmptyBattlefield = (): CellProps[][] => {
    const size = this.props.battleFieldSize || 10;
    const emptyLayout = new Array(size);
    for (let i = 0; i < emptyLayout.length; i++) {
      emptyLayout[i] = new Array(size);
    }
    return this.fillEmptyLayoutByEmptyCells(emptyLayout);
  };

  fillEmptyLayoutByEmptyCells = (layout: CellProps[][]) => {
    for (let i = 0; i < layout.length; i++) {
      for (let j = 0; j < layout[i].length; j++) {
        layout[i][j] = {
          isShip: false,
          visible: true,
          onClick: () => this.cellClickHandler(i, j),
          i: i,
          j: j
        };
      }
    }
    return layout;
  };

  getBattlefieldMap(shipLayoutData: ShipLayoutData) {
    const battlefield = this.getEmptyBattlefield();
    shipLayoutData.layout.forEach(ship => {
      ship.positions.forEach(value => {
        battlefield[value[0]][value[1]] = {
          isShip: true,
          wasHitted: false,
          shipId: ship.id,
          visible: this.props.areShipsVisible,
          onClick: () => this.cellClickHandler(value[0], value[1], ship.id),
          i: value[0],
          j: value[1]
        };
      });
    });

    return battlefield;
  }

  renderBattlefield() {
    const battlefield = this.state.field;
    return battlefield.map((row, index) => (
      <div key={index} className="row">
        {" "}
        {this.renderRow(row, index)}{" "}
      </div>
    ));
  }

  renderRow(row: CellProps[], rowIndex: number) {
    return row.map((cellProps, colIndex) => (
      <Cell key={`${rowIndex},${colIndex}`} {...cellProps} />
    ));
  }

  render() {
    return <div className="Battlefield">{this.renderBattlefield()}</div>;
  }
}
const mapStateToProps = (state: any) => ({
  currentPlayer: state.currentPlayer
});
const mapDispatchToProps = (dispatch: any) => ({
  setCurrentPlayer: (player: string) => dispatch(setCurrentPlayer(player))
});

export default connect(mapStateToProps, mapDispatchToProps)(BattleField);
