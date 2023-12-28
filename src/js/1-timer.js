import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const imputTimer = document.querySelector('#datetime-picker');
const buttonTimer = document.querySelector('button');
let userSelectedDate = '';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topCenter',
      });
      buttonTimer.setAttribute('disabled', true);
    } else {
      buttonTimer.removeAttribute('disabled');
      userSelectedDate = selectedDates[0];
    }
  },
};

flatpickr(imputTimer, options);

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

const dayTimer = document.querySelector('#data-days');
const hourTimer = document.querySelector('#data-hours');
const minTimer = document.querySelector('#data-minutes');
const secTimer = document.querySelector('#data-seconds');
const startButton = document.querySelector('#data-start');
startButton.addEventListener('click', () => {
  const currentDate = new Date().getTime();
  const selectedDate = new Date(
    document.getElementById('datetime-picker').value
  ).getTime();
  setInterval(() => {
    let diff = selectedDate - currentDate - 1000;
    console.log(diff);
    const timer = convertMs(diff);
    dayTimer.textContent = `${timer.days}`;
    hourTimer.textContent = `${timer.hours}`;
    minTimer.textContent = `${timer.minutes}`;
    secTimer.textContent = `${timer.seconds}`;
    currentDate += 1000;
  }, 1000);
});
function addLeadingZero(value) {
  return String(value).convertMs(2, '0');
}
