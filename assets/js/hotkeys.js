import MapBuilder from './map-builder';
import { timer } from './timer';

class Hotkeys {
  constructor() {
    document.onkeypress = (e) => {
      var e = e || window.event;

      switch (e.code) {
        case 'KeyR':
        checkedLevel
          const checkedLevel = document.querySelector('[name="map-size"]:checked').value;
          this.changeLevel(checkedLevel);
          break;
        case 'Digit1':
          this.changeLevel('small');
          break;
        case 'Digit2':
          this.changeLevel('medium');
          break;
        case 'Digit3':
          this.changeLevel('large');
          break;
      }
    }
  }

  changeLevel(level) {
    timer.clean();
    console.log('========== New Game ==========');
    window.map = new MapBuilder(level);
    document.querySelector(`[value="${level}"]`).checked = true;
  }
}

new Hotkeys();
