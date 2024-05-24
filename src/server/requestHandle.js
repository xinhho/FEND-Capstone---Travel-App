const axios = require('axios');

// Variables for url and api key
// API for destinations
const geonamesBaseURL = 'http://api.geonames.org/searchJSON?'
// API for weather
const weatherbitBaseURL = 'https://api.weatherbit.io/v2.0/forecast/daily?'
// API for get Images
const imageBaseURL = 'https://pixabay.com/api/?'

const getDestinationInfo = async (destinationInput='', apiGeonamesKey='') => {
  const url = `${geonamesBaseURL}q=${destinationInput}&maxRows=1&username=${apiGeonamesKey}`
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

const getWeatherInfo = async (latitude = '', longitude = '' , weatherbitKey='') => {
  const url = `${weatherbitBaseURL}lat=${latitude}&lon=${longitude}&units=M&key=${weatherbitKey}`
  console.log('url', url);
  try {
    const response = await axios.get(url)
    const length = response?.data?.data?.length
    const Weather = response?.data?.data[length - 1]
    return Weather;
    } catch (error) {
    if (error.code === 'ECONNRESET') {
      console.log(error)
      console.log('Connection reset, retrying...');
    } else {
      throw error;
    }
  }
}

const getImageOfDestination = async (destinationInput, imageKey) => {
  const url = `${imageBaseURL}key=${imageKey}&q=${destinationInput}&image_type=photo`
  console.log('url1', url);
  try {
    const response = await axios.get(url)
    const image = response?.data?.hits[0]?.largeImageURL || '';
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