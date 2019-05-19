import { connect } from 'react-redux'

import PokemonList from './pokemon-list';

const mapStateToProps = (state, ownProps) => {
  return {
    pokemonsList: state.pokemons,
  }
}

const mapDispatchToProps = () => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonList)
