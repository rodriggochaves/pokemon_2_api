import React from 'react';

export default (props) => {
  return (
    <table className="ui celled table">
      <thead>
        <tr>
          <th></th>
          <th className="fourteen wide">Name</th>
          <th className="two wide">Type</th>
        </tr>
      </thead>
      <tbody>
        {props.pokemonsList.map(pokemon => {
          return (
            <tr key={`POKEMON_LIST_${pokemon.id}`}>
              <td className="ui center aligned"><img src={pokemon.image_url} /></td>
              <td>{pokemon.name}</td>
              <td className="ui center aligned">{pokemon.kind}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
