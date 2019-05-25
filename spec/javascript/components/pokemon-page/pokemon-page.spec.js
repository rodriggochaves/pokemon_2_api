import React from "react";
import { shallow } from "enzyme";
import { Redirect } from "react-router";

import PokemonPage from "packs/components/pokemon-page/pokemon-page";

describe("PokemonPage", () => {
  const prepareComponent = () => {
    const destroyComponentMock = jest.fn(() => {
      return Promise.resolve(null);
    });
    const pokemon = {
      name: "Charmander",
      type: "fire",
      evolutions: []
    };
    return shallow(
      <PokemonPage
        pokemon={pokemon}
        fetchPokemon={jest.fn()}
        destroyPokemon={destroyComponentMock}
      />
    );
  };

  it("have a button to destroy pokemon", () => {
    const component = prepareComponent();
    expect(component.find("button[aria-label='destroy']").length).toEqual(1);
  });

  it("can destroy the pokemon", () => {
    const component = prepareComponent();
    component.find("button[aria-label='destroy']").simulate("click");
    expect(component.instance().props.destroyPokemon).toHaveBeenCalled();
  });

  it("redirect after destroy", async () => {
    const component = prepareComponent();
    await component.find("button[aria-label='destroy']").simulate("click");
    expect(component.find(Redirect).length).toEqual(1);
  });
});
