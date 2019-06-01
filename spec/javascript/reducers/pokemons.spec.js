import types from "packs/actions/types";
import reducer from "packs/reducers/pokemons";

describe("Reducers: Pokemons", () => {
  const pokemons = [{ id: 1, name: "bulbasaur" }, { id: 2, name: "ivysaur" }];

  it("returns the initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual([]);
  });

  it("returns a list of pokemons when LIST_POKEMONS", () => {
    const action = {
      type: types.LIST_POKEMONS,
      pokemons
    };

    expect(reducer(undefined, action)).toEqual(pokemons);
  });

  it("returns a incresead list when CREATE_POKEMON", () => {
    const pokemon = { name: "venosaur" };
    const action = {
      type: types.CREATE_POKEMON,
      pokemon
    };

    expect(reducer(pokemons, action)).toContain(pokemon);
  });

  it("SHOW_POKEMON", () => {
    const action = {
      type: types.SHOW_POKEMON,
      pokemonId: 1
    };

    expect(reducer(pokemons, action)).toEqual({ id: 1, name: "bulbasaur" });
  });

  it("DELETE_POKEMON", () => {
    const action = {
      type: types.DELETE_POKEMON,
      pokemonId: 1
    };

    expect(reducer(pokemons, action)).toEqual([{ id: 2, name: "ivysaur" }]);
  });
});
