import React, { Component } from "react";

import FormContainer from "packs/components/form/form-container";

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

  componentDidMount = () => {};

  render() {
    return (
      <div className="ui container">
        <br />
        <h1>Create Pokemon</h1>

        <FormContainer submit={this.props.postPokemon} />
      </div>
    );
  }
}
