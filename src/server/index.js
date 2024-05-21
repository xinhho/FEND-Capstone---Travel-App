var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const cors = require('cors');
const { getDestinationInfo, getImageOfDestination, getWeatherInfo } = require('./requestHandle')

dotenv.config();

// Start up an instance of app
const app = express();
app.timeout = 300000;
app.use(express.static('dist'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});


// Variables for url and api key

// API for destinations
// const geonamesBaseURL = 'http://api.geonames.org/searchJSON?'
const apiGeonamesKey = process.env.API_GEONAMES_KEY

// API for weather
// const weatherbitBaseURL = 'http://api.weatherbit.io/v2.0/forecast/daily?'
const weatherbitKey = process.env.API_WEATHERBIT_KEY

// API for get Images
// const imageBaseURL = 'https://pixabay.com/api/?'
const imageKey = process.env.API_IMAGE_KEY

let destinationData = {};
let weatherData = {};
let imagesData = {};

//GET API
app.get('/', (req, res) => {
  res.sendFile('dist/index.html')
})

// POST API

app.post('/destination', async (req, res) => {
  // destinationName = req.body.destinationName;
  // const apiURL = `${geonamesBaseURL}q=${destinationName}&maxRows=1&username=${apiGeonamesKey}`
  // console.log('apiURL', apiURL);
  // let mcData = {}
  // const response = await fetch(apiURL).catch(e => { console.log(e)})
  // if (response) {
  //   mcData = await response.json()
  // }
  // console.log('mcData', mcData);
  // destinationData['country'] = mcData.country;
  // destinationData['latitude'] = mcData.latitude;
  // destinationData['longitude'] = mcData.longitude;

  // console.log('destinationData', destinationData);
  // res.send(mcData);
  const destinationName = req.body.destination;
  let destinationData = null
  destinationData = await getDestinationInfo(destinationName, apiGeonamesKey).catch(e => {
    console.log(e.code)
  })
  console.log('destinationData', destinationData);
  return res.send(destinationData || {})
})

// app.post('/weather', async (req,res) => {
//   const latitude = req.body.latitude;
//   const longitude = req.body.longitude;
//   weatherData = await getWeatherInfo(latitude, longitude)
//   return res.send(weatherData)
// })

// app.post('/image', async (req,res) => {
//   const countryName = req.body.countryName;
//   imagesData = await getImageOfDestination(countryName)
//   return res.send(imagesData)
// })

// app.post('/weather', async (req, res) => {
//   latitude = req.body.latitude;
//   longitude = req.body.longitude;

//   const apiURL = `${weatherbitBaseURL}lat=${latitude}&lon=${longitude}&key=${weatherbitKey}`
//   console.log('apiURL', apiURL);

//   const response = await fetch(apiURL)
//   const mcData = await response.json()
//   weatherData['country'] = mcData.country;
//   weatherData['latitude'] = mcData.latitude;
//   weatherData['longitude'] = mcData.longitude;

//   console.log('weatherData', weatherData);
//   res.send(weatherData);
// })

// app.post('/image', async (req, res) => {
//   countryName = req.body.countryName;
//   const apiURL = `${imageBaseURL}key=${imageKey}&q=${countryName}&image_type=photo`
//   console.log('apiURL', apiURL);

//   const response = await fetch(apiURL)
//   const mcData = await response.json()

//   console.log('weatherData', imagesData);
//   res.send(imagesData);
// })

// Designates what port the app will listen to for incoming requests
const port = 8085;
const server = app.listen(port, () => {
  console.log(`server is listening on port: ${port}`);
});
