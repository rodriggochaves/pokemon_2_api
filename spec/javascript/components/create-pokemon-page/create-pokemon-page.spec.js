import React from "react";
import { shallow } from "enzyme";

import CreatePokemonPage from "packs/components/create-pokemon-page/create-pokemon-page";

describe("CreatePokemonPage", () => {
  const postPokemonMock = jest.fn();
  const pokemons = [
    { id: 1, name: "charmander" },
    { id: 2, name: "charmeleon" }
  ];
  const component = shallow(
    <CreatePokemonPage pokemons={pokemons} postPokemon={postPokemonMock} />
  );

  it("can be rendered", () => {
    expect(component).toBeDefined();
  });

  it("can change the name", () => {
    component
      .find("input[name='name']")
      .simulate("change", { target: { value: "bulbasaur", name: "name" } });
    expect(component.state("name")).toEqual("bulbasaur");
  });

  it("can change the type1", () => {
    component
      .find("select[name='type1']")
      .simulate("change", { target: { value: "grass", name: "type1" } });
    expect(component.state("type1")).toEqual("grass");
  });

  it("can change the type2", () => {
    component
      .find("select[name='type2']")
      .simulate("change", { target: { value: "poison", name: "type2" } });
    expect(component.state("type2")).toEqual("poison");
  });

  it("can change the evolve from", () => {
    const event = { target: { value: 1, name: "evolve_from" } };
    component.find("select[name='evolve_from']").simulate("change", event);
    expect(component.state("evolve_from")).toEqual(1);
  });

  it("prepare the page", () => {
    expect(
      component.find("select[name='evolve_from']").find("option").length
    ).toEqual(3);
  });

  it("can post a pokemon", () => {
    const pokemon = {
      name: "charizard",
      type1: "fire",
      type2: "flying",
      evolveFrom: "charmeleon"
    };
    component.setState(pokemon);
    component.find("form").simulate("submit", { preventDefault: jest.fn() });

    expect(component.instance().props.postPokemon).toHaveBeenCalledWith({
      name: "charizard",
      kind: "fire/flying",
      evolveFrom: "charmeleon"
    });
  });
});
