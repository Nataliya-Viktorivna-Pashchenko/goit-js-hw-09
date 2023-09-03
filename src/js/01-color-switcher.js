const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const backgrowndBody = document.querySelector('body');
let inervalId;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

btnStop.disabled = true;

function onStart() {
    if (!inervalId) {
       inervalId = setInterval(() => {
        const randomColor = getRandomHexColor();
    
        btnStart.disabled = true;
        btnStop.disabled = false;
                backgrowndBody.style.backgroundColor = `${randomColor}`;
   },1000);
    }
};

function onStop  () {
    btnStart.disabled = false;
    btnStop.disabled = true;
    clearInterval(inervalId);
    inervalId = null;
};

btnStart.addEventListener('click', onStart);
btnStop.addEventListener('click', onStop);