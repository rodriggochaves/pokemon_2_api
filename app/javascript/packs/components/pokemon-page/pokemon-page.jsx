import React, { Component } from "react";
import PropTypes from "prop-types";

import Loading from "../loading/loading";
import UpdatePageContainer from "packs/components/update-page/update-page-container";

export default class PokemonPage extends Component {
  constructor() {
    super();
    this.state = {
      redirect: null,
      pokemon: null
    };
  }

  handleDestroyClick = () => {
    this.props
      .destroyPokemon(this.props.pokemon.id)
      .then(() => this.props.link("pokedex"));
  };

  render() {
    const { pokemon } = this.props;

    if (this.props.isLoading || !pokemon) {
      return <Loading />;
    }

    return (
      <div className="ui container">
        <br />
        <h1>{pokemon.name}</h1>
        <p>
          {pokemon.kind1}/{pokemon.kind2}
        </p>
        <h2>Evolutions</h2>
        {pokemon.evolutions.map(evo => {
          return (
            <div key={`EVOLUTION_${evo.id}`}>
              <p>{evo.name}</p>
            </div>
          );
        })}

        <a
          className="ui button fluid"
          onClick={() => this.props.link("update-page")}
          aria-label="update"
        >
          update this pokemon
        </a>

        <button aria-label="destroy" onClick={this.handleDestroyClick}>
          Destroy this pokemon
        </button>
      </div>
    );
  }
}
