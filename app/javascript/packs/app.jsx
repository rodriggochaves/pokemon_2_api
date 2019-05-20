import React from 'react';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter, Route } from 'react-router-dom';

import PokedexContainer from './pokedex-container';
import pokedexApp from './reducers'

const store = createStore(pokedexApp, applyMiddleware(thunk))

export default (props) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route path="/" component={PokedexContainer} />
      </BrowserRouter>
    </Provider>
  )
}
