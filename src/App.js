import React from 'react';
import WeatherData from './components/WeatherData';
import { Container } from 'semantic-ui-react'

const App = () => {

  return(
    <div className="ui grid container centered">
      <div className="sixteen wide mobile six wide computer column">
        <div className="maincontainer ">
        <WeatherData />
        </div>
      </div>
    </div>

  )
}

export default App;