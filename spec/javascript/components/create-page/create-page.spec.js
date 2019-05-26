import React from "react";
import { shallow } from "enzyme";
import { Redirect } from "react-router";

import CreatePage from "packs/components/create-page/create-page";

describe("CreatePageContainer", () => {
  const prepareComponent = () => {
    const kinds = [
      { id: 1, description: "grass" },
      { id: 2, description: "poison" },
      { id: 3, description: "fire" }
    ];

    const pokemons = [
      { id: 1, name: "charmander" },
      { id: 2, name: "charmeleon" }
    ];

    return shallow(
      <CreatePage kinds={kinds} pokemons={pokemons} getKinds={jest.fn()} />
    );
  };

  it("can be rendered", () => {
    const component = prepareComponent();
    expect(component).toBeDefined();
  });

  xit("can post a pokemon", async () => {
    const component = prepareComponent();
    const pokemon = {
      name: "charizard",
      type1: "fire",
      type2: "flying",
      evolveFrom: 2
    };
    component.setState(pokemon);
    await component
      .find("form")
      .simulate("submit", { preventDefault: jest.fn() });

    console.log(store.getActions());
  });

  xit("redirect to home after create", async () => {
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
