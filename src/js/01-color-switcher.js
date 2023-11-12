function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let intervalId;

startBtn.addEventListener('click', startColorChange);
stopBtn.disabled = true;

function startColorChange() {
    startBtn.disabled = true;
    stopBtn.disabled = false;

    changeBackgroundColor();

    intervalId = setInterval(changeBackgroundColor, 1000);
}

function stopColorChange() {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    clearInterval(intervalId);
}

function changeBackgroundColor() {
    document.body.style.backgroundColor = getRandomHexColor();
}

stopBtn.addEventListener('click', stopColorChange);
