import MapBuilder from './map-builder';
import { timer } from './timer';
import './hotkeys';
import 'whatwg-fetch';
import moment from 'moment';

(() => {
  const levelsNode = document.querySelectorAll('[name="map-size"]');
  const resetButton = document.querySelector('#reset');
  const saveButton = document.querySelector('#save');
  resetButton.onclick = updateLevel;
  saveButton.onclick = persistPlayerInfo;
  getPlayersInfo();

  updateLevel();
  levelsNode.forEach((level) => {
    level.addEventListener('change', () => {
      updateLevel();
    });
  });

  function updateLevel() {
    timer.clean();
    console.log('========== New Game ==========');
    const checkedLevel = document.querySelector('[name="map-size"]:checked').value;
    window.map = new MapBuilder(checkedLevel);
  }

  function persistPlayerInfo() {
    const data = JSON.stringify({
      name: 'Mateus Ferreira',
      level: 'Medium',
      time: 30,
      country: 'Brazil'
    });

    fetch('/api/save/player', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    }).then(function(response) {
      return response.json()
    }).then(function(json) {
      console.log('DEU BOM');
    }).catch(function(ex) {
      console.log('DEU RUIM');
    })
  }

  function getPlayersInfo() {
    fetch('/api/get/players')
      .then(function(response) {
        return response.json()
      }).then(function(data) {
        data.forEach((player) => {
          const smallRanking = document.querySelector('#ranking-' + player.level.toLowerCase());
          let li = document.createElement('li');
          let dataFormated = moment(player.date).format('lll');
          li.innerHTML = `<strong>${player.time}s</strong> ${player.name} <span>${dataFormated}</span>`;
          smallRanking.appendChild(li);
        });
        document.querySelector('.page__ranking-side').classList.add('page__ranking-side--loaded');
      }).catch(function(ex) {
        console.log('parsing failed', ex);
      });
  }
})();
