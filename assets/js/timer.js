export default class Timer {
  constructor() {
    this.timerNode = document.querySelector('#timer');

    this.timer;
    this.timeRunning = false;
  }

  startTimer() {
    this.timeRunning = true;
    let seconds = 0;
    let secondsStr;

    ++seconds
    this.updateTimer(seconds);
    this.timer = setInterval(() => {
      ++seconds
      this.updateTimer(seconds);
    }, 1000);
  }

  stopTimer() {
    this.timeRunning = false;
    clearInterval(this.timer);
  }

  updateTimer(seconds) {
    const pad = '000';
    seconds = seconds + '';
    this.timerNode.textContent = pad.substring(0, pad.length - seconds.length) + seconds;
  }
}
