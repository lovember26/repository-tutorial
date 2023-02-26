import { onSuccess, onSuccessToWeek, onError } from './api/weather-api';

getGeolocation();

function getGeolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }
}

function onClick() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccessToWeek, onError);
  }
}

export { onClick };
export { getGeolocation };
