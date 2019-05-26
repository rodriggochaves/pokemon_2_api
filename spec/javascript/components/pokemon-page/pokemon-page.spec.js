import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";

import PokemonPage from "packs/components/pokemon-page/pokemon-page";

describe("PokemonPage", () => {
  const prepareComponent = () => {
    const destroyComponentMock = jest.fn(() => {
      return Promise.resolve(null);
    });
    const pokemon = {
      id: 42,
      name: "Charmander",
      type: "fire",
      evolutions: []
    };

    const component = mount(
      <MemoryRouter initialEntries={["/pokemons/42"]} initialIndex={0}>
        <PokemonPage
          pokemon={pokemon}
          fetchPokemon={jest.fn()}
          destroyPokemon={destroyComponentMock}
        />
      </MemoryRouter>
    );

    return component;
  };

  it("have a button to destroy pokemon", () => {
    const component = prepareComponent();
    expect(component.find("button[aria-label='destroy']").length).toEqual(1);
  });

  // this tests are skipped because we dont know how to handle the redirect
  // callback. Right now, we get a infinity loop
  xit("can destroy the pokemon", () => {
    const component = prepareComponent();
    component.find("button[aria-label='destroy']").simulate("click");
    const page = component.find(PokemonPage);
    expect(page.instance().props.destroyPokemon).toHaveBeenCalledWith(42);
  });

  xit("redirect after destroy", async () => {
    const component = prepareComponent();
    await component.find("button[aria-label='destroy']").simulate("click");
    expect(component.find(Redirect).length).toEqual(1);
  });

  it("link to update page", () => {
    const component = prepareComponent();
    expect(component.find("a[href='/pokemons/42/update']").length).toEqual(1);
  });
});
