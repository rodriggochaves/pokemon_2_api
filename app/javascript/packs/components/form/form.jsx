import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

export default class Form extends Component {
  constructor() {
    super();
    this.state = {
      pokemon: {
        name: "",
        kind1: "",
        kind2: ""
      },
      redirect: null
    };
  }

  componentDidMount = () => {
    this.props.getKinds();
    if (this.props.pokemon) {
      this.setState({ pokemon: this.props.pokemon });
    }
  };

  translateKind = attrs => {
    if (attrs.kind2) {
      return `${attrs.kind1}/${attrs.kind2}`;
    } else {
      return attrs.kind1;
    }
  };

  submitForm = event => {
    event.preventDefault();
    const { pokemon } = this.state;
    const kind = this.translateKind(pokemon);
    const params = {
      name: pokemon.name,
      evolve_from_id: pokemon.evolve_from_id
    };
    this.props
      .submit({
        ...params,
        kind
      })
      .then(() => {
        this.setState({ redirect: "/" });
      });
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
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

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
                name="kind1"
                className="ui fluid dropdown"
                onChange={this.updateField}
                value={pokemon.kind1}
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
                name="kind2"
                className="ui fluid dropdown"
                onChange={this.updateField}
                value={pokemon.kind2}
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
            value={pokemon.evolve_from_id}
          >
            <option value="">none</option>
            {this.props.pokemons.map(evolve => (
              <option key={`POKEMON_OPTION_${evolve.id}`} value={evolve.id}>
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
  pokemon: PropTypes.object,
  submit: PropTypes.func
};
