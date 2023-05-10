import React from "react";
import { Provider } from "react-redux";
import { Game } from "./components/Game";
import Container from "react-bootstrap/Container";
import { store } from "./store/store";

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <Container>
          <Game fieldSize={10} />
        </Container>
      </Provider>
    </React.StrictMode>
  );
};

export default App;
