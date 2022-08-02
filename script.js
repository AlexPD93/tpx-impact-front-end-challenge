const timer = document.getElementById("stopwatch");
const startButton = document.getElementById("startButton");

let lapNumber = 0;

let [hour, min, sec, centisecond] = [0, 0, 0, 0];

let stopTime = true;

let [lapHour, lapMin, lapSec, lapCentiSec] = [0, 0, 0, 0];

let lapStringArray = [];

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
  if (stopTime === false) {
    // Set timings to numbers
    centisecond = parseInt(centisecond);
    sec = parseInt(sec);
    min = parseInt(min);
    hour = parseInt(hour);

    centisecond = centisecond + 1;

    if (centisecond === 100) {
      sec = sec + 1;
      centisecond = 0;
    }

    if (sec === 60) {
      min = min + 1;
      sec = 0;
    }

    if (min === 60) {
      hour = hour + 1;
      min = 0;
      sec = 0;
    }
    if (centisecond < 10 || centisecond === 0) {
      centisecond = "0" + centisecond;
    }

    if (sec < 10 || sec === 0) {
      sec = "0" + sec;
    }
    if (min < 10 || min === 0) {
      min = "0" + min;
    }
    if (hour < 10 || hour === 0) {
      hour = "0" + hour;
    }
    timer.innerHTML = `${hour}:${min}:${sec}:${centisecond}`;

    setTimeout("timerCycle()", 10);
  }
}

// function lapTime() {
//   const lapTimes = `${lapNumber}:  ${timer.innerHTML}`;

//   setLocalStorage("laps", lapTimes);
// }

function setLocalStorage(key, data) {
  console.log(data);
  // Parse turns a string into an object
  const lapTimes = JSON.parse(localStorage.getItem(key)) || [];
  lapTimes.push(data);

  // Stringify turns an object into a string.
  localStorage.setItem(key, JSON.stringify(lapTimes));
}

let lapTimesArray = [];

function displayLaps() {
  const lapContainer = document.querySelector("#lapList");
  const laps = document.createElement("li");
  laps.className = "lap-time";
  if (timer.innerHTML === "00:00:00:00") {
    laps.innerHTML = "Please press start.";
    lapContainer.appendChild(laps);
    return;
  } else {
    lapTimesArray.push(timer.innerHTML);
    const pressStart = Array.from(document.getElementsByClassName("lap-time"));
    pressStart.forEach((text) => {
      if (text.innerHTML === "Please press start.") {
        text.remove();
      }
    });
  }

  if (lapTimesArray.length === 1) {
    laps.textContent = `${lapNumber}: ${msToString(
      strToMillisecond(timer.innerHTML) - strToMillisecond("00:00:00:00")
    )}`;
    setLocalStorage("laps", laps.textContent);
  } else {
    for (let i = 1; i < lapTimesArray.length; i++) {
      laps.textContent = `${lapNumber}: ${msToString(
        strToMillisecond(lapTimesArray[i]) -
          strToMillisecond(lapTimesArray[i - 1])
      )}`;
    }
    setLocalStorage("laps", laps.textContent);
  }

  lapContainer.append(laps);
}

function strToMillisecond(s) {
  // Turns string from timer display into numbers. So they can be used for calculations.
  const splitStr = s.split(":");

  return (
    Number(splitStr[0]) * 3600000 +
    Number(splitStr[1] * 60000) +
    Number(splitStr[2] * 1000) +
    Number(splitStr[3])
  );
}

function msToString(ms) {
  // Making miliseconds more readable for the user.
  let hour = Math.floor(ms / 3600000);
  let min = Math.floor((ms / 3600000 - hour) * 60);
  let sec = Math.floor(((ms / 3600000 - hour) * 60 - min) * 60);
  let msec = Math.round(ms % 1000);

  let h = hour < 10 ? "0" + hour : hour;
  let m = min < 10 ? "0" + min : min;
  let s = sec < 10 ? "0" + sec : sec;
  let msecs = msec < 10 ? "0" + msec : msec;

  return h + ":" + m + ":" + s + ":" + msecs;
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLaps = JSON.parse(localStorage.getItem("laps"));
  const lapContainer = document.querySelector("#lapList");

  if (savedLaps) {
    savedLaps.forEach((lapTime) => {
      const laps = document.createElement("li");
      laps.innerHTML = lapTime;
      lapContainer.appendChild(laps);
    });
  } else {
    return;
  }
});

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

document.querySelector("#lapButton").addEventListener("click", (e) => {
  lapNumber++;
  displayLaps();
});

document.querySelector("#resetButton").addEventListener("click", () => {
  resetTimer();
  localStorage.removeItem("laps");
  document.getElementById("lapList").innerHTML = "";
});
