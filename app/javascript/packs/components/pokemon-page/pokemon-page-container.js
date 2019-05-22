import { connect } from 'react-redux'

import PokemonPage from './pokemon-page';
import { fetchPokemon } from '../../actions' 

const mapStateToProps = (state, ownProps) => {
  return {
    isLoading: state.isLoading,
    pokemon: state.pokemon,
    pokemonId: ownProps.location.query.pokemonId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPokemon: pokemonId => dispatch(fetchPokemon(pokemonId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonPage)
