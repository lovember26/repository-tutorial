const daysTag = document.querySelector(".days");
const currentDate = document.querySelector(".current-date");
const prevNextIcon = document.querySelectorAll(".icons span");

const btnEl = document.querySelector('.calendar-btn');
const spanEl = document.querySelector('.calendar-btn-span');
const modalEl = document.querySelector('.modal');
const todayBtn = document.querySelector('.today-btn');
const yearBtn = document.querySelector('.next-year');
const yearsDiv = document.querySelector('.years ul');

btnEl.addEventListener('click', () => {
    return modalEl.classList.toggle('is-shown')
        ? btnEl.classList.add('btn-is-active')
        : btnEl.classList.remove('btn-is-active');
});
btnEl.addEventListener('hover', () => btnEl.classList.add('btn-is-active'));
btnEl.addEventListener('focus', () => btnEl.classList.add('btn-is-active'));

let selectedDate = "";
let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();
const months = ["January", "February", "March", "April", "May", "June", "July",
                "August", "September", "October", "November", "December"];

function renderCalendar () {
    let firstDayofMonth = new Date(currYear, currMonth, 0).getDay(); // getting first day of month
    let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(); // getting last date of month
    let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(); // getting last day of month
    let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    // let weekend = new Date(currYear, currMonth, 6, 7);
    let liTag = "";
    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li><button type="button" class="button inactive" id="inactive" disabled>${lastDateofLastMonth - i + 1}</button></li>`;
    }
    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
            && currYear === new Date().getFullYear() ? "active" : "";
        let isCurrentDay = i === date.getDate() ? "current-month-day" : "";
        liTag += `<li><button type="button" class="button ${isToday} ${isCurrentDay}">${i}</button></li>`;   
    }
    for (let i = lastDayofMonth; i < 7; i++) { // creating li of next month first days
        liTag += `<li><button type="button" class="button inactive" id="inactive" disabled>${i - lastDayofMonth + 1}</button></li>`
    }

    currentDate.innerHTML = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;

    const dayBtns = document.querySelectorAll(".button");
    dayBtns.forEach(dayBtn => dayBtn.addEventListener('click', (e) => {
        spanEl.textContent = `${addLeadingZero(e.target.textContent)}/${addLeadingZero(currMonth + 1)}/${currYear}`;
        selectedDate = spanEl.textContent;
        modalEl.classList.toggle('is-shown');
        btnEl.classList.remove('btn-is-active');

        todayBtn.addEventListener('click', () => {
            spanEl.textContent = `${addLeadingZero(date.getDate())}/${addLeadingZero(new Date().getMonth() + 1)}/${new Date().getFullYear()}`;
            currentDate.innerHTML = `${months[new Date().getMonth()]} ${new Date().getFullYear()}`;
        });
        return selectedDate;
    }));
}
renderCalendar();

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};

prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
        if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar(); // calling renderCalendar function
    });
});
yearBtn.addEventListener('click', () => {
    currYear -= 1;
    renderCalendar();
})
