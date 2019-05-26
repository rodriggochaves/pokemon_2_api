import React from "react";
import configureStore from "redux-mock-store";
import { mount } from "enzyme";
import { Provider } from "react-redux";

import Form from "packs/components/form/form";
import FormContainer from "packs/components/form/form-container";

describe("Form", () => {
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

    const mockStore = configureStore();
    const store = mockStore({
      kinds,
      pokemons
    });

    return mount(
      <Provider store={store}>
        <FormContainer />
      </Provider>
    );
  };

  it("renders", () => {
    const component = prepareComponent();
    expect(component).toBeDefined();
  });

  it("can change the name", () => {
    const component = prepareComponent();
    component.find("input[name='name']").simulate("change", {
      target: { value: "bulbasaur", name: "name" }
    });
    expect(component.find(Form).state("pokemon").name).toEqual("bulbasaur");
  });

  it("can change the type1", () => {
    const component = prepareComponent();
    component
      .find("select[name='type1']")
      .simulate("change", { target: { value: "grass", name: "type1" } });
    expect(component.find(Form).state("pokemon").type1).toEqual("grass");
  });

  it("can change the type2", () => {
    const component = prepareComponent();
    component
      .find("select[name='type2']")
      .simulate("change", { target: { value: "poison", name: "type2" } });
    expect(component.find(Form).state("pokemon").type2).toEqual("poison");
  });

  it("can change the evolve from", () => {
    const component = prepareComponent();
    const event = { target: { value: 1, name: "evolve_from" } };
    component.find("select[name='evolve_from_id']").simulate("change", event);
    expect(component.find(Form).state("pokemon").evolve_from).toEqual(1);
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
      component.find("select[name='evolve_from_id']").find("option").length
    ).toEqual(3);
  });
});
