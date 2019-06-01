import { connect } from "react-redux";

import PokemonList from "packs/components/pokemon-list/pokemon-list";
import { link } from "packs/actions";

const mapStateToProps = (state, ownProps) => {
  return {
    pokemons: state.pokemons,
    query: state.filterPokemons
  };
};

const mapDispatchToProps = dispatch => {
  return {
    link: page => dispatch(link(page))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonList);
