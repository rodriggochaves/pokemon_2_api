import React, { Component } from "react";
import { Redirect } from "react-router";

export default class CreatePokemonPage extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      type1: null,
      type2: null,
      evolveFrom: null,
      redirect: false
    };
  }

  componentDidMount = () => {
    this.props.getKinds();
  };

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
    this.props
      .postPokemon({
        name,
        evolveFrom,
        kind
      })
      .then(() => {
        this.setState({ redirect: true });
      });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

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