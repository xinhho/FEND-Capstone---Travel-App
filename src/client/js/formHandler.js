// Replace checkForName with a function that checks the URL
import { updateTripResultUI } from './utils';
const axios = require('axios');
const destinationServerURL = 'http://localhost:8085/destination';
const weatherServerURL = 'http://localhost:8085/weather';
const imageServerURL = 'http://localhost:8085/image';

const handleSubmitAction = async (event) => {
  let destinationInfo = {}
  let weatherInfo = {}
  let imgUrl = ''
  event.preventDefault();
  // Get values input from the input field
  const tripCard = document.getElementById('trip-card');
  tripCard.style.display = "none";
  const inputForm = document.getElementById('urlForm');
  const destination = document.getElementById('destination').value;
  const datePlanner = document.getElementById('date-planner').value;
  // Check if values input is not empty
  if (destination !== '' && datePlanner !== '') {
    //get the location first and make sure call is successful
    destinationInfo = await getDestinationInfo(inputForm);
    console.log('destinationInfo', destinationInfo);
    if (destinationInfo) {
      weatherInfo = await getWeatherInfo(destinationInfo.latitude, destinationInfo.longitude);
      console.log('WeatherInfo', weatherInfo);
      imgUrl = await getImageOfDestination(destinationInfo.country);
      console.log('imgUrl', imgUrl);

      if (weatherInfo && imgUrl) {
        updateTripResultUI(destinationInfo, weatherInfo, imgUrl, datePlanner, tripCard)
      }
    }
  } else {
    showError('Please enter country name and date!')
  }
}

const showError = (errorMessage = '') => {
  const errorElement = document.getElementById('error');
  var text = errorMessage !== '' ? document.createTextNode(errorMessage) : document.createTextNode('');
  errorElement.appendChild(text);
}

const getDestinationInfo = async (inputForm) => {
  
  const headerParameter = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, PUT, PATCH, GET, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/json'
    }
  };

  try {
    const response = await axios.post(destinationServerURL, inputForm, headerParameter)
    const destinationInfor = response?.data;
    return destinationInfor;
  } catch (error) {
    console.log('error', error);
    showError(error)
  }
}

const getWeatherInfo = async (latitude = '', longitude = '' ) => {
  const bodyParam = {
    latitude: latitude,
    longitude: longitude
  }
  const headerParameter = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, PUT, PATCH, GET, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/json'
    }
  };
  
  try {
    const response = await axios.post(weatherServerURL, bodyParam, headerParameter);
    const weatherInfor = response?.data;
    return weatherInfor;
  } catch (error) {
    console.log('error', error);
    showError(error)
  }
}

const getImageOfDestination = async (countryName = '') => {
  const headerParameter = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, PUT, PATCH, GET, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/json'
    }
  };
  
  try {
    const response = await axios.post(imageServerURL, {countryName}, headerParameter);
    const image = response?.data;
    return image;
  } catch (error) {
    console.log('error', error);
    showError(error)
  }
}

// Export the handleSubmit function
export { handleSubmitAction };

