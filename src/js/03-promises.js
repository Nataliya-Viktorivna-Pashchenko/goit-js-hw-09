import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.6.min.css";

const form = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
       if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
};


function onCreate (event) {
  event.preventDefault();
  const firstDelay = Number(form.delay.value);
  const delayStep = Number(form.step.value);
  const amount = Number(form.amount.value);

  if (amount <= 0) {
    Notiflix.Notify.warning("Value of amount must be more than 0");
  } else {
    for (let i = 0; i < amount; i++) {
      const position = i + 1;
      const delay = firstDelay + delayStep * i;
      setTimeout(() => {
        createPromise(position, delay)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
      }, delay);
      
      
    }
  }
};
  
form.addEventListener('submit', onCreate);

// if (shouldResolve) {
//       setTimeout(() => resolve({ position, delay }), delay);
//     } else {
//       setTimeout(() => reject({ position, delay }), delay);
//     }