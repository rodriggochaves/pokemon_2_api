import React from "react";
import { shallow } from "enzyme";
import { Redirect } from "react-router";

import CreatePokemonPage from "packs/components/create-pokemon-page/create-pokemon-page";

describe("CreatePokemonPage", () => {
  const prepareComponent = () => {
    const postPokemonMock = jest.fn(() => {
      return Promise.resolve(null);
    });
    const kinds = [
      { description: "grass" },
      { description: "poison" },
      { description: "fire" }
    ];
    const pokemons = [
      { id: 1, name: "charmander" },
      { id: 2, name: "charmeleon" }
    ];
    return shallow(
      <CreatePokemonPage
        pokemons={pokemons}
        postPokemon={postPokemonMock}
        kinds={kinds}
        getKinds={jest.fn()}
      />
    );
  };

  it("can be rendered", () => {
    const component = prepareComponent();
    expect(component).toBeDefined();
  });

  it("can change the name", () => {
    const component = prepareComponent();
    component
      .find("input[name='name']")
      .simulate("change", { target: { value: "bulbasaur", name: "name" } });
    expect(component.state("name")).toEqual("bulbasaur");
  });

  it("can change the type1", () => {
    const component = prepareComponent();
    component
      .find("select[name='type1']")
      .simulate("change", { target: { value: "grass", name: "type1" } });
    expect(component.state("type1")).toEqual("grass");
  });

  it("can change the type2", () => {
    const component = prepareComponent();
    component
      .find("select[name='type2']")
      .simulate("change", { target: { value: "poison", name: "type2" } });
    expect(component.state("type2")).toEqual("poison");
  });

  it("can change the evolve from", () => {
    const component = prepareComponent();
    const event = { target: { value: 1, name: "evolve_from" } };
    component.find("select[name='evolve_from']").simulate("change", event);
    expect(component.state("evolve_from")).toEqual(1);
  });

  describe("prepare kinds selects", () => {
    const component = prepareComponent();

    it("type 1", () => {
      expect(
        component.find("select[name='type1']").find("option").length
      ).toEqual(4);
    });

    it("type 2", () => {
      expect(
        component.find("select[name='type2']").find("option").length
      ).toEqual(4);
    });
  });

  it("prepare evolution select", () => {
    const component = prepareComponent();
    expect(
      component.find("select[name='evolve_from']").find("option").length
    ).toEqual(3);
  });

  it("can post a pokemon", () => {
    const component = prepareComponent();
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

  it("redirect to home after create", async () => {
    const component = prepareComponent();
    const pokemon = {
      name: "charizard",
      type1: "fire",
      type2: "flying",
      evolveFrom: "charmeleon"
    };
    component.setState(pokemon);
    await component
      .find("form")
      .simulate("submit", { preventDefault: jest.fn() });

    expect(component.find(Redirect).length).toEqual(1);
  });
});
