import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router';

import PokemonList from 'packs/components/pokemon-list/pokemon-list';

describe("PokemonList", () => {
  const pokemonList = [
    { id: 1, name: 'bulbasaur', kind: "grass/poison" },
    { id: 2, name: 'ivysaur', kind: "grass/poison" },
    { id: 3, name: 'venosaur', kind: "grass/poison" },
  ];

  it("renders all pokemons", () => {
    const wrapper = shallow(
      <PokemonList
        pokemons={pokemonList}
        query=""
      />
    );

    expect(wrapper.find('tbody').find('tr').length).toEqual(3);
  });

  it("can filter pokemon list", () => {
    const wrapper = shallow(
      <PokemonList
        pokemons={pokemonList}
        query="bul"
      />
    );

    expect(wrapper.find('tbody').find('tr').length).toEqual(1);
  });
});
