import React, { Component } from "react";
import PropTypes from "prop-types";

import FormContainer from "../form/form-container";

export default class UpdatePage extends Component {
  render() {
    return (
      <div className="ui container">
        <br />
        <h1>Atualizar Pokemon</h1>

        <FormContainer
          pokemon={this.props.pokemon}
          submit={this.props.requestUpdatePokemon}
        />
      </div>
    );
  }
}

UpdatePage.propTypes = {
  // redux state
  pokemon: PropTypes.object,

  // own props
  pokemonId: PropTypes.number
};
