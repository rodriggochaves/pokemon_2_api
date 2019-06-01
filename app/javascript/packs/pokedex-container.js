import { connect } from "react-redux";

import Pokedex from "./pokedex";
import { fetchPokemons, link } from "./actions";

const mapStateToProps = (state, ownProps) => {
  return {
    isLoading: state.isLoading,
    pokemonsList: state.pokemons
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPokemons: () => dispatch(fetchPokemons()),
    link: page => dispatch(link(page))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pokedex);
