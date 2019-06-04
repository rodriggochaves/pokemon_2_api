import React from "react";
import { shallow } from "enzyme";

import PokemonList from "packs/components/pokemon-list/pokemon-list";

describe("PokemonList", () => {
  const pokemonList = [
    {
      id: 1,
      name: "bulbasaur",
      kind1: "grass",
      kind2: "poison",
      image_url: "https://image.com/1"
    },
    {
      id: 2,
      name: "ivysaur",
      kind1: "grass",
      kind2: "poison",
      image_url: "https://image.com/2"
    },
    {
      id: 3,
      name: "venosaur",
      kind1: "grass",
      kind2: "poison",
      image_url: "https://image.com/3"
    }
  ];

  it("renders all pokemons", () => {
    const wrapper = shallow(
      <PokemonList
        fetchAllPokemons={jest.fn()}
        pokemons={pokemonList}
        query=""
      />
    );

    expect(wrapper.find("tbody").find("tr").length).toEqual(3);
  });

  it("can filter pokemon list", () => {
    const wrapper = shallow(
      <PokemonList
        fetchAllPokemons={jest.fn()}
        pokemons={pokemonList}
        query="bul"
      />
    );

    expect(wrapper.find("tbody").find("tr").length).toEqual(1);
  });

  describe("display pokemon information", () => {
    let pokemonInfo;

    beforeEach(() => {
      const component = shallow(
        <PokemonList fetchAllPokemons={jest.fn()} pokemons={pokemonList} />
      );
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
      ).toEqual("https://image.com/1"));
    it("shows name", () =>
      expect(pokemonInfo.at(1).text()).toEqual("bulbasaur"));
    it("shows kind", () =>
      expect(pokemonInfo.at(2).text()).toEqual("grass/poison"));
  });
});
