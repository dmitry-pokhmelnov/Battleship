import React from 'react';
import '../styles/Cell.css'

export interface CellProps {
    isShip: boolean;
    wasHitted?: boolean;
    visible: boolean;
    onClick?: ()=>void;
    i: number;
    j: number;
}

class Cell extends React.Component<CellProps> {       
    render(){
        return(
            <button 
                className={`BtnCell ${this.props.isShip && this.props.visible ? 'BtnCellShip' : ''}`}
                onClick={this.props.onClick}
            />
        )
    };
}
export default Cell;