// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { Component } from "react";
import PropTypes from "prop-types";

import PokemonListContainer from "./components/pokemon-list/pokemon-list-container";
import PokemonFilterContainer from "./components/pokemon-filter/pokemon-filter-container";

class Pokedex extends Component {
  constructor() {
    super();
    this.state = {
      pokemons: [],
      isLoading: false
    };
  }

  static propTypes = {
    // redux
    isLoading: PropTypes.bool,
    link: PropTypes.func,
    fetchAllPokemons: PropTypes.func
  };

  componentDidMount() {}

  render() {
    return (
      <div className="ui container">
        <br />
        <h1>Pokedex</h1>
        <button
          className="ui button fluid"
          onClick={() => this.props.link("create-page")}
          aria-label="create-page"
        >
          Create new pokemon
        </button>
        <br />
        <PokemonFilterContainer />
        <PokemonListContainer />
      </div>
    );
  }
}

export default Pokedex;
