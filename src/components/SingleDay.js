import React, {useEffect, useState, useRef} from 'react';
import {TransitionGroup, CSSTransition} from 'react-transition-group'; // ES6

import TempSymbol from './TempSymbol';

const SingleDay = ({data, unixTimeConverter, codeArray}) => {

  const [weather, setWeather] = useState(data);
  useEffect(() => {
    setWeather(data)

  }, [data])
  
  const toUpperCase = (phrase) => {

    let arrayOfWords = phrase.split(' ');
    let combine;
    let finalArray = [];
    
    for(let i = 0; i < arrayOfWords.length; i++) {
      let wordsToStringArray = arrayOfWords[i].split('');
      let capital =  wordsToStringArray[0].toUpperCase();
      wordsToStringArray = wordsToStringArray.slice(1)
      
      wordsToStringArray = wordsToStringArray.join('')
      let combine = capital + wordsToStringArray
      finalArray.push(combine);
    }

    return finalArray.join(' ');
  }

  const renderFirstElements = (weather, style, temp) => {
    return ( 
      <div className="first-segment">
          <div className="weather-icon" style={style}></div>
          <h3 className='weather-description'>{toUpperCase(weather.weather[0].description)}</h3>
          {temp}
          <h2 className='date'>{unixTimeConverter(weather.dt, false, false, true)}</h2>
      </div>

      
    )
  }
  const renderSimilarElements = (weather) => {
    return(
      <div className="ui grid">
      <div className="info-icons four column row">
        <div className="column wind-speed" data-tooltip="Wind Speed">
          <div className="wrapper">
            <img src="/assets/SVG/Wind 2.svg" alt=""/>
            <div className="wind-speed-data">
              {weather.wind_speed} 
            </div>
          </div>
        </div>
        <div className="column humidity" data-tooltip="Chance of Rain">
          <div className="wrapper">
          <img src="/assets/SVG/Humidity.svg" alt=""/>
          <div className="wind-speed-data">
            {weather.pop * 100} %
          </div>
          </div>
        </div>
        <div className="column sunrise" data-tooltip="Sunrise">
          <div className="wrapper">
            <img src="/assets/SVG/Sunrise2.svg" alt=""/>
            <div className="sunrise-data">
              {unixTimeConverter(weather.sunrise, false, true)}
            </div>
          </div>

        </div>
        <div className="column sunset" data-tooltip="Sunset">
          <div className="wrapper">
            <img src="/assets/SVG/Sunset2.svg" alt=""/>
            <div className="sunset-data">
              {unixTimeConverter(weather.sunset, false, true)}
            </div>
          </div>

        </div>
      
      </div>
    </div>
    )
  }
  const renderMinmax = () => {

    if(!weather.temp.min) {
      return;
    }
    console.log(weather)
    return (
      <React.Fragment>
          <div className="three column row minmax-holder">
            <div className="column UVI" data-tooltip="Ultra Violet Index">
                <div className="wrapper">
                  <img src="/assets/SVG/Sun.svg" alt=""/>
                  <div className="temp-min-data">
                    {weather.uvi}
                  </div>
                </div>
            </div>
            <div className="column min-temp" data-tooltip="Minimum">
              <div className="wrapper">
                <img src="/assets/SVG/Temperature down.svg" alt=""/>
                <div className="temp-min-data">
                  {weather.temp.min}&#176;
                </div>
              </div>
            </div>
            <div className="column max-temp" data-tooltip="Maximum">
              <div className="wrapper">
                <img src="/assets/SVG/Temperature up.svg" alt=""/>
                <div className="temp-max-data">
                  {weather.temp.max}&#176;
                </div>
              </div>
            </div>
          </div>
      </React.Fragment>
    )
  }
  const whatToRender = () => {
    if(!weather) {
      return '';
    }
    let weatherCode = weather.weather[0].icon.substring(0,2);


    const style = {
      'backgroundImage': `url('/assets/SVG/${codeArray[weatherCode][0]}')`,
      'backgroundSize' : 'contain',
      'width' : '100%',
      'height' : '150px',
      'backgroundRepeat': 'no-repeat',
      'backgroundPosition' : 'center'
    }
    if(!weather.temp.day) {
      let temp = parseInt(weather.temp);
      return (
        <React.Fragment >
          {renderFirstElements(weather, style, <TempSymbol temp={temp} />)}
          
          {renderSimilarElements(weather)}
        </React.Fragment>
      )
    } else {
      let temp = parseInt(weather.temp.day);

      return(
        <React.Fragment>
          {renderFirstElements(weather, style, <TempSymbol temp={temp} />) }
          {renderMinmax(weather)}


          <CSSTransition
          key={weather.dt}
          timeout={{ enter: 200, exit: 300 }}
          >
          {renderSimilarElements(weather)}
          </CSSTransition>

        </React.Fragment>
      )
    }
  }

  return (
    <div className="ui grid centered single-day">

      {whatToRender()}




    </div>
  )
}

export default SingleDay;