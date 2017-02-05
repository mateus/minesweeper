import MapBuilder from './map-builder';
import { timer } from './timer';
import './hotkeys';
import 'whatwg-fetch';
import moment from 'moment';
import isAlpha from 'validator/lib/isAlpha';
import isLength from 'validator/lib/isLength';


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
    window.map = new MapBuilder(document.querySelector('[name="map-size"]:checked').value);
  }

  function persistPlayerInfo() {
    const playerName = document.querySelector('#form-name').value.trim();

    const data = JSON.stringify({
      name: playerName,
      level: document.querySelector('[name="map-size"]:checked').value,
      time: timer.seconds
    });

    if (isLength(playerName, {min: 1, max: 25}) && isAlpha(playerName)) {
      fetch('/api/save/player', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data
      }).then(function(response) {
        return response.json()
      }).then(function(json) {
        saveButton.disabled = 'disabled';
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      }).catch(function(ex) {
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      })
    } else {
      alert("Let's use only (a-zA-Z), please. I don't my database to be all messed up because of you!");
    }
  }

  function getPlayersInfo() {
    let countPlayersPerLevel = 0;
    let lastLevel = 'small';
    fetch('/api/get/players')
      .then(function(response) {
        return response.json()
      }).then(function(data) {
        data.forEach((player) => {
          if (lastLevel !== player.level) {
            lastLevel = player.level;
            countPlayersPerLevel = 0;
          }
          if (countPlayersPerLevel >= 5) { return };
          const smallRanking = document.querySelector('#ranking-' + player.level.toLowerCase());
          let li = document.createElement('li');
          let dataFormated = moment(player.date).format('lll');
          li.innerHTML = `<strong>${player.time}s</strong> ${player.name} <span>${dataFormated}</span>`;
          smallRanking.appendChild(li);
          countPlayersPerLevel++;
        });
        document.querySelector('.page__ranking-side').classList.add('page__ranking-side--loaded');
      }).catch(function(ex) {
        console.log('parsing failed', ex);
      });
  }
})();
