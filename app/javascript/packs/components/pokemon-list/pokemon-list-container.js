import { connect } from "react-redux";

import PokemonList from "packs/components/pokemon-list/pokemon-list";
import { selectAndLink, fetchAllPokemons } from "packs/actions";

const mapStateToProps = state => {
  return {
    pokemons: state.pokemons,
    query: state.filterPokemons
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectAndLink: (pokemonId, page) =>
      dispatch(selectAndLink(pokemonId, page)),
    fetchAllPokemons: () => dispatch(fetchAllPokemons())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonList);
