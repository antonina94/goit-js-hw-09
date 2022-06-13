
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form')
const inputDelay = document.querySelector('input[name="delay"]')
const inputStep = document.querySelector('input[name="step"]')
const inputAmount = document.querySelector('input[name="amount"]')
const button = document.querySelector('button[type="submit"]')

function onFormSubmit(e){
    e.preventDefault()
        let delay = Number(inputDelay.value)
        let step = Number(inputStep.value)
        let amount = Number(inputAmount.value)
        setTimeout(()=>{
          for (let i = 0; i < amount; i++){
           position = i + 1
           delay+=step
            createPromise(position, delay)
            .then(({position, delay}) =>{
            Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
            })
            .catch(({ position, delay }) => {
            Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
               })
          }
        }, delay)

}

form.addEventListener('submit', onFormSubmit)


function createPromise(position, delay) {
return new Promise((resolve, reject) =>{
  const shouldResolve = Math.random() > 0.3;
  setTimeout(()=>{
    if (shouldResolve) {
      resolve({position, delay})
    } else {
      reject({position, delay})
    }
  }, delay)
})
}
