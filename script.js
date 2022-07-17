const timer = document.getElementById("stopwatch");
let lapNumber = 0;

let hour = 0;
let min = 0;
let sec = 0;
let milisecond = 0;
let stopTime = true;

function startTimer() {
  stopTime = false;
  timerCycle();
}

function stopTimer() {
  stopTime = true;
}

function timerCycle() {
  if (stopTime == false) {
    milisecond = parseInt(milisecond);
    sec = parseInt(sec);
    min = parseInt(min);
    hour = parseInt(hour);

    milisecond = milisecond + 1;

    if (milisecond == 100) {
      sec = sec + 1;
      milisecond = 0;
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
    if (milisecond < 10 || milisecond == 0) {
      milisecond = "0" + milisecond;
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
    timer.innerHTML = `${hour}:${min}:${sec}:${milisecond}`;
    setTimeout("timerCycle()", 10);
  }
}

function lapTime() {
  const lapContainer = document.getElementById("lapContainer");
  const lapDisplay = document.createElement("p");
  lapDisplay.className = "lap-time";

  lapNumber++;

  lapDisplay.innerHTML = `${lapNumber}: ${timer.innerHTML}`;
  lapContainer.appendChild(lapDisplay);
}

function clearLapHistory() {
  lapNumber = 0;
  const lapTimes = Array.from(document.getElementsByClassName("lap-time"));
  lapTimes.forEach((time) => {
    time.remove();
  });
}

function resetTimer() {
  lapNumber = 0;
  const lapTimes = Array.from(document.getElementsByClassName("lap-time"));
  lapTimes.forEach((time) => {
    time.remove();
  });
  timer.innerHTML = "00:00:00:00";
  stopTime = true;
  milisecond = 0;
  sec = 0;
  min = 0;
  hour = 0;
}
