import { connect } from "react-redux";

import CreatePokemonPage from "./create-pokemon-page";
import { postPokemon } from "packs/actions";

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    postPokemon: pokemon => dispatch(postPokemon(pokemon))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePokemonPage);
