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
  let mcData = {}
  const destinationName = req.body.destination;
  mcData = await getDestinationInfo(destinationName, apiGeonamesKey);
  destinationData['country'] = mcData.countryName;
  destinationData['latitude'] = mcData.lat;
  destinationData['longitude'] = mcData.lng;
  console.log('destinationData', destinationData);
  return res.send(destinationData)
})

app.post('/weather', async (req,res) => {
  let mcData = {}
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  weatherData = await getWeatherInfo(latitude, longitude, weatherbitKey)
  console.log('weatherData', weatherData);
  return res.send(weatherData)
})

app.post('/image', async (req,res) => {
  let mcData = {}
  const countryName = req.body.countryName;
  imagesData = await getImageOfDestination(countryName, imageKey)
  return res.send(imagesData)
})

// Designates what port the app will listen to for incoming requests
const port = 8085;
const server = app.listen(port, () => {
  console.log(`server is listening on port: ${port}`);
});
