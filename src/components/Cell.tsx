import React from 'react';
import '../styles/Cell.css'

export interface CellProps {
    isShip: boolean;
    wasHitted?: boolean;
    visible: boolean;
    shipId?: number;
    onClick?: ()=>void;
    i: number;
    j: number;
}

class Cell extends React.Component<CellProps> {       
    render(){
        const isShip = this.props.isShip;
        const visible = this.props.visible;
        const wasHitted = this.props.wasHitted;
        return(
            <button 
                className={`BtnCell ${isShip && visible ? 'BtnCellShip' : ''} ${wasHitted ?  isShip ? 'BtnCellDestroyedShip' : 'BtnCellEmptyHitted' : ''}`}
                onClick={this.props.onClick}
            />
        )
    };
}
export default Cell;