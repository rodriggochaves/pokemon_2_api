import React from 'react';
import { shallow } from 'enzyme';

import Pokedex from 'packs/pokedex';

describe("Pokedex Component", () => {
  it("can be rendered", () => {
    expect(<Pokedex />).toBeDefined();
  });

  it("it has a title", () => {
    const wrapper = shallow(<Pokedex />);
    expect(wrapper.text()).toEqual("Hello Pokemons");
  })
});
