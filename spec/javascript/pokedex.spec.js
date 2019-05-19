import React from 'react';
import { shallow } from 'enzyme';

import Pokedex from 'packs/pokedex';

describe("Pokedex Component", () => {
  it("can be rendered", () => {
    expect(<Pokedex fetchPokemons={jest.fn()} />).toBeDefined();
  });

  it("it has a title", () => {
    const wrapper = shallow(<Pokedex  fetchPokemons={jest.fn()} />);
    expect(wrapper.text()).toEqual("Pokedex");
  })
});
