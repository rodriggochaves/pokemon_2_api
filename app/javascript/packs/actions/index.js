export const showLoading = () => (
  { type: 'SHOW_LOADING' }
)

export const hideLoading = () => (
  { type: 'HIDE_LOADING' }
)

export const listPokemons = (pokemons) => (
  {
    type: 'LIST_POKEMONS',
    pokemons
  }
)

export const fetchPokemons = () => {
  return (dispatch) => {
    dispatch(showLoading());

    return fetch("/api")
    .then(response => response.json())
    .then(response => {
      dispatch(listPokemons(response));
      dispatch(hideLoading());
    })
  }
}
