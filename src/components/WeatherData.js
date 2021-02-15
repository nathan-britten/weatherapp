import React, {useEffect, useState} from 'react';

import openweathermap from '../apis/openweatherapi';
import openweatherapifiveday from '../apis/openweatherapifiveday';

import SingleDay from './SingleDay';
import FiveDay from './FiveDay';
import MySearchBar from './MySearchBar';

const WeatherData = () => {

  const [searchTerm, setSearchTerm] = useState('London');
  const [debounceSearchTerm, setdebounceSearchTerm] = useState(searchTerm);

  const [city, setCity] = useState('London');

  let now = Math.round((new Date()).getTime() / 1000);
  const [day, setDay] = useState(now);

  const [lat, setLat] = useState('51.5074');
  const [lon, setLon] = useState('0.1278');

  const [weather, setWeather] = useState([]);
  const [fiveDayWeather, setFiveDayWeather] = useState([]);
  const [initialCurrentWeather , setInitialCurrentWeather] = useState({});

  const [units, setUnits] = useState('metric');
  let codeArray = {
    '01' : ['Sun.svg','linear-gradient(-52deg, rgba(190, 97, 35, 0.9), rgba(208, 74, 17, 0.3))'],
    '02' : ['Cloudy-Sun.svg','linear-gradient(-52deg, rgba(190, 97, 35, 0.9), rgba(208, 74, 17, 0.3))'],
    '03' : ['Cloud.svg','linear-gradient(-52deg, rgba(169, 255, 169, 0.9), rgba(169, 177, 169, 0.3))'],
    '04' : ['Cloudy 2.svg', 'linear-gradient(-52deg, rgba(207, 207, 207, 0.9), rgba(169, 177, 169, 0.3))'],
    '09' : ['Rain.svg','linear-gradient(-52deg, rgba(7, 168, 197, 0.9), rgba(7, 175, 134, 0.5))'],
    '10' : ['Rain 4.svg','linear-gradient(-52deg, rgba(7, 168, 197, 0.9), rgba(7, 175, 134, 0.3))'],
    '11' : ['Thunder cloudy.svg',],
    '13' : ['Snow.svg', 'linear-gradient(-52deg, rgba(169, 255, 169, 0.9), rgba(169, 177, 169, 0.3))'],
    '50' : ['Wave.svg', 'linear-gradient(-52deg, rgba(7, 168, 197, 0.9), rgba(7, 175, 134, 0.3))']
  }
  
  const fetchWeather = async (lon, lat, exclude, units) => {
    const response = await openweathermap.get('/', {params: {
      lat: lat,
      lon: lon,
      exclude: exclude,
      units: units,
      appid: 'e62dd17a4c10cec02ebada80e6844218',
    }}).then((response) => {
      let oneday = [];
      response.data.hourly.map((hour, index) => {
        if(index > 23) {
          return;
        }
       return oneday.push(hour)
      })

      let sevenday = response.data.daily;
      sevenday.splice(0,1);

      setWeather(prevState => ({
        ...prevState,
        sevenDayWeather: sevenday,
        // currentWeather: response.data.current
      }))
    
      loadCurrentWeather(response.data.current)
      getCurrentDay(day)
      
      setInitialCurrentWeather(response.data.current)

    })
  };

  const fetchFiveDayWeather = async (city, units) => {

    const response = await openweatherapifiveday.get('/', {params: {
      q: city,
      units: units,
      appid: 'e62dd17a4c10cec02ebada80e6844218',
    }}).catch((error) => {
      setWeather(prevState => ({
        ...prevState,
        fiveDay : {...prevState['fiveDay'], 'data': 'error' }
      }))
    })
    if(!weather) {
      return;
    }
    if(response) {
      setWeather(prevState => ({
        ...prevState,
        fiveDay : {...prevState['fiveDay'], 'data': response.data.list }
      }))
    }
  };

  //for the debounce
  useEffect(() => {
    const timerId = setTimeout(() => {
      setdebounceSearchTerm(searchTerm)
    }, 1000);
    return () => {
      clearTimeout(timerId);
    }
  }, [searchTerm])

  //for fetch the city autocomplete
  useEffect(() => {
    if(debounceSearchTerm) {
      // getListOfCities()
    }
  },[debounceSearchTerm] )

  //for the city lat & long
  useEffect(() => {
    
  }, [city])

  //for the weather 
  useEffect(() => {
    fetchWeather(lon, lat, 'minutely,alerts', units)
    fetchFiveDayWeather(city, units)
    getCurrentDay(day)
  }, [lon, units])


  useEffect(() => {
    loadCurrentWeather();
  }, [day, weather.sevenDayWeather, city])

  const loadCurrentWeather = (firstDayData) => {
    //if not load initialCurrentWeather
    let dayChange = unixTimeConverter(day);
    if(!weather.sevenDayWeather) {
      return ''
    }
    console.log(weather.sevenDayWeather)
    weather.sevenDayWeather.forEach(item => {
      if(unixTimeConverter(item.dt) === dayChange) {
        setBackground(item);
        setWeather(prevState => ({
          ...prevState,
          currentWeather : {...prevState['currentWeather'], ...item }
        }))
      }
      else if(unixTimeConverter(initialCurrentWeather.dt) === dayChange) {
      

        let theData = firstDayData;
        if(!firstDayData) {
          theData = initialCurrentWeather
        }
        setBackground(theData);
        setWeather(prevState => ({
          ...prevState,
          currentWeather : {...prevState['currentWeather'], ...theData }
        }))
      }
    })
  }

  const setCitySearch = (data) => {
    setSearchTerm(data)
  }

  const handleCityChange = (data) => {    
    setCity(data);
  }
  const getCurrentDay = (data) => {
    setDay(data);
  }

  const setTheUnits = (units) => {
    setUnits(units)
  }

  const toUpperCase = (phrase) => {

    let arrayOfWords = phrase.split(' ');

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

  const setBackground = (item) => {
    let bg = codeArray[item.weather[0].icon.substr(0,2)][1];
    let bgnew = bg + ', url("/assets/bg2.png") ';
    let backgroundContainer = document.querySelector('.maincontainer');
    if(backgroundContainer) {
      backgroundContainer.style.background = `${bgnew}`;
      backgroundContainer.style.backgroundSize = "cover";
    }
  }

  const unixTimeConverter = (time, minutes = false, sunrise = false, long = false) => {
    const milliseconds = time * 1000 // 1575909015000

    const dateObject = new Date(milliseconds)
    var options = {
      weekday: 'short',
      day: "2-digit",
      month: "2-digit",
      year: "2-digit"
    };
    if(minutes === true) {
      options = {
        hour: "2-digit",
        minute: "2-digit",
      }
    };
    if(sunrise === true) {
      options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      };
    };

    if(long === true) {
      options = {
        weekday: 'long',
        day: "2-digit",
        month: "long",
      }
    };



    const humanDateFormat = dateObject.toLocaleString('en-GB', options) //2019-12-9 10:30:15
    return humanDateFormat;
  }

  return (
    <React.Fragment>
      {/* <SearchBar loading={loading} value={searchTerm} onChange={setCitySearch} results={searchResults} deleteResults={deleteResults} setCity={handleCityChange}/> */}
      <MySearchBar onChange={setCitySearch} setCity={handleCityChange} setLat={setLat} setLon={setLon} setUnits={setTheUnits} units={units}/>
      <SingleDay data={weather.currentWeather} toUpperCase={toUpperCase} unixTimeConverter={unixTimeConverter} codeArray={codeArray} city={city}/>
      <FiveDay data={weather.fiveDay} toUpperCase={toUpperCase}  sevenDayData={weather.sevenDayWeather} getCurrentDay={getCurrentDay} unixTimeConverter={unixTimeConverter} codeArray={codeArray} />
    </React.Fragment>
  )
}

export default WeatherData;