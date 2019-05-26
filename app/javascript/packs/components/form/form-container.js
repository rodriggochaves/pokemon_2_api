import { connect } from "react-redux";

import Form from "./form";
import { postPokemon, getKinds } from "packs/actions";

const mapStateToProps = (state, ownProps) => {
  return {
    kinds: state.kinds,
    pokemons: state.pokemons
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getKinds: () => dispatch(getKinds())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
