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

  updateField = event => {
    const oldPokemon = this.state;
    const key = event.target.name;
    this.setState({
      ...oldPokemon,
      [key]: event.target.value
    });
  };

  submitForm = event => {
    event.preventDefault();
    this.props.postPokemon(this.state);
  };

  render() {
    return (
      <div className="ui container">
        <br />
        <h1>Create Pokemon</h1>

        <form className="ui form">
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
              <option value="">Type</option>
              <option value="grass">grass</option>
              <option value="poison">poison</option>
            </select>
          </div>

          <div className="field">
            <input
              type="submit"
              className="ui button fluid"
              onSubmit={this.submitForm}
            />
          </div>
        </form>
      </div>
    );
  }
}
