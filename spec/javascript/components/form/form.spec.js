import React from "react";
import { shallow } from "enzyme";

import Form from "packs/components/form/form";

describe("Form", () => {
  const kinds = [
    { id: 1, description: "grass" },
    { id: 2, description: "poison" },
    { id: 3, description: "fire" }
  ];

  const pokemons = [
    { id: 1, name: "Charmander" },
    { id: 2, name: "Charmeleon", kind1: "fire", evolve_from_id: 1 },
    { id: 3, name: "Charizard" }
  ];

  it("renders", () => {
    const component = shallow(
      <Form kinds={kinds} pokemons={pokemons} getKinds={jest.fn()} />
    );
    expect(component).toBeDefined();
  });

  it("can change the name", () => {
    const component = shallow(
      <Form kinds={kinds} pokemons={pokemons} getKinds={jest.fn()} />
    );
    component.find("input[name='poke_index']").simulate("change", {
      target: { value: "1", name: "poke_index" }
    });
    expect(component.state("pokemon").poke_index).toEqual("1");
  });

  it("can change the name", () => {
    const component = shallow(
      <Form kinds={kinds} pokemons={pokemons} getKinds={jest.fn()} />
    );
    component.find("input[name='name']").simulate("change", {
      target: { value: "bulbasaur", name: "name" }
    });
    expect(component.state("pokemon").name).toEqual("bulbasaur");
  });

  it("can change the kind1", () => {
    const component = shallow(
      <Form kinds={kinds} pokemons={pokemons} getKinds={jest.fn()} />
    );
    component
      .find("select[name='kind1']")
      .simulate("change", { target: { value: "grass", name: "kind1" } });
    expect(component.state("pokemon").kind1).toEqual("grass");
  });

  it("can change the kind2", () => {
    const component = shallow(
      <Form kinds={kinds} pokemons={pokemons} getKinds={jest.fn()} />
    );
    component
      .find("select[name='kind2']")
      .simulate("change", { target: { value: "poison", name: "kind2" } });
    expect(component.state("pokemon").kind2).toEqual("poison");
  });

  it("can change the evolve from", () => {
    const component = shallow(
      <Form kinds={kinds} pokemons={pokemons} getKinds={jest.fn()} />
    );
    const event = { target: { value: 1, name: "evolve_from" } };
    component.find("select[name='evolve_from_id']").simulate("change", event);
    expect(component.state("pokemon").evolve_from).toEqual(1);
  });

  describe("prepare kinds selects", () => {
    const component = shallow(
      <Form kinds={kinds} pokemons={pokemons} getKinds={jest.fn()} />
    );

    it("kind 1", () => {
      expect(
        component.find("select[name='kind1']").find("option").length
      ).toEqual(4);
    });

    it("kind 2", () => {
      expect(
        component.find("select[name='kind2']").find("option").length
      ).toEqual(4);
    });
  });

  it("prepare evolution select", () => {
    const component = shallow(
      <Form kinds={kinds} pokemons={pokemons} getKinds={jest.fn()} />
    );
    expect(
      component.find("select[name='evolve_from_id']").find("option").length
    ).toEqual(4);
  });

  describe("can populate inputs with pokemon", () => {
    const pokemon = pokemons[1];
    const component = shallow(
      <Form
        kinds={kinds}
        pokemons={pokemons}
        getKinds={jest.fn()}
        pokemon={pokemon}
      />
    );

    it("name", () => {
      const value = component.find("input[name='name']").get(0).props.value;
      expect(value).toEqual("Charmeleon");
    });

    it("kind1", () => {
      const value = component.find("select[name='kind1']").props().value;
      expect(value).toEqual("fire");
    });

    xit("kind2", () => {
      const select = component.find("select[name='kind2']");
      const result = select.find("option").map(op => op.get(0).props.selected);
      expect(result).toEqual([undefined, undefined, undefined, undefined]);
    });

    it("evolve from", () => {
      const value = component.find("select[name='evolve_from_id']").props()
        .value;
      expect(value).toEqual(1);
    });
  });

  it("redirects to home page after submit", async () => {
    const pokemon = pokemons[1];
    const component = shallow(
      <Form
        kinds={kinds}
        pokemons={pokemons}
        getKinds={jest.fn()}
        pokemon={pokemon}
        submit={jest.fn(() => Promise.resolve(null))}
        link={jest.fn()}
      />
    );

    await component
      .find("form")
      .simulate("submit", { preventDefault: jest.fn() });
    expect(component.instance().props.link).toHaveBeenCalledWith("pokedex");
  });
});
