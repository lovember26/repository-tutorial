const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

let date = new Date();
let dates = [];
let dateToWeek = [];

let weekDay = [];

function getDateToWeek() {
  const options = { month: 'short', day: 'numeric' };

  Date.prototype.addDays = function (days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  for (let i = 0; i < 7; i++) {
    dates.push(date.addDays(i));
  }

  dates.forEach(date => {
    let dateWeek = date.toLocaleString('en-EN', options);
    dateToWeek.push(dateWeek);
  });
}
getDateToWeek();

function getWeekDay() {
  let start = new Date().getDay();
  for (let i = 0; i < days.length; i += 1) {
    let index = (i + start) % days.length;
    weekDay.push(days[index]);
  }
}
getWeekDay();

export { months, days, weekDay, dateToWeek };
