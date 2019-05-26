import React, { Component } from "react";
import { Redirect } from "react-router";

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

  componentDidMount = () => {
    this.props.getKinds();
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
    const params = {
      name: this.state.name,
      evolve_from_id: this.state.evolve_from_id
    };
    this.props
      .postPokemon({
        ...params,
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

        <FormContainer />
      </div>
    );
  }
}
