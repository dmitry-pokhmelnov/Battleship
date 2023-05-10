import React from "react";
import "../styles/Cell.css";

export interface CellProps {
  isShip: boolean;
  wasHit?: boolean;
  visible: boolean;
  shipId?: number;
  onClick?: () => void;
}

export const Cell: React.FC<CellProps> = React.memo(({ isShip, wasHit, visible, onClick }) => {
  return (
    <button
      className={`BtnCell ${isShip && visible ? "BtnCellShip" : ""} ${
        wasHit ? (isShip ? "BtnCellDestroyedShip" : "BtnCellEmptyHit") : ""
      }`}
      onClick={onClick}
    />
  );
});
