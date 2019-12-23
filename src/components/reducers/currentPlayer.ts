import { SET_CURRENT_PLAYER } from "../actions/setCurrentPlayerAction";

const currentPlayer = (state = "player2", action: any) => {
  console.log("Reducer");
  switch (action.type) {
    case SET_CURRENT_PLAYER: {
      console.log(action.payload);
      return action.payload;
    }
    default:
      return state;
  }
};

export default currentPlayer;
