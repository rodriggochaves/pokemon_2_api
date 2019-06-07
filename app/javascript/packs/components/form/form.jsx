import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Form extends Component {
  constructor() {
    super();
    this.state = {
      pokemon: {
        poke_index: "",
        name: "",
        kind1: "",
        kind2: "",
        evolve_from_id: "",
        file: ""
      },
      redirect: null,
      error: ""
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

  buildParams = () => {
    const { pokemon } = this.state;
    const kind = this.translateKind(pokemon);
    const params = {
      name: pokemon.name,
      evolve_from_id: pokemon.evolve_from_id,
      image: pokemon.file,
      poke_index: pokemon.poke_index
    };
    if (this.props.pokemon) {
      return {
        ...params,
        id: pokemon.id,
        kind
      };
    } else {
      return {
        ...params,
        kind
      };
    }
  };

  // to update correct, we need to send the id
  submitForm = event => {
    event.preventDefault();
    const params = this.buildParams();
    this.props
      .submit(params)
      .then(() => {
        this.props.link("pokedex");
      })
      .catch(error => {
        this.setState({ error: error });
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

  handleFile = event => {
    const reader = new FileReader();
    const file = event.target.files[0];

    reader.onloadend = () => {
      const pokemon = this.state.pokemon;
      const state = { ...pokemon, file: file };
      this.setState({ pokemon: state });
    };

    reader.readAsDataURL(file);
  };

  renderError = () => {
    if (this.state.error !== "") {
      return this.state.error;
    }
  };

  render() {
    const pokemon = this.state.pokemon;

    return (
      <form
        className="ui form"
        onSubmit={this.submitForm}
        encType="multipart/form-data"
      >
        <p style={{ color: "red" }}>{this.renderError()}</p>
        <div className="field">
          <label htmlFor="poke_index">Poke index</label>
          <input
            name="poke_index"
            type="text"
            value={pokemon.poke_index}
            onChange={this.updateField}
          />
        </div>

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
            value={pokemon.evolve_from_id || ""}
          >
            <option value="">none</option>
            {this.props.pokemons.map(evolve => (
              <option key={`POKEMON_OPTION_${evolve.id}`} value={evolve.id}>
                {evolve.name}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="name">Image URL</label>
          <input type="file" name="image" onChange={this.handleFile} />
        </div>

        <div className="field">
          <input type="submit" className="ui button fluid" />
        </div>
      </form>
    );
  }
}

Form.propTypes = {
  // redux
  link: PropTypes.func,

  // own props
  pokemon: PropTypes.object,
  submit: PropTypes.func
};
