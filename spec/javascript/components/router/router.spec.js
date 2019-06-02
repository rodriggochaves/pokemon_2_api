import React from "react";
import { shallow } from "enzyme";

import Router from "packs/components/router/router";
import PokemonPageContainer from "packs/components/pokemon-page/pokemon-page-container";
import UpdatePageContainer from "packs/components/update-page/update-page-container";
import CreatePageContainer from "packs/components/create-page/create-page-container";

describe("Component: Router", () => {
  it("renders pokemon page", () => {
    const component = shallow(<Router component="pokemon-page" />);
    expect(component.find(PokemonPageContainer).length).toEqual(1);
  });

  it("renders update page", () => {
    const component = shallow(<Router component="update-page" />);
    expect(component.find(UpdatePageContainer).length).toEqual(1);
  });

  it("renders create page", () => {
    const component = shallow(<Router component="create-page" />);
    expect(component.find(CreatePageContainer).length).toEqual(1);
  });
});
