import React from "react";
import { shallow } from "enzyme";

import PokemonPage from "packs/components/pokemon-page/pokemon-page";

describe("PokemonPage", () => {
  const prepareComponent = () => {
    const destroyComponentMock = jest.fn(() => Promise.resolve(null));
    const pokemon = {
      id: 42,
      name: "Charmander",
      type: "fire",
      evolutions: []
    };

    const component = shallow(
      <PokemonPage
        pokemon={pokemon}
        fetchPokemon={jest.fn()}
        destroyPokemon={destroyComponentMock}
        link={jest.fn()}
      />
    );

    return component;
  };

  it("have a button to destroy pokemon", () => {
    const component = prepareComponent();
    expect(component.find("button[aria-label='destroy']").length).toEqual(1);
  });

  // this tests are skipped because we dont know how to handle the redirect
  // callback. Right now, we get a infinity loop
  it("can destroy the pokemon", () => {
    const component = prepareComponent();
    component.find("button[aria-label='destroy']").simulate("click");
    const page = component.find(PokemonPage);
    expect(component.instance().props.destroyPokemon).toHaveBeenCalledWith(42);
  });

  it("redirect after destroy", async () => {
    const component = prepareComponent();
    await component.find("button[aria-label='destroy']").simulate("click");
    expect(component.instance().props.link).toHaveBeenCalledWith("pokedex");
  });

  it("link to update page", () => {
    const component = prepareComponent();
    component.find("a[aria-label='update']").simulate("click");
    expect(component.instance().props.link).toHaveBeenCalledWith("update-page");
  });
});
