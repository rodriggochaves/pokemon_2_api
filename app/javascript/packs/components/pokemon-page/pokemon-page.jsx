import React, { Component } from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"

import Loading from "../loading/loading";

export default class PokemonPage extends Component {
  componentDidMount() {
    this.props.fetchPokemon(this.props.pokemonId)
  }

  render() {
    const { pokemon } = this.props

    if (this.props.isLoading || !pokemon) {
      return <Loading />
    }

    return (
      <div className="ui container">
        <br />
        <h1>{pokemon.name}</h1>
        <p>{pokemon.kind}</p>
        <h2>Evolutions</h2>
        {pokemon.evolutions.map(evo => {
          return (
            <div key={`EVOLUTION_${evo.id}`}>
              <p>{evo.name}</p>
            </div>
          )
        })}
      </div>
    )
  }
}