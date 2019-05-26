import { connect } from "react-redux";

import UpdatePage from "./update-page";

const mapStateToProps = (state, ownProps) => {
  return {
    kinds: state.kinds,
    pokemons: state.pokemons,
    pokemon: state.pokemons.filter(pokemon => pokemon. === ownProps.pokemonId),
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePokemonPage);
