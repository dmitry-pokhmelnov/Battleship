import React from 'react';
import Cell, {CellProps}  from './Cell';

interface BattleFieldProps {
  areShipsVisible: boolean;
  shipLayoutData: ShipLayoutData;
  battleFieldSize?: number;
}

interface ShipType {
  size: number;
  count: number;
}

export interface ShipLayoutData {
  shipTypes: {[key:string]:ShipType};
  layout: { "ship": string; "positions": number[][]; }[];
}

class BattleField extends React.Component<BattleFieldProps> {
  cellClickHandler = (isShip: boolean) => {
      console.log(isShip);
  }

  getEmptyBattlefield = (): CellProps[][] => {
    const size = this.props.battleFieldSize || 10;
    const emptyLayout = new Array(size);
    for (let i = 0; i < emptyLayout.length; i++) {
      emptyLayout[i] = new Array(size);      
    }
    return this.fillEmptyLayoutByEmptyCells(emptyLayout);
  }

  fillEmptyLayoutByEmptyCells = (layout: CellProps[][]) => {
    for (let i = 0; i < layout.length; i++) {
      for (let j = 0; j < layout[i].length; j++) {
        layout[i][j] = {
          isShip : false,
          visible: true,
          onClick: () => this.cellClickHandler(false),         
          i: i,
          j: j
        }
      }
    }
    return layout;
  }

  getBattlefieldMap(shipLayoutData: ShipLayoutData) {
    const battlefield = this.getEmptyBattlefield();
    shipLayoutData.layout.forEach((value) => {
      value.positions.forEach(value => {
        battlefield[value[0]][value[1]] = {
          isShip : true,
          wasHitted: false,
          visible: this.props.areShipsVisible,
          onClick: () => this.cellClickHandler(true),
          i: value[0],
          j: value[1]
        };
      })
    })

    return battlefield;
  }

  renderBattlefield() {
    const battlefield = this.getBattlefieldMap(this.props.shipLayoutData);
    return battlefield.map((row, index) => (
      <div key={index} className='row'> {this.renderRow(row, index)} </div>      
    ));
  }

  renderRow(row: CellProps[], rowIndex: number) {
    return row.map((cellProps, colIndex) => (
      <Cell key={`${rowIndex},${colIndex}`} {...cellProps} />
    ));
  }

  render(){
    return(
      <div>
        {this.renderBattlefield()}
      </div>
    );
  }
}
export default BattleField;