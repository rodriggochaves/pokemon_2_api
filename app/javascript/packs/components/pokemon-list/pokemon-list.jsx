import React, { Component } from "react";
import PropTypes from "prop-types";

import Loading from "packs/components/loading/loading";

export default class PokemonList extends Component {
  constructor() {
    super();
  }

  static propTypes = {
    fetchAllPokemons: PropTypes.func,
    query: PropTypes.string,
    pokemons: PropTypes.array,
    isLoading: PropTypes.bool,
    selectAndLink: PropTypes.func
  };

  componentDidMount() {
    this.props.fetchAllPokemons();
  }

  renderType = pokemon => {
    if (pokemon.kind2) {
      return <td>{`${pokemon.kind1}/${pokemon.kind2}`}</td>;
    } else {
      return <td>{pokemon.kind1}</td>;
    }
  };

  render() {
    if (this.props.isLoading) {
      return <Loading />;
    }

    const pokemons = this.props.pokemons.filter(pokemon => {
      if (this.props.query && this.props.query != "") {
        return pokemon.name.includes(this.props.query);
      } else {
        return pokemon;
      }
    });

    return (
      <table className="ui celled table">
        <thead>
          <tr>
            <th>Poke Index</th>
            <th />
            <th className="fourteen wide">Pokemon</th>
            <th className="two wide">Type</th>
          </tr>
        </thead>
        <tbody>
          {pokemons.map(pokemon => {
            return (
              <tr key={`POKEMON_LIST_${pokemon.id}`}>
                <td className="ui center aligned">{pokemon.poke_index}</td>
                <td className="ui center aligned">
                  <img src={pokemon.image_url} style={{ maxWidth: "100px" }} />
                </td>
                <td>
                  <button
                    href="#"
                    onClick={() =>
                      this.props.selectAndLink(pokemon.id, "pokemon-page")
                    }
                  >
                    {pokemon.name}
                  </button>
                </td>
                {this.renderType(pokemon)}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
