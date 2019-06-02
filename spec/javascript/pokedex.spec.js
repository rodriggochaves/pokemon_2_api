import React from "react";
import { shallow } from "enzyme";

import Pokedex from "packs/pokedex";

describe("Pokedex Component", () => {
  it("can be rendered", () => {
    expect(<Pokedex fetchPokemons={jest.fn()} />).toBeDefined();
  });

  it("it has a title", () => {
    const wrapper = shallow(<Pokedex fetchPokemons={jest.fn()} />);
    expect(wrapper.find("h1").text()).toEqual("Pokedex");
  });

  it("user can click to go to Create Page", () => {
    const wrapper = shallow(
      <Pokedex fetchPokemons={jest.fn()} link={jest.fn()} />
    );
    wrapper.find("button[aria-label='create-page']").simulate("click");
    expect(wrapper.instance().props.link).toHaveBeenCalledWith("create-page");
  });
});
