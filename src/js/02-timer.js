import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const inputFlatpickr = document.querySelector('#datetime-picker')
const buttonStart = document.querySelector('button[data-start]')
const timerDays = document.querySelector('span[data-days]')
const timerHours = document.querySelector('span[data-hours]')
const timerMinutes = document.querySelector('span[data-minutes]')
const timerSeconds = document.querySelector('span[data-seconds]')

buttonStart.setAttribute('disabled', true)

let inputDates = null




const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      inputDates = selectedDates[0]
      if(inputDates < new Date()){
        alert ("Please choose a date in the future")
      }
      else{
        buttonStart.removeAttribute('disabled')
      }
    },
  };
  
  flatpickr (inputFlatpickr, options)

  buttonStart.addEventListener('click', onStartTimer)

  function onStartTimer (){
  const timerId = setInterval(() =>{
    const now = new Date()
    const end = inputDates
     const delta = end - now
     const {days, hours, minutes, seconds} = convertMs(delta)
       timerDays.textContent = pad(days)
       timerHours.textContent = pad(hours)
       timerMinutes.textContent = pad(minutes)
       timerSeconds.textContent = pad(seconds)
       if(delta < 0){
         clearInterval(timerId)
       }
    }, 1000)
    if(timerId){
      buttonStart.disabled = true
    }
  }


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
  
  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

  function pad(value) {
    return String(value).padStart(2, '0');
  }
