
const updateTripResultUI = (destinationInfo, weatherInfo, imgUrl, tripCard, durationsDay) => {
  tripCard.style.display = "none";
  const img = document.getElementById('img-src');
  if (destinationInfo && weatherInfo && imgUrl) {
    tripCard.style.display = "flex";
    document.getElementById('country-name').innerHTML = `My trip to: ${destinationInfo?.country}`;
    document.getElementById('departing').innerHTML = `${destinationInfo?.country} is ${durationsDay} days away`;
    document.getElementById('wheather-info').innerHTML = `Typical weather for then is: \n hight ${weatherInfo?.highTemp}, low ${weatherInfo?.lowTemp} 
    \n,  ${weatherInfo?.weatherDiscription?.description}`;
    img.setAttribute('src', imgUrl);
    document.getElementById('save-btn').innerHTML = 'Save Trip';
    document.getElementById('remove-btn').innerHTML = 'Remove Trip';

  } else {
    tripCard.style.display = "none";
  }
};

const getDurationDay = (dateInput) => {
  const dateTime = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const firstDate = new Date();
  const secondDate = new Date(dateInput);
  
  const remainingDay = Math.ceil((secondDate.getTime() - firstDate.getTime()) / dateTime);
  console.log('remainingDay', remainingDay);
  return remainingDay;
}

export { updateTripResultUI, getDurationDay };
