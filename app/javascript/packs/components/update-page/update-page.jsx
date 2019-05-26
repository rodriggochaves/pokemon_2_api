import React, { Component } from "react";
import PropTypes from "prop-types";

import Form from "packs/components/form/form";

export default class UpdatePage extends Component {
  render() {
    return (
      <div>
        <h1>Atualizar Pokemon</h1>

        <Form />
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
