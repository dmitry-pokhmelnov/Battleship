import React from "react";
import { Provider } from "react-redux";
import Game from "./components/Game";
import Container from "react-bootstrap/Container";
import { configureStore } from "./store/configureStore";

const store = configureStore({});

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Container>
        <Game fieldSize={10} />
      </Container>
    </Provider>
  );
};

export default App;
