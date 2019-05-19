import { connect } from 'react-redux'

import PokemonList from './pokemon-list';

const mapStateToProps = (state, ownProps) => {
  return {
    pokemons: state.pokemons,
    query: state.filterPokemons,
  }
}

const mapDispatchToProps = () => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonList)
