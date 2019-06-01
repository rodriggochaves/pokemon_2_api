import { connect } from "react-redux";

import PokemonPage from "./pokemon-page";
import { fetchPokemon, destroyPokemon } from "../../actions";

const mapStateToProps = (state, ownProps) => {
  return {
    isLoading: state.isLoading,
    pokemon: state.pokemon,
    pokemonId: state.selectedPokemon
  };
};

const mapDispatchToProps = dispatch => {
  return {
    destroyPokemon: pokemonId => dispatch(destroyPokemon(pokemonId)),
    fetchPokemon: pokemonId => dispatch(fetchPokemon(pokemonId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonPage);
