import axios from 'axios';

export default axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?',
})


