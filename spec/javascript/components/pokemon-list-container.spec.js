import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import PokemonListContainer from 'packs/components/pokemon-list/pokemon-list-container';

describe("Pokedex Component", () => {
  const renderPokemonListContainer = (initialState) => {
    const mockStore = configureStore()
    const store = mockStore(initialState)
    return mount(
      <Provider store={store}>
        <PokemonListContainer />
      </Provider>
    )
  }

  it("can be rendered", () => {
    const initialState = { pokemons: [{id: 1, name: 'bulbasaur'}, {id: 2, name: 'ivysaur'}] }
    const component = renderPokemonListContainer(initialState);
    expect(component).toBeDefined();
  });

  describe("display pokemon information", () => {
    let pokemonInfo;

    beforeEach(() => {
      const initialState = { pokemons: [{id: 1, name: 'bulbasaur'}] }
      const component = renderPokemonListContainer(initialState);
      pokemonInfo = component.find('tr').at(1).find('td');
    })

    it("shows name", () => expect(pokemonInfo.at(0).text()).toEqual('bulbasaur'));
  })
});
