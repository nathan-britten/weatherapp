import React from 'react';

const TempSymbol = ({temp}) => {
  return (
    <div className="temp-holder">
      <div className="temp">{temp}</div>
      <div className="temp-symbol">&#176;</div>
    </div>
  )
}

export default TempSymbol;