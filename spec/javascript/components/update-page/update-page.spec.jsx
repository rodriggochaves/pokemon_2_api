import React from "react";
import { shallow } from "enzyme";

import UpdatePage from "packs/components/update-page/update-page";

describe("UpdatePage", () => {
  it("can be rendered", () => {
    const pokemon = {
      name: "squirtle",
      kind1: "water",
      kind2: null,
      evolveFrom: null,
      pokeIndex: 4
    };

    const kinds = [
      { id: 1, description: "grass" },
      { id: 2, description: "poison" },
      { id: 3, description: "fire" }
    ];

    const component = shallow(<UpdatePage pokemon={pokemon} kinds={kinds} />);
  });
});
