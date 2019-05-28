import reducer from "packs/reducers/selected-pokemon";

describe("Reducers: selectedPokemon", () => {
  it("returns the initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual(null);
  });

  it("returns the pokemonId", () => {
    const action = { type: "SHOW_POKEMON", selectedPokemonId: 4 };
    expect(reducer(undefined, action)).toEqual(4);
  });
});
