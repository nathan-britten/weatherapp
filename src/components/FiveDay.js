import React, { useState, useEffect } from 'react';

import MySlider from './MySlider';

const FiveDay = (props) => {
  //wpn't need to change it so to pull from .list when using the API.

  let now = Math.round((new Date()).getTime() / 1000);
  const [daysData, setDaysData] = useState({})
  const [selectedDay, setSelectedDay] = useState(now)


  useEffect(() => {
    const temp = {};
    
    if(!props.data) {
      return;
    }
    props.data.data.forEach((item, index) => {

      let convertedDate = props.unixTimeConverter(item.dt);
      temp[convertedDate] = { [index] : item.main}

      setDaysData(prevState => ({
        ...prevState,
        [convertedDate] : {...prevState[convertedDate], [index] : item }
      }))
    })
  }, [props, selectedDay])

  const getDaysSliderInfo = () => {
    let dataArray = []
    Object.values(daysData).forEach((element, index) => {
      let data = [element[Object.keys(element)[0]].dt, Object.keys(daysData)[index]]
      dataArray.push(data)
    })
    return dataArray;
  }
 
  const getHoursSliderInfo = () => {
    //TO DO: If it is past 9PM it shoudl skip onto 5 day data for the next day
    let day = props.unixTimeConverter(selectedDay);
    return daysData[day];
  }

  const setDay = (data) => {
    setSelectedDay(data)
    props.getCurrentDay(data)
  }
  
  return(
    <React.Fragment>
    <div className="days-slider">
      <MySlider data={getDaysSliderInfo()} timeConverter={props.unixTimeConverter} type='days' setDay={setDay} currentDay={selectedDay}/>
    </div>
    <div className="hours-weather-slider">
      <MySlider data={getHoursSliderInfo()} type='hours' timeConverter={props.unixTimeConverter} toUpperCase={props.toUpperCase} codeArray={props.codeArray}/>
    </div>
    </React.Fragment>
  )
}

export default FiveDay;