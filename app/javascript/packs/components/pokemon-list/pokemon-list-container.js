import { connect } from "react-redux";

import PokemonList from "packs/components/pokemon-list/pokemon-list";
import { selectAndLink } from "packs/actions";

const mapStateToProps = (state, ownProps) => {
  return {
    pokemons: state.pokemons,
    query: state.filterPokemons
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectAndLink: (pokemonId, page) => dispatch(selectAndLink(pokemonId, page))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonList);
