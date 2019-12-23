import { createStore, compose } from "redux";
import rootReducer from "../components/RootReducer";

let devTools;
if ((window as any).__REDUX_DEVTOOLS_EXTENSION__) {
  devTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__();
} else {
  devTools = (a: any) => a;
}

const composedEnhancers = compose(devTools);

export const configureStore = (initialState = {}) => {
  return createStore(rootReducer, initialState, composedEnhancers);
};
