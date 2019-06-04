import { connect } from "react-redux";

import Pokedex from "packs/pokedex";
import { fetchAllPokemons, link } from "./actions";

const mapStateToProps = state => {
  return {
    isLoading: state.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllPokemons: () => dispatch(fetchAllPokemons()),
    link: page => dispatch(link(page))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pokedex);
