import reducer from "packs/reducers/router";
import PokedexContainer from "packs/pokedex-container";
import PokemonPageContainer from "packs/components/pokemon-page/pokemon-page-container";
import actionsTypes from "packs/actions/types";

describe("Reducers: Router", () => {
  it("initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual("pokedex");
  });

  it("ROUTE action", () => {
    const action = {
      type: actionsTypes.ROUTE,
      page: "pokemon-page"
    };
    expect(reducer(undefined, action)).toEqual("pokemon-page");
  });
});
