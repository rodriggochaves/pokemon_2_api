import React from "react"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import { createStore, applyMiddleware } from "redux"
import { BrowserRouter, Route } from "react-router-dom"

import PokedexContainer from "./pokedex-container"
import PokemonPageContainer from "./components/pokemon-page/pokemon-page-container"
import CreatePokemonPageContainer from './components/create-pokemon-page/create-pokemon-page-container'
import pokedexApp from "./reducers"

const store = createStore(pokedexApp, applyMiddleware(thunk))

export default props => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route path="/" exact component={PokedexContainer} />
        <Route path="/pokemon/:id" component={PokemonPageContainer} />
        <Route path="/create/" component={CreatePokemonPageContainer} />
      </BrowserRouter>
    </Provider>
  )
}
