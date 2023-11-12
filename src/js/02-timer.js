import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    validateDate(selectedDates[0]);
  },
};

const datepickerInstance = flatpickr("#datetime-picker", options);

document.querySelector('[data-start]').disabled = true;

function validateDate(selectedDate) {
  if (!selectedDate || selectedDate.getTime() < new Date().getTime()) {
    Notiflix.Notify.failure('Please choose a valid date and time in the future');
    document.querySelector('[data-start]').disabled = true;
  } else {
    document.querySelector('[data-start]').disabled = false;
  }
}

const startBtn = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');
let intervalId;

startBtn.addEventListener('click', startCountdown);

function startCountdown() {
  const selectedDate = datepickerInstance.selectedDates[0];

  validateDate(selectedDate);

  if (startBtn.disabled) {
    return;
  }

  clearInterval(intervalId);
  startBtn.disabled = false;

  const endDate = selectedDate.getTime();

  startBtn.disabled = true;
  intervalId = setInterval(updateTimer, 1000);

  function updateTimer() {
    const currentDate = new Date().getTime();
    const timeRemaining = endDate - currentDate;

    if (timeRemaining <= 0) {
      clearInterval(intervalId);
      updateInterface({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      Notiflix.Notify.success('Countdown completed!');
      startBtn.disabled = false;
    } else {
      const timeValues = convertMs(timeRemaining);
      updateInterface(timeValues);
    }
  }
}

function updateInterface({ days, hours, minutes, seconds }) {
  const formattedDays = days.toString();
  const formattedHours = addLeadingZero(hours);
  const formattedMinutes = addLeadingZero(minutes);
  const formattedSeconds = addLeadingZero(seconds);

  // Update the timer interface
  daysElement.textContent = formattedDays;
  hoursElement.textContent = formattedHours;
  minutesElement.textContent = formattedMinutes;
  secondsElement.textContent = formattedSeconds;
}

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
  return value.toString().padStart(2, '0');
}
