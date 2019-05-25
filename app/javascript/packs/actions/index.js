export const showLoading = () => ({ type: "SHOW_LOADING" });

export const hideLoading = () => ({ type: "HIDE_LOADING" });

export const listPokemons = pokemons => ({
  type: "LIST_POKEMONS",
  pokemons
});

export const filterPokemons = query => ({
  type: "FILTER_POKEMONS",
  query
});

export const showPokemon = pokemon => ({
  type: "SHOW_POKEMON",
  pokemon
});

export const createPokemon = pokemon => ({
  type: "CREATE_POKEMON",
  pokemon
});

export const listKinds = kinds => ({
  type: "LIST_KINDS",
  kinds
});

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

  return fetch("/api/pokemons", {
    body: JSON.stringify(pokemon),
    method: "POST",
    headers: { "content-type": "application/json" }
  })
    .then(response => response.json())
    .then(response => {
      dispatch(createPokemon(response.pokemon));
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

// TODO: rename to fetchAllPokemons
export const fetchPokemons = () => {
  return dispatch => {
    dispatch(showLoading());

    return fetch("/api")
      .then(response => response.json())
      .then(response => {
        dispatch(listPokemons(response));
        dispatch(hideLoading());
      });
  };
};
