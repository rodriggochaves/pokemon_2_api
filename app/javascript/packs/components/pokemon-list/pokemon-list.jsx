import React from 'react';

export default (props) => {
  return (
    <table className="ui celled table">
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {props.pokemonsList.map(pokemon => {
          return (
            <tr key={`POKEMON_LIST_${pokemon.id}`}>
              <td>{pokemon.name}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
