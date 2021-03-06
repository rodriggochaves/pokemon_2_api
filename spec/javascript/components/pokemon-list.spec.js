import React from "react";
import { shallow } from "enzyme";

import PokemonList from "packs/components/pokemon-list/pokemon-list";
import Loading from "packs/components/loading/loading";

describe("PokemonList", () => {
  const pokemonList = [
    {
      id: 1,
      poke_index: "1",
      name: "bulbasaur",
      kind1: "grass",
      kind2: "poison",
      image_url: "https://image.com/1"
    },
    {
      id: 2,
      poke_index: "2",
      name: "ivysaur",
      kind1: "grass",
      kind2: "poison",
      image_url: "https://image.com/2"
    },
    {
      id: 3,
      poke_index: "3",
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

    it("id", () => {
      expect(pokemonInfo.at(0).text()).toEqual("1");
    });

    it("shows image", () =>
      expect(
        pokemonInfo
          .at(1)
          .find("img")
          .prop("src")
      ).toEqual("https://image.com/1"));
    it("shows name", () =>
      expect(pokemonInfo.at(2).text()).toEqual("bulbasaur"));
    it("shows kind", () =>
      expect(pokemonInfo.at(3).text()).toEqual("grass/poison"));
  });

  it("shows loader when loading", () => {
    const component = shallow(
      <PokemonList
        fetchAllPokemons={jest.fn()}
        pokemons={pokemonList}
        query=""
        isLoading={true}
      />
    );

    expect(component.find(Loading).length).toEqual(1);
  });

  it("can click to go to a pokemon page", () => {
    const component = shallow(
      <PokemonList
        fetchAllPokemons={jest.fn()}
        pokemons={pokemonList}
        query=""
        isLoading={false}
        selectAndLink={jest.fn()}
      />
    );

    component
      .find("button")
      .at(0)
      .simulate("click");

    expect(component.instance().props.selectAndLink).toHaveBeenCalledWith(
      1,
      "pokemon-page"
    );
  });
});
