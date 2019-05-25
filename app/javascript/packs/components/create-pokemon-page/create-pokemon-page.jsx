import React, { Component } from "react";

export default class CreatePokemonPage extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      type1: null,
      type2: null,
      evolveFrom: null
    };
  }

  // componentDidMount = () => {

  // }

  updateField = event => {
    const oldPokemon = this.state;
    const key = event.target.name;
    this.setState({
      ...oldPokemon,
      [key]: event.target.value
    });
  };

  translateKind = attrs => {
    if (attrs.type2) {
      return `${attrs.type1}/${attrs.type2}`;
    } else {
      return attrs.type1;
    }
  };

  submitForm = event => {
    event.preventDefault();
    const kind = this.translateKind(this.state);
    const { name, evolveFrom } = this.state;
    this.props.postPokemon({
      name,
      evolveFrom,
      kind
    });
  };

  render() {
    return (
      <div className="ui container">
        <br />
        <h1>Create Pokemon</h1>

        <form className="ui form" onSubmit={this.submitForm}>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input
              name="name"
              type="text"
              value={this.state.name}
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
                  <option value="grass">grass</option>
                  <option value="poison">poison</option>
                </select>
              </div>
              <div className="eight wide field">
                <select
                  name="type2"
                  className="ui fluid dropdown"
                  onChange={this.updateField}
                >
                  <option value="">Type</option>
                  <option value="grass">grass</option>
                  <option value="poison">poison</option>
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <label htmlFor="name">Evolve from</label>
            <select
              name="evolve_from"
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
      </div>
    );
  }
}
