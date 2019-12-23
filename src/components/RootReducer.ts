import { combineReducers } from "redux";

import currentPlayer from "./reducers/currentPlayer";

const rootReducer = combineReducers({
  currentPlayer
});

export default rootReducer;
