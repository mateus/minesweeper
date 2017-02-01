class Timer {
  constructor() {
    this.timerNode = document.querySelector('#timer');

    this.timer;
    this.seconds;
    this.timeRunning = false;
  }

  clean() {
    this.timerNode.textContent = '000';
  }

  startTimer() {
    this.timeRunning = true;
    this.seconds = 0;
    let secondsStr;

    ++this.seconds
    this.updateTimer(this.seconds);
    this.timer = setInterval(() => {
      ++this.seconds
      this.updateTimer(this.seconds);
    }, 1000);
  }

  stopTimer() {
    this.timeRunning = false;
    clearInterval(this.timer);
  }

  updateTimer(seconds) {
    const pad = '000';
    this.seconds = this.seconds + '';
    this.timerNode.textContent = pad.substring(0, pad.length - seconds.length) + this.seconds;
  }
}

export let timer = new Timer();
