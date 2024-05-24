# My Travel Planner - FEND-Capstone-Travel-App

## Project Introduction

This project requires you to build out a travel app that, at a minimum, obtains a desired trip location & date from the user, and displays weather and an image of the location using information obtained from external APIs

## To run in development mode
- Clone this repository
- run npm install (please use node version v18.20.3 . You will have an error when running npm i if you use the older version of nodejs)
- to start the webpack prod server by command: 
    $ npm run build-prod

- to start the webpack dev server at port 8085 by command: 
    $ npm run build-dev

- to start client side: 
    $ npm run start

- to run test:
    $ npm run test

## Configs
  Here, we have two separate webpack config files for both development mode(webpack.config.dev.js) and production mode(webpack.config.prod.js )

  All the scripts and dependencies are listed in the package.json file.

  Note: to get the data from the API, you will need to create a .env file which will store all the URLs and API keys of the used APIs.

## Setting up the API
 We have three APIs needed for this final project:

### For the Geonames API.
You need to create your account on https://www.geonames.org/export/web-services.html and get your an API key

### For the Weatherbit API.
You need to create your account on https://www.weatherbit.io/account/create and get your an API key

### For the Pixabay. API.
You need to create your account on https://pixabay.com/api/docs/ and get your an API key

## Final Output
![Output](https://github.com/xinhho/FEND-Capstone-Travel-App/blob/master/src/assets/ui-initt.png)
![Output](https://github.com/xinhho/FEND-Capstone-Travel-App/blob/master/src/assets/out-put.png)
![Output](https://github.com/xinhho/FEND-Capstone-Travel-App/blob/master/src/assets/error-1.png)
![Output](https://github.com/xinhho/FEND-Capstone-Travel-App/blob/master/src/assets/error-2.png)
![Output](https://github.com/xinhho/FEND-Capstone-Travel-App/blob/master/src/assets/test.png)


