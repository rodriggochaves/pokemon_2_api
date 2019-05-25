import { connect } from "react-redux";

import CreatePokemonPage from "./create-pokemon-page";
import { postPokemon, getKinds } from "packs/actions";

const mapStateToProps = (state, ownProps) => {
  return {
    kinds: state.kinds,
    pokemons: state.pokemons
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getKinds: () => dispatch(getKinds()),
    postPokemon: pokemon => dispatch(postPokemon(pokemon))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePokemonPage);
