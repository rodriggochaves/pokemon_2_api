// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import PokemonListContainer from './components/pokemon-list/pokemon-list-container';

class Pokedex extends Component {
  constructor() {
    super();
    this.state = {
      pokemons: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.props.fetchPokemons();
  }

  render() {
    if (this.props.isLoading) {
      return (
       <div className="loading">
         <div className="ui active dimmer">
           <div className="ui loader"></div>
         </div>
       </div>
      )
    } else {
      return (
        <div className="ui container">
          <br />
          <h1>Pokedex</h1>
          <PokemonListContainer />
        </div>
      )
    }
  }
}

export default Pokedex;
