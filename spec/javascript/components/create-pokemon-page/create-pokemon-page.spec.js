import React from "react";
import { shallow } from "enzyme";

import CreatePokemonPage from "packs/components/create-pokemon-page/create-pokemon-page";

describe("CreatePokemonPage", () => {
  it("can be rendered", () => {
    const component = shallow(<CreatePokemonPage />);
    expect(component).toBeDefined();
  });

  it("can change the name", () => {
    const component = shallow(<CreatePokemonPage />);
    component
      .find("input[name='name']")
      .simulate("change", { target: { value: "bulbasaur", name: "name" } });
    expect(component.state("name")).toEqual("bulbasaur");
  });

  it("can change the type1", () => {
    const component = shallow(<CreatePokemonPage />);
    component
      .find("select[name='type1']")
      .simulate("change", { target: { value: "grass", name: "type1" } });
    expect(component.state("type1")).toEqual("grass");
  });

  it("can change the type2", () => {
    const component = shallow(<CreatePokemonPage />);
    component
      .find("select[name='type2']")
      .simulate("change", { target: { value: "poison", name: "type2" } });
    expect(component.state("type2")).toEqual("poison");
  });

  it("can change the evolve from", () => {
    const component = shallow(<CreatePokemonPage />);
    const event = { target: { value: "bulbasaur", name: "evolve_from" } };
    component.find("select[name='evolve_from']").simulate("change", event);
    expect(component.state("evolve_from")).toEqual("bulbasaur");
  });

  it("can post a pokemon", () => {
    const component = shallow(<CreatePokemonPage postPokemon={jest.fn()} />);
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
