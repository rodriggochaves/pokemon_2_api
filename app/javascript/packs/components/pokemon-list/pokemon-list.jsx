import React from "react";

export default props => {
  let pokemons;

  if (props.query && props.query != "") {
    pokemons = props.pokemons.filter(pokemon =>
      pokemon.name.includes(props.query)
    );
  } else {
    pokemons = props.pokemons;
  }

  return (
    <table className="ui celled table">
      <thead>
        <tr>
          <th />
          <th className="fourteen wide">Name</th>
          <th className="two wide">Type</th>
        </tr>
      </thead>
      <tbody>
        {pokemons.map(pokemon => {
          return (
            <tr key={`POKEMON_LIST_${pokemon.id}`}>
              <td className="ui center aligned">
                <img src={pokemon.image_url} style={{maxWidth: "100px"}}/>
              </td>
              <td>
                <a
                  onClick={() =>
                    props.selectAndLink(pokemon.id, "pokemon-page")
                  }
                >
                  {pokemon.name}
                </a>
              </td>
              <td className="ui center aligned">{`${pokemon.kind1}/${
                pokemon.kind2
              }`}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
