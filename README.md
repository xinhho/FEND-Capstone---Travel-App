#### My Travel Planner - FEND-Capstone-Travel-App

# Project Introduction

This project requires you to build out a travel app that, at a minimum, obtains a desired trip location & date from the user, and displays weather and an image of the location using information obtained from external APIs

The goal of this project is to give you practice with:
- Setting up Webpack
- Sass styles
- Webpack Loaders and Plugins
- Creating layouts and page design
- Service workers
- Using APIs and creating requests to external urls

## Setting up the API
 We have three APIs needed for this final project:

### For the Geonames API.
You need to create your account on https://www.geonames.org/export/web-services.html and get your an API key

### For the Weatherbit API.
You need to create your account on https://www.weatherbit.io/account/create and get your an API key

### For the Pixabay. API.
You need to create your account on https://pixabay.com/api/docs/ and get your an API key


### Step 4: Environment Variables
Next we need to declare our API keys:

...but there's a problem with this. We are about to put our personal API keys into a file, but when we push, this file is going to be available PUBLICLY on Github. Private keys, visible publicly are never a good thing. So, we have to figure out a way to make that not happen. The way we will do that is with environment variables. Environment variables are pretty much like normal variables in that they have a name and hold a value, but these variables only belong to your system and won't be visible when you push to a different environment like Github.

- [ ] Use npm or yarn to install the dotenv package ```npm install dotenv```. This will allow us to use environment variables we set in a new file
- [ ] Create a new ```.env``` file in the root of your project
- [ ] Go to your .gitignore file and add ```.env``` - this will make sure that we don't push our environment variables to Github! If you forget this step, all of the work we did to protect our API keys was pointless.
- [ ] Fill the .env file with your API keys like this:
```
API_ID=**************************
API_KEY=**************************
```
- [ ] Add this code to the very top of your server/index.js file:
```
const dotenv = require('dotenv');
dotenv.config();
```
- [ ] Reference variables you created in the .env file by putting ```process.env``` in front of it, an example might look like this:

## Deploying

A great step to take with your finished project would be to deploy it! Unfortunately its a bit out of scope for me to explain too much about how to do that here, but checkout [Netlify](https://www.netlify.com/) or [Heroku](https://www.heroku.com/) for some really intuitive free hosting options.

### Final Output
![Output](https://github.com/xinhho/evaluate-news-nlp/blob/main/src/assets/output-completed.PNG)
![Output](https://github.com/xinhho/evaluate-news-nlp/blob/main/src/assets/output-error.PNG)
![Output](https://github.com/xinhho/evaluate-news-nlp/blob/main/src/assets/test-output.PNG)


