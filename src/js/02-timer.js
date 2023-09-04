import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.6.min.css";

const pickerData = document.querySelector('#datetime-picker')
const btnStart = document.querySelector('[data-start]')
const timer = document.querySelector('.timer')

const daysItem = document.querySelector('[data-days]');
const hoursItem = document.querySelector('[data-hours]');
const minutesItem = document.querySelector('[data-minutes]');
const secondsItem = document.querySelector('[data-seconds]');

let intervalId;
let userDate;


btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) { 
        if (selectedDates[0] <= options.defaultDate) {
            Notiflix.Notify.warning("Please choose a date in the future");
        } else {
          userDate = selectedDates[0];
          console.log(selectedDates[0]); 
            btnStart.disabled = false;
      }
             
        return 

  },
};

flatpickr(pickerData, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) { 
    return value.toString().padStart(2, '0');
};

function onStart() {
pickerData.disabled = true;
    intervalId = setInterval(() => {
      const timeToEnd = userDate - new Date();
      
      if (timeToEnd > 0) {

            const { days, hours, minutes, seconds } = convertMs(timeToEnd);

            daysItem.textContent = addLeadingZero(`${days}`);
            hoursItem.textContent = addLeadingZero(`${hours}`);
            minutesItem.textContent = addLeadingZero(`${minutes}`);
            secondsItem.textContent = addLeadingZero(`${seconds}`);

           }
        btnStart.disabled = true;
         }, 1000);
}

btnStart.addEventListener('click', onStart);
