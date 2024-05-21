const axios = require('axios');

// Variables for url and api key
// API for destinations
const geonamesBaseURL = 'http://api.geonames.org/searchJSON?'
// API for weather
const weatherbitBaseURL = 'https://api.weatherbit.io/v2.0/current?'
// API for get Images
const imageBaseURL = 'https://pixabay.com/api/?'

const getDestinationInfo = async (DestinationInput='', apiGeonamesKey='') => {
  const url = `${geonamesBaseURL}q=${DestinationInput}&maxRows=1&username=${apiGeonamesKey}`
  console.log('url', url);
  try {
    const response = await axios.get(url)
    const destinationData = response?.data?.geonames[0]
    return destinationData;
    } catch (error) {
    if (error.code === 'ECONNRESET') {
      console.log(error)
      console.log('Connection reset, retrying...');
    } else {
      throw error;
    }
  }
}

const getImageOfDestination = async (DestinationInput, imageKey ) => {
  const url = `${imageBaseURL}key=${imageKey}&q=${DestinationInput}&image_type=photo`
  console.log('url', url);
  try {
    const response = await axios.get(url)
    console.log('data', response?.data);
    const image = await response?.data?.hits[0] ? await data.hits[0].webformatURL : "https://source.unsplash.com/random/640x480?city,morning,night?sig=1"
    return image;
    } catch (error) {
    if (error.code === 'ECONNRESET') {
      console.log(error)
      console.log('Connection reset, retrying...');
    } else {
      throw error;
    }
  }
}

const getWeatherInfo = async (latitude = '', longitude = '' , weatherbitKey='') => {
  const url = `${weatherbitBaseURL}lat=${latitude}&lon=${longitude}&units=M&key=${weatherbitKey}`
  console.log('url', url);
  // const {data} = await axios.get(url)
  // const {weather , temp} = data.data[data.data.length -1];
  // const {description} = weather;
  // const weather_data = {description, temp}
  // console.log(weather_data);
  // return weather_data
  try {
    const response = await axios.get(url)
    console.log('data', response?.data);
    const image = response?.data?.data
    return image;
    } catch (error) {
    if (error.code === 'ECONNRESET') {
      console.log(error)
      console.log('Connection reset, retrying...');
    } else {
      throw error;
    }
  }
}


module.exports = {
  getDestinationInfo,
  getImageOfDestination,
  getWeatherInfo
}