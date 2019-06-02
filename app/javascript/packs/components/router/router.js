import React from "react";
import PropTypes from "prop-types";

import PokemonPageContainer from "packs/components/pokemon-page/pokemon-page-container";
import UpdatePageContainer from "packs/components/update-page/update-page-container";
import CreatePageContainer from "packs/components/create-page/create-page-container";
import PokedexContainer from "packs/pokedex-container";

const route = page => {
  switch (page) {
    case "pokemon-page":
      return PokemonPageContainer;

    case "update-page":
      return UpdatePageContainer;

    case "create-page":
      return CreatePageContainer;

    default:
      return PokedexContainer;
  }
};

const Router = props => {
  const Component = route(props.component);
  return <Component />;
};

Router.propTypes = {
  component: PropTypes.string
};

export default Router;
