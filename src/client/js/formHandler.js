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
    if (destinationInfo && !destinationInfo.error) {
      const { lng, lat, name } = await destinationInfo;
      
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
      'Content-Type': 'application/json',
      Connection: 'keep-alive'
      // 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'
    }
  };

  try {
    const response = await axios.post(destinationServerURL, inputForm, headerParameter)
    // const response = await axios.get('http://api.geonames.org/searchJSON?q=vietnam&maxRows=1&username=xinhho')
    console.log(response)
    const destinationInfor = response?.data;
    return destinationInfor;
  } catch (error) {
    console.log('error', error);
    showError(error)
  }
}

// const getWeatherInfo = async (latitude = '', longitude = '' ) => {
//   const bodyParam = {
//     latitude: latitude,
//     longitude: longitude
//   }
//   const parameter = {
//     method: 'POST',
//     credentials: 'same-origin',
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Methods': 'POST, PUT, PATCH, GET, DELETE, OPTIONS',
//       'Access-Control-Allow-Headers': '*',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(bodyParam)
//   };
  
//   const resData = await fetch(weatherServerURL, parameter)
//   try {
//     const weatherInfor = await resData.json();
//     console.log('weatherInfor:', weatherInfor)
//     return weatherInfor;
//   } catch (error) {
//     console.log('error', error);
//     showError(error)
//   }
// }

// const getImage = async (countryName = '') => {
//   const bodyParam = {
//     countryName: countryName
//   }
//   const parameter = {
//     method: 'POST',
//     credentials: 'same-origin',
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Methods': 'POST, PUT, PATCH, GET, DELETE, OPTIONS',
//       'Access-Control-Allow-Headers': '*',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(bodyParam)
//   };
  
//   const resData = await fetch(imageServerURL, parameter)
//   try {
//     const image = await resData.json();
//     console.log('image:', image)
//     return image;
//   } catch (error) {
//     console.log('error', error);
//     showError(error)
//   }
// }

// const updateDynamicUI = async (response = {}) => {
//   document.getElementById('score-tag').innerHTML = `Score Tag: ${response.score_tag}`;
//   document.getElementById('agreement').innerHTML = `Agreement: ${response.agreement}`;
//   document.getElementById('subjectivity').innerHTML = `Subjectivity: ${response.subjectivity}`;
//   document.getElementById('confidence').innerHTML = `Confidence: ${response.confidence}`;
//   document.getElementById('irony').innerHTML = `Irony: ${response.irony}`;
// };
// Export the handleSubmit function
export { handleSubmitAction };

