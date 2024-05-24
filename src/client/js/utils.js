
const updateTripResultUI = async (destinationInfo, weatherInfo, imgUrl, datePlanner, tripCard) => {
  const img = document.getElementById('img-src');
  if (destinationInfo && weatherInfo && imgUrl) {
    tripCard.style.display = "flex";
    document.getElementById('country-name').innerHTML = `My trip to: ${destinationInfo?.country}`;
    document.getElementById('departing').innerHTML = `Departing: ${datePlanner}`;
    document.getElementById('wheather-info').innerHTML = `Typical weather for then is: \n hight ${weatherInfo?.highTemp}, low ${weatherInfo?.lowTemp} 
    \n,  ${weatherInfo?.weatherDiscription?.description}`;
    img.setAttribute('src', imgUrl);
    document.getElementById('save-btn').innerHTML = 'Save Trip';
    document.getElementById('remove-btn').innerHTML = 'Remove Trip';

  } else {
    tripCard.style.display = "none";
  }
};

export { updateTripResultUI };
