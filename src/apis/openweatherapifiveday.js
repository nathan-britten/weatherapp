import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/forecast?',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*'
  } 
})