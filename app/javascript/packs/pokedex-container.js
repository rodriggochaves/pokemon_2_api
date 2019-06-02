import { connect } from "react-redux";

import Pokedex from "packs/pokedex";
import { fetchPokemons, link } from "./actions";

const mapStateToProps = state => {
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
