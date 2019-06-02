import React from "react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";

import RouterContainer from "packs/components/router/router-container";
import pokedexApp from "./reducers";
import logger from "./utils/logger";

const store = createStore(pokedexApp, applyMiddleware(thunk, logger));

export default props => {
  return (
    <Provider store={store}>
      <RouterContainer />
    </Provider>
  );
};
