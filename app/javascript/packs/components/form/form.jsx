import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Form extends Component {
  constructor() {
    super();
    this.state = {
      pokemon: {
        name: ""
      },
      redirect: null
    };
  }

  componentDidMount = () => {
    // this.state.pokemon = this.props.pokemon || {};
  };

  updateField = event => {
    const oldPokemon = this.state.pokemon;
    const key = event.target.name;
    this.setState({
      pokemon: {
        ...oldPokemon,
        [key]: event.target.value
      }
    });
  };

  render() {
    const pokemon = this.state.pokemon;

    return (
      <form className="ui form" onSubmit={this.submitForm}>
        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            name="name"
            type="text"
            value={pokemon.name}
            onChange={this.updateField}
          />
        </div>

        <div className="field">
          <label htmlFor="name">Type</label>
          <div className="fields">
            <div className="eight wide field">
              <select
                name="type1"
                className="ui fluid dropdown"
                onChange={this.updateField}
              >
                <option value="">Type</option>
                {this.props.kinds.map(kind => (
                  <option
                    key={`KIND_SELECT_${kind.id}`}
                    value={kind.description}
                  >
                    {kind.description}
                  </option>
                ))}
              </select>
            </div>
            <div className="eight wide field">
              <select
                name="type2"
                className="ui fluid dropdown"
                onChange={this.updateField}
              >
                <option value="">Type</option>
                {this.props.kinds.map(kind => (
                  <option
                    key={`KIND_SELECT_${kind.id}`}
                    value={kind.description}
                  >
                    {kind.description}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <label htmlFor="name">Evolve from</label>
          <select
            name="evolve_from_id"
            className="ui fluid dropdown"
            onChange={this.updateField}
          >
            <option value="">none</option>
            {this.props.pokemons.map(pokemon => (
              <option key={`POKEMON_OPTION_${pokemon.id}`} value={pokemon.id}>
                {pokemon.name}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <input type="submit" className="ui button fluid" />
        </div>
      </form>
    );
  }
}

Form.propTypes = {
  // own props
  pokemon: PropTypes.object
};
