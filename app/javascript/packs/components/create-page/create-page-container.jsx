import { connect } from "react-redux";

import CreatePage from "./create-page";
import { postPokemon } from "packs/actions";

const mapStateToProps = state => {
  return {
    kinds: state.kinds,
    pokemons: state.pokemons
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postPokemon: pokemon => dispatch(postPokemon(pokemon))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePage);
