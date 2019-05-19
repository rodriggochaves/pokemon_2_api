import { connect } from 'react-redux'

import Pokedex from './pokedex';
import { fetchPokemons } from './actions'

const mapStateToProps = (state, ownProps) => {
  return {
    isLoading: state.isLoading,
    pokemonsList: state.pokemons,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPokemons: () => dispatch(fetchPokemons())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pokedex)
