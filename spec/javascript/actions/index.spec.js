import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "packs/actions";
import fetchMock from "fetch-mock";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Actions", () => {
  it("can create a pokemon", () => {
    const pokemonToCreate = {
      name: "bulbasaur",
      kind: "grass/poison",
      evolve_from: null
    };

    fetchMock.post("/api/pokemons", {
      pokemon: pokemonToCreate
    });

    const expectedActions = [
      { type: "SHOW_LOADING" },
      { type: "CREATE_POKEMON", pokemon: pokemonToCreate },
      { type: "HIDE_LOADING" }
    ];

    const store = mockStore({ pokemon: undefined });

    return store.dispatch(actions.postPokemon(pokemonToCreate)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("can list kinds", () => {
    const kinds = [{ description: "grass" }, { description: "poison" }];
    fetchMock.get("/api/kinds", kinds);

    const expectedActions = [
      { type: "SHOW_LOADING" },
      { type: "LIST_KINDS", kinds },
      { type: "HIDE_LOADING" }
    ];

    const store = mockStore({ kinds: [] });

    return store.dispatch(actions.getKinds()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("can destroy a pokemon", () => {
    fetchMock.delete("/api/pokemons/1", {});

    const expectedActions = [
      { type: "SHOW_LOADING" },
      { type: "DELETE_POKEMON", pokemonId: 1 },
      { type: "HIDE_LOADING" }
    ];

    const store = mockStore({ kinds: [] });

    return store.dispatch(actions.destroyPokemon(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
