import { connect } from "react-redux";

import Form from "packs/components/form/form";
import { getKinds, link } from "packs/actions";

const mapStateToProps = state => {
  return {
    kinds: state.kinds,
    pokemons: state.pokemons
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getKinds: () => dispatch(getKinds()),
    link: page => dispatch(link(page))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
