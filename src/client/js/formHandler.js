// Replace checkForName with a function that checks the URL
// import { checkValidUrl } from './utils';
const axios = require('axios');
const destinationServerURL = 'http://localhost:8085/destination';
const weatherServerURL = 'http://localhost:8085/weather';
const imageServerURL = 'http://localhost:8085/image';

const handleSubmitAction = async (event) => {
  event.preventDefault();
  // Get values input from the input field
  const inputForm = document.getElementById('urlForm');
  const destination = document.getElementById('destination').value;
  const datePlanner = document.getElementById('date-planner').value;
  // Check if values input is not empty
  if (destination !== '' && datePlanner !== '') {
    //get the location first and make sure call is successful
    const destinationInfo = await getDestinationInfo(inputForm);
    console.log('destinationInfo', destinationInfo);
    if (destinationInfo) {
      console.log('1');
      const { longitude, latitude, country } = await destinationInfo;
      const WeatherInfo = await getWeatherInfo(latitude, longitude);
      console.log('WeatherInfo', WeatherInfo);
      const img = await getImage(country);
      console.log('img', img);
    }
  } else {
    showError('Please enter valid url!')
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

const getImage = async (countryName = '') => {
  const headerParameter = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, PUT, PATCH, GET, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/json'
    }
  };
  
  try {
    const response = await axios.post(imageServerURL, countryName, headerParameter);
    const image = response?.data;
    return image;
  } catch (error) {
    console.log('error', error);
    showError(error)
  }
}

// const updateDynamicUI = async (response = {}) => {
//   document.getElementById('score-tag').innerHTML = `Score Tag: ${response.score_tag}`;
//   document.getElementById('agreement').innerHTML = `Agreement: ${response.agreement}`;
//   document.getElementById('subjectivity').innerHTML = `Subjectivity: ${response.subjectivity}`;
//   document.getElementById('confidence').innerHTML = `Confidence: ${response.confidence}`;
//   document.getElementById('irony').innerHTML = `Irony: ${response.irony}`;
// };
// Export the handleSubmit function
export { handleSubmitAction };

