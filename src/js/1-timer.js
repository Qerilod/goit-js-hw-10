import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputTimer = document.querySelector('#datetime-picker');
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
      buttonTimer.disabled = true;
    } else {
      buttonTimer.disabled = false;
      userSelectedDate = selectedDates[0];
    }
  },
};

flatpickr(inputTimer, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return value < 10 ? '0' + value : value;
}
const dayTimer = document.querySelector('[data-days]');
const hourTimer = document.querySelector('[data-hours]');
const minTimer = document.querySelector('[data-minutes]');
const secTimer = document.querySelector('[data-seconds]');
const startButton = document.querySelector('[data-start]');
let timerInterval;
startButton.addEventListener('click', () => {
  if (timerInterval) {
    return;
  }
  startButton.disabled = true;
  inputTimer.disabled = true;
  const currentDate = new Date();
  const selectedDate = userSelectedDate;
  const interval = setInterval(() => {
    const diff = selectedDate - currentDate;

    const timer = convertMs(diff);
    dayTimer.textContent = `${addLeadingZero(timer.days)}`;
    hourTimer.textContent = `${addLeadingZero(timer.hours)}`;
    minTimer.textContent = `${addLeadingZero(timer.minutes)}`;
    secTimer.textContent = `${addLeadingZero(timer.seconds)}`;

    if (
      timer.days === 0 &&
      timer.hours === 0 &&
      timer.minutes === 0 &&
      timer.seconds === 0
    ) {
      clearInterval(interval);
      startButton.disabled = true;
      inputTimer.disabled = false;
    }

    currentDate.setSeconds(currentDate.getSeconds() + 1);
  }, 1000);
});
