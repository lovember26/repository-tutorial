const LINK_TO_WEEK = 'https://sinoptik.ua/';
import { months, days, weekDay, dateToWeek } from '../utils/weather-dates';
import { onClick } from '../weather';
import { getGeolocation } from '../weather';

let weatherData = {
  coord: { lon: 30.2748, lat: 50.5461 },
  main: -1,
  name: 'Hostomel',
  timezone: 7200,
  weather: [
    {
      main: 'Clouds',
      icon: '04n',
    },
  ],
};

function getMarkupWeather({ data: weatherData }) {
  const { name, weather, main } = weatherData;
  const { main: weatherMain, icon } = weather[0];
  const today = new Date();
  let day = today.getDay();
  let date = today.getDate();
  let month = today.getMonth();
  let year = today.getFullYear();

  const tempRound = isNaN(main) ? 0 : Math.round(main);

  const templateWeather = `<div class="weather__header">
    <p class="weather__temp">${tempRound}&#176;</p>
    <div class="weather__wrapper">
      <p class="weather__status">${weatherMain}</p>
      <p class="weather__location">${name}</p>
    </div>
  </div>
  <div>
    <img class="wheather__icon" src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${weatherMain}">
  </div>
  <div class="weather__data">
    <p class="weather__date">${days[day]}</p>
    <p class="weather__date">${date} ${months[month]} ${year}</p>
  </div>
  <a href="${LINK_TO_WEEK}" target="_blank" rel="noopener nofollow noreferer" class="weather__btn">weather for week</a>
`;

  return {
    markup: templateWeather,
    setClickHandler: (conteiner, onClick) => {
      const button = conteiner.querySelector('.weather__btn');
      button.addEventListener('click', onClick);
    },
  };
}

function getMarkupWeatherToWeek({ data }) {
  // console.log('getMarkupWeatherToWeek', data.daily.length);

  const markupLocationToWeek = `
      <button class="weather__btn weather__btn-close" type="button">close</button>
    <h2 class="weather__location weather__location-week">region: ${data.timezone}</h2>`;

  const parts = [];
  for (let i = 0; i < data.daily.length - 1; i += 1) {
    const tempDayRound = Math.round(data.daily[i].temp.day);
    const tempNightRound = Math.round(data.daily[i].temp.night);

    const markupListToWeek = `<table class="weather__table">
      <tr>
        <td class="weather__week">${weekDay[i]},<br>${dateToWeek[i]}
        </td>
        <td class="weather__week">
          <img
            class="wheather__icon-week"
            src="http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png"
            alt="${data.daily[i].weather[0].main}"
          />
          <td class="weather__week">
            ${tempDayRound} / ${tempNightRound}&#8451;
          </td>
          <td class="weather__week weather__week-last">${data.daily[i].weather[0].main}</td>
        </td>
      </tr>
    </table>`;
    parts.push(markupListToWeek);
  }
  const dayWeatherCard = document.querySelector('.weather__card');
  // console.log(dayWeatherCard);

  dayWeatherCard.innerHTML = markupLocationToWeek + parts.join('');

  const clouseWeekWidget = document.querySelector('.weather__btn-close');
  // console.log(clouseWeekWidget);
  clouseWeekWidget.addEventListener('click', getGeolocation);

  return dayWeatherCard.outerHTML;
}

function renderToGallery() {
  const { markup, setClickHandler } = getMarkupWeather({ data: weatherData });
  const gallery = document.querySelector('.news-gallery');
  const item = document.createElement('li');
  item.classList.add('weather__card');
  item.innerHTML = markup;
  gallery.appendChild(item);
  setClickHandler(item, onClick);
}
renderToGallery();

function addClassToCard() {
  const weekWeatherCard = document.querySelector('.weather__table');
  // console.log(weekWeatherCard);
  weekWeatherCard.classList.toggle('is-active');
}

export { getMarkupWeather, getMarkupWeatherToWeek };
export { addClassToCard, removeClassToCard, weatherData };
