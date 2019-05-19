import React from 'react';

export default (props) => {
  return (
    <div className="ui form">
      <div className="field">
        <input type="text" onInput={event => props.onInput(event.target.value)}/>
      </div>
    </div>
  )
}
