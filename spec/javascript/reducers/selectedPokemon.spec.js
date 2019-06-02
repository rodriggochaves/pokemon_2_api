import reducer from "packs/reducers/selected-pokemon";
import types from "packs/actions/types";

describe("Reducers: selectedPokemon", () => {
  it("returns the initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual(null);
  });

  it("returns the pokemonId", () => {
    const action = { type: types.SELECT_POKEMON, selectedPokemon: 4 };
    expect(reducer(undefined, action)).toEqual(4);
  });
});
