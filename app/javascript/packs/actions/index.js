import types from "packs/actions/types";

export const link = page => ({ type: types.ROUTE, page: page });

export const selectAndLink = (pokemonId, page) => {
  return dispatch => {
    dispatch(selectedPokemon(pokemonId));
    dispatch(link(page));
  };
};

export const showLoading = () => ({ type: types.SHOW_LOADING });

export const hideLoading = () => ({ type: types.HIDE_LOADING });

export const listPokemons = pokemons => ({
  type: types.LIST_POKEMONS,
  pokemons
});

export const filterPokemons = query => ({
  type: types.FILTER_POKEMONS,
  query
});

export const showPokemon = pokemonId => ({
  type: types.SHOW_POKEMON,
  pokemonId
});

export const selectedPokemon = pokemonId => ({
  type: types.SELECT_POKEMON,
  selectedPokemon: pokemonId
});

export const createPokemon = pokemon => ({
  type: types.CREATE_POKEMON,
  pokemon
});

export const listKinds = kinds => ({
  type: "LIST_KINDS",
  kinds
});

export const deletePokemon = pokemonId => ({
  type: types.DELETE_POKEMON,
  pokemonId
});

export const updatePokemon = pokemon => ({
  type: "UPDATE_POKEMON",
  pokemon
});

export const requestUpdatePokemon = pokemon => dispatch => {
  dispatch(showLoading());

  const formData = new FormData();

  Object.keys(pokemon).map(key => {
    formData.append(key, pokemon[key]);
  });

  return fetch(`/api/pokemons/${pokemon.id}`, {
    body: formData,
    method: "PATCH"
  })
    .then(response => response.json())
    .then(refresh => {
      dispatch(updatePokemon(refresh));
      dispatch(hideLoading());
    });
};

export const destroyPokemon = pokemonId => dispatch => {
  dispatch(showLoading());

  return fetch(`/api/pokemons/${pokemonId}`, {
    method: "DELETE"
  }).then(() => {
    dispatch(deletePokemon(pokemonId));
    dispatch(hideLoading());
  });
};

export const getKinds = () => dispatch => {
  dispatch(showLoading());

  return fetch("/api/kinds")
    .then(response => response.json())
    .then(response => {
      dispatch(listKinds(response));
      dispatch(hideLoading());
    });
};

export const postPokemon = pokemon => dispatch => {
  dispatch(showLoading());

  const formData = new FormData();

  Object.keys(pokemon).map(key => {
    formData.append(key, pokemon[key]);
  });

  return fetch("/api/pokemons", {
    body: formData,
    method: "POST"
  })
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw "Pokemon invalid";
      }
    })
    .then(response => {
      dispatch(createPokemon(response));
      dispatch(hideLoading());
    });
};

export const fetchPokemon = pokemonId => {
  return dispatch => {
    dispatch(showLoading());

    setTimeout(() => {
      return fetch(`/api/pokemons/${pokemonId}`)
        .then(response => response.json())
        .then(response => {
          dispatch(showPokemon(response));
          dispatch(hideLoading());
        });
    }, 1000);
  };
};

export const fetchAllPokemons = () => {
  return dispatch => {
    dispatch(showLoading());

    setTimeout(() => {
      return fetch("/api")
        .then(response => response.json())
        .then(response => {
          dispatch(listPokemons(response));
          dispatch(hideLoading());
        });
    }, 2000);
  };
};
