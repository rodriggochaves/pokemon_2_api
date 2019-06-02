// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import PokemonListContainer from "./components/pokemon-list/pokemon-list-container";
import PokemonFilterContainer from "./components/pokemon-filter/pokemon-filter-container";
import Loading from "./components/loading/loading";
import CreatePageContainer from "./components/create-page/create-page-container";

class Pokedex extends Component {
  constructor() {
    super();
    this.state = {
      pokemons: [],
      isLoading: false
    };
  }

  componentDidMount() {
    this.props.fetchPokemons();
  }

  render() {
    if (this.props.isLoading) {
      return <Loading />;
    } else {
      return (
        <div className="ui container">
          <br />
          <h1>Pokedex</h1>
          <button
            className="ui button fluid"
            onClick={() => this.props.link(CreatePageContainer)}
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
}

export default Pokedex;
