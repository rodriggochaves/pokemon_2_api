const pokemons = (state = [], action) => {
  switch (action.type) {
    case 'LIST_POKEMONS':
      return action.pokemons

    default:
      return state;
  }
}

export default pokemons
