const timer = document.getElementById("stopwatch");
const startButton = document.getElementById("startButton");

let lapNumber = 0;

let [hour, min, sec, centisecond] = [0, 0, 0, 0];

let stopTime = true;

let [lapHour, lapMin, lapSec, lapCentiSec] = [0, 0, 0, 0];

function startTimer() {
  if (startButton.innerText === "Start") {
    startButton.innerText = "Stop";
    stopTime = false;
    timerCycle();
  } else if (startButton.innerText === "Stop") {
    startButton.innerText = "Start";
    stopTime = true;
  }
}

function timerCycle() {
  if (stopTime == false) {
    centisecond = parseInt(centisecond);
    sec = parseInt(sec);
    min = parseInt(min);
    hour = parseInt(hour);

    centisecond = centisecond + 1;

    if (centisecond == 100) {
      sec = sec + 1;
      centisecond = 0;
    }

    if (sec == 60) {
      min = min + 1;
      sec = 0;
    }

    if (min == 60) {
      hour = hour + 1;
      min = 0;
      sec = 0;
    }
    if (centisecond < 10 || centisecond == 0) {
      centisecond = "0" + centisecond;
    }

    if (sec < 10 || sec == 0) {
      sec = "0" + sec;
    }
    if (min < 10 || min == 0) {
      min = "0" + min;
    }
    if (hour < 10 || hour == 0) {
      hour = "0" + hour;
    }
    timer.innerHTML = `${hour}:${min}:${sec}:${centisecond}`;
    setLocalStorage(hour, min, sec, centisecond);
    setTimeout("timerCycle()", 10);
  }
}

function setLocalStorage(hour, min, sec, centisecond) {}

function lapTime() {
  const lapContainer = document.querySelector("#lapList");
  const laps = document.createElement("li");
  laps.className = "lap-time";

  if (timer.innerHTML === "00:00:00:00") {
    laps.innerHTML = "Please press start.";
    lapContainer.appendChild(laps);
  } else {
    const pressStart = Array.from(document.getElementsByClassName("lap-time"));

    pressStart.forEach((text) => {
      if (text.innerHTML === "Please press start.") {
        text.remove();
      }
    });
    lapNumber++;

    laps.innerHTML = `${lapNumber}:  ${timer.innerHTML}`;

    lapContainer.appendChild(laps);
  }
}

function resetTimer() {
  startButton.innerText = "Start";
  lapNumber = 0;
  const lapTimes = Array.from(document.getElementsByClassName("lap-time"));
  lapTimes.forEach((time) => {
    time.remove();
  });
  timer.innerHTML = "00:00:00:00";
  stopTime = true;
  centisecond = 0;
  sec = 0;
  min = 0;
  hour = 0;
}

document.querySelector("#startButton").addEventListener("click", () => {
  startTimer();
});

document.querySelector("#lapButton").addEventListener("click", () => {
  lapTime();
});

document.querySelector("#resetButton").addEventListener("click", () => {
  resetTimer();
});
