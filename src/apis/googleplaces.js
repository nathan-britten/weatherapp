import axios from 'axios';

export default axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*'
  } 
})


