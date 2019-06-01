import { connect } from "react-redux";

import PokemonFilter from "./pokemon-filter";
import { filterPokemons } from "../../actions";

const mapStateToProps = state => {
  return {
    query: state.query
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInput: query => dispatch(filterPokemons(query))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonFilter);
