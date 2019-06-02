import { connect } from "react-redux";

import PokemonPage from "./pokemon-page";
import { destroyPokemon, link } from "../../actions";

const mapStateToProps = state => {
  return {
    isLoading: state.isLoading,
    pokemonId: state.selectedPokemon,
    pokemon: state.pokemons.find(pokemon => pokemon.id == state.selectedPokemon)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    link: page => dispatch(link(page)),
    destroyPokemon: pokemonId => dispatch(destroyPokemon(pokemonId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonPage);
