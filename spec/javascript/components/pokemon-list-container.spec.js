import React from "react";
import configureStore from "redux-mock-store";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";

import PokemonListContainer from "packs/components/pokemon-list/pokemon-list-container";

describe("Pokedex Component", () => {
  const renderPokemonListContainer = initialState => {
    const mockStore = configureStore();
    const store = mockStore(initialState);
    return mount(
      <Provider store={store}>
        <MemoryRouter>
          <PokemonListContainer />
        </MemoryRouter>
      </Provider>
    );
  };

  it("can be rendered", () => {
    const initialState = {
      pokemons: [{ id: 1, name: "bulbasaur" }, { id: 2, name: "ivysaur" }]
    };
    const component = renderPokemonListContainer(initialState);
    expect(component).toBeDefined();
  });

  describe("display pokemon information", () => {
    let pokemonInfo;
    const spriteUrl =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png";

    beforeEach(() => {
      const initialState = {
        pokemons: [
          {
            id: 1,
            name: "bulbasaur",
            image_url: spriteUrl,
            kind1: "grass",
            kind2: "poison"
          }
        ]
      };
      const component = renderPokemonListContainer(initialState);
      pokemonInfo = component
        .find("tr")
        .at(1)
        .find("td");
    });

    it("shows image", () =>
      expect(
        pokemonInfo
          .at(0)
          .find("img")
          .prop("src")
      ).toEqual(spriteUrl));
    it("shows name", () =>
      expect(pokemonInfo.at(1).text()).toEqual("bulbasaur"));
    it("shows kind", () =>
      expect(pokemonInfo.at(2).text()).toEqual("grass/poison"));
  });
});
