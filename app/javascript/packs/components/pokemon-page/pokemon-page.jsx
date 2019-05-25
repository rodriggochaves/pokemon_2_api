import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { Redirect } from "react-router";

import Loading from "../loading/loading";

export default class PokemonPage extends Component {
  constructor() {
    super();
    this.state = {
      redirect: null
    };
  }

  componentDidMount = () => {
    this.props.fetchPokemon(this.props.pokemonId);
  };

  handleDestroyClick = () => {
    this.props.destroyPokemon().then(() => this.setState({ redirect: "/" }));
  };

  render() {
    const { pokemon } = this.props;

    if (this.props.isLoading || !pokemon) {
      return <Loading />;
    }

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
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
          );
        })}

        <button aria-label="destroy" onClick={this.handleDestroyClick}>
          Destroy this pokemon
        </button>
      </div>
    );
  }
}
