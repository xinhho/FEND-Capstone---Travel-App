const axios = require('axios');
const http = require('http')

// Variables for url and api key

// API for destinations
const geonamesBaseURL = 'http://api.geonames.org/searchJSON?'
// const apiGeonamesKey = process.env.API_GEONAMES_KEY

// API for weather
const weatherbitBaseURL = 'https://api.weatherbit.io/v2.0/current?'
// const weatherbitKey = process.env.API_WEATHERBIT_KEY

// API for get Images
const imageBaseURL = 'https://pixabay.com/api/?'
// const imageKey = process.env.API_IMAGE_KEY

const httpAgent = new http.Agent({ keepAlive: true });

const axiosInstance = axios.create();

const getDestinationInfo = (DestinationInput='', apiGeonamesKey='') => {
  // let retries = 0;
  const url = `${geonamesBaseURL}q=${DestinationInput}&maxRows=1&username=${apiGeonamesKey}`
  console.log('url', url);
  return axiosInstance.get(
    url,
    {
      httpAgent: httpAgent
    }
  )
  // while (retries < 3) {
    // try {
    //   const response = await axios.get(url)
    //   console.log('data', response);
    //   const destinationData = response?.data?.geonames[0]
    //   return destinationData;
    // } catch (error) {
    //   if (error.code === 'ECONNRESET') {
    //     console.log(error)
    //     console.log('Connection reset, retrying...');
    //     // retries++;
    //   } else {
    //     throw error;
    //   }
    // }

  // }
  
}

const getImageOfDestination = async (DestinationInput) => {
  const {data} = await axios.get(`${imageBaseURL}key=${imageKey}&q=${DestinationInput}&image_type=photo`)
  const image = await data.hits[0]? await data.hits[0].webformatURL: "https://source.unsplash.com/random/640x480?city,morning,night?sig=1"
  if(image){
    return {image}
  }
}

const getWeatherInfo = async (latitude = '', longitude = '' , key='') => {
  const {data} = await axios.get(`${weatherbitBaseURL}lat=${latitude}&lon=${longitude}&units=M&key=${weatherbitKey}`)
    const {weather , temp} = data.data[data.data.length -1];
    const {description} = weather;
    const weather_data = {description, temp}
    console.log(weather_data);
    return weather_data
}


module.exports = {
  getDestinationInfo,
  getImageOfDestination,
  getWeatherInfo
}