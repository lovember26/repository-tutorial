import { onSuccess, onSuccessToWeek, onError } from './api/weather-api';
import { addClassToCard, removeClassToCard } from './markups/weather-markup';

getGeolocation();

function getGeolocation() {
  console.log('geolocation');
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    // removeClassToCard();
  }
}

function onClick() {
  console.log('click');
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccessToWeek, onError);
    // addClassToCard();
  }
}

export { onClick };
export { getGeolocation };
