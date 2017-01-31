import MapBuilder from './map-builder';
import { timer } from './timer';
import './hotkeys';

(() => {
  let levelsNode = document.querySelectorAll('[name="map-size"]');
  let resetButton = document.querySelector('#reset');
  resetButton.onclick = updateLevel;

  updateLevel();
  levelsNode.forEach((level) => {
    level.addEventListener('change', () => {
      updateLevel();
    });
  });

  function updateLevel() {
    timer.clean();
    console.log('========== New Game ==========');
    let checkedLevel = document.querySelector('[name="map-size"]:checked').value;
    window.map = new MapBuilder(checkedLevel);
  }
})();
