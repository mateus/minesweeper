!function(e){function t(i){if(n[i])return n[i].exports;var r=n[i]={exports:{},id:i,loaded:!1};return e[i].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}var r=n(1),s=i(r),o=n(3);n(5),function(){function e(){o.timer.clean(),console.log("========== New Game ==========");var e=document.querySelector('[name="map-size"]:checked').value;window.map=new s.default(e)}var t=document.querySelectorAll('[name="map-size"]'),n=document.querySelector("#reset");n.onclick=e,e(),t.forEach(function(t){t.addEventListener("change",function(){e()})})}()},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),s=n(3),o=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"medium";i(this,e);var n={small:{rows:15,columns:12,mines:15},medium:{rows:16,columns:20,mines:40},large:{rows:18,columns:28,mines:80}};this.BLOCK_CLASSES={BASE:"minesweeper__block",STATES:{OPEN:"minesweeper__block--open",RED:"minesweeper__block--red",GREEN:"minesweeper__block--green",FLAG:"minesweeper__block--flag",BOMB:"minesweeper__block--bomb",FIRST_BOMB:"minesweeper__block--first-bomb"}},this.gameOver=!1,this.firstClick=!0,s.timer.stopTimer(),this.wrapper=document.querySelector(".minesweeper"),this.wrapper.innerHTML="",this.wrapper.className="minesweeper",this.wrapper.classList.add("minesweeper--"+t),this.flagsArr=[],this.minesHiddenNode=document.querySelector("#mines-hidden"),this.minesHidden=n[t].mines,this.minesHiddenNode.textContent=this.minesHidden,this.minesArr=this.generateMinesArr(n[t].rows,n[t].columns,n[t].mines),this.map=this.build(n[t].rows,n[t].columns,n[t].mines),this.printMap(t),this.renderMap()}return r(e,[{key:"build",value:function(e,t,n){for(var i=[],r=0;r<e;r++){i[r]=[];for(var s=0;s<t;s++)i[r][s]=this.minesArr.indexOf("r"+r+"c"+s)!==-1?"*":"0"}return i=this.setValuesForEachPosition(i)}},{key:"setValuesForEachPosition",value:function(e){for(var t=e.length,n=e[0].length,i=0,r=0;r<t;r++)for(var s=0;s<n;s++)i=0,r>0&&s>0&&"*"===e[r-1][s-1]&&i++,r>0&&"*"===e[r-1][s]&&i++,r>0&&s<n&&"*"===e[r-1][s+1]&&i++,s>0&&"*"===e[r][s-1]&&i++,s<n&&"*"===e[r][s+1]&&i++,s>0&&r<t-1&&"*"===e[r+1][s-1]&&i++,r<t-1&&"*"===e[r+1][s]&&i++,s<n&&r<t-1&&"*"===e[r+1][s+1]&&i++,"*"!=e[r][s]&&(e[r][s]=i);return e}},{key:"generateMinesArr",value:function(e,t,n){for(var i=[],r=void 0,s=void 0,o=0;o<n;o++){for(r=this.getRandom(0,e),s=this.getRandom(0,t);i.indexOf("r"+r+"c"+s)!==-1;)r=this.getRandom(0,e),s=this.getRandom(0,t);i.push("r"+r+"c"+s)}return i}},{key:"printMap",value:function(e){console.log("Level: "+e),console.log("Mines: "+this.minesArr.length),console.log("Map: \n"+this.map.join("\n"))}},{key:"getRandom",value:function(e,t){return Math.floor(Math.random()*(t-e))+e}},{key:"renderMap",value:function(){for(var e=this.map.length,t=this.map[0].length,n=void 0,i=0;i<e;i++)for(var r=0;r<t;r++)n=document.createElement("div"),n.classList.add(this.BLOCK_CLASSES.BASE),n.dataset.position="r"+i+"c"+r,n.onclick=this.blockClick.bind(this,n),n.oncontextmenu=this.blockRightClick.bind(this,n),this.wrapper.appendChild(n)}},{key:"blockClick",value:function(e){this.firstClick&&(this.firstClick=!1,s.timer.startTimer());var t=this.getElementPosition(e),n=t.row,i=t.column;this.map[n][i];this.openSingleBlock(n,i,e)}},{key:"blockRightClick",value:function(e,t){t.preventDefault(),this.firstClick&&(this.firstClick=!1,s.timer.startTimer());var n=this.getElementPosition(e),i=n.row,r=n.column;if(!this.isGameOver())if(e.classList.contains(this.BLOCK_CLASSES.STATES.OPEN)||e.classList.contains(this.BLOCK_CLASSES.STATES.FLAG))e.classList.contains(this.BLOCK_CLASSES.STATES.OPEN)||(e.classList.remove(this.BLOCK_CLASSES.STATES.FLAG),e.querySelector("span").remove(),this.flagsArr.splice(this.flagsArr.indexOf("r"+i+"c"+r),1),this.minesHiddenNode.textContent=++this.minesHidden);else if(this.minesHidden>0){var o=document.createElement("span"),a=document.createElement("i");a.classList.add("fa"),a.classList.add("fa-flag"),o.appendChild(a),e.classList.add(this.BLOCK_CLASSES.STATES.FLAG),e.appendChild(o),this.flagsArr.push("r"+i+"c"+r),this.minesHiddenNode.textContent=--this.minesHidden}}},{key:"getElementPosition",value:function(e){var t=e.dataset.position,n=t.substring(1,t.indexOf("c")),i=t.substring(t.indexOf("c")+1,t.length);return{row:n,column:i}}},{key:"openSingleBlock",value:function(e,t,n){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{firstBomb:!0},r=this.map[e][t],s=parseInt(r);if(!(n.classList.contains(this.BLOCK_CLASSES.STATES.OPEN)||n.classList.contains(this.BLOCK_CLASSES.STATES.FLAG)||this.isGameOver()&&i.firstBomb)){n.classList.add(this.BLOCK_CLASSES.STATES.OPEN);var o=document.createElement("span");if(s)o.textContent=r;else if("*"===r){var a=document.createElement("i");a.classList.add("fa"),a.classList.add("fa-bomb"),o.appendChild(a),n.classList.add(this.BLOCK_CLASSES.STATES.BOMB),i.firstBomb&&(n.classList.add(this.BLOCK_CLASSES.STATES.FIRST_BOMB),this.reviewAllBombs())}s&&2===parseInt(r)?n.classList.add(this.BLOCK_CLASSES.STATES.GREEN):s&&parseInt(r)>2&&n.classList.add(this.BLOCK_CLASSES.STATES.RED),n.appendChild(o)}}},{key:"reviewAllBombs",value:function(){for(var e=void 0,t=void 0,n=void 0,i=0;i<this.minesArr.length;i++)t=this.minesArr[i].substring(1,this.minesArr[i].indexOf("c")),n=this.minesArr[i].substring(this.minesArr[i].indexOf("c")+1,this.minesArr[i].length),e=document.querySelector('[data-position="r'+t+"c"+n+'"]'),this.openSingleBomb(t,n,e,i);this.setGameOver()}},{key:"openSingleBomb",value:function(e,t,n,i){setTimeout(this.openSingleBlock.bind(this,e,t,n,{firstBomb:!1}),50*i)}},{key:"isGameOver",value:function(){return this.gameOver}},{key:"setGameOver",value:function(){return s.timer.stopTimer(),this.printTrollFace(),this.gameOver=!0}},{key:"printTrollFace",value:function(){var e="========== Game Over ==========\n░░░░░▄▄▄▄▀▀▀▀▀▀▀▀▄▄▄▄▄▄░░░░░░░░\n░░░░░█░░░░▒▒▒▒▒▒▒▒▒▒▒▒░░▀▀▄░░░░\n░░░░█░░░▒▒▒▒▒▒░░░░░░░░▒▒▒░░█░░░\n░░░█░░░░░░▄██▀▄▄░░░░░▄▄▄░░░░█░░\n░▄▀▒▄▄▄▒░█▀▀▀▀▄▄█░░░██▄▄█░░░░█░\n█░▒█▒▄░▀▄▄▄▀░░░░░░░░█░░░▒▒▒▒▒░█\n█░▒█░█▀▄▄░░░░░█▀░░░░▀▄░░▄▀▀▀▄▒█\n░█░▀▄░█▄░█▀▄▄░▀░▀▀░▄▄▀░░░░█░░█░\n░░█░░░▀▄▀█▄▄░█▀▀▀▄▄▄▄▀▀█▀██░█░░\n░░░█░░░░██░░▀█▄▄▄█▄▄█▄████░█░░░\n░░░░█░░░░▀▀▄░█░░░█░█▀██████░█░░\n░░░░░▀▄░░░░░▀▀▄▄▄█▄█▄█▄█▄▀░░█░░\n░░░░░░░▀▄▄░▒▒▒▒░░░░░░░░░░▒░░░█░\n░░░░░░░░░░▀▀▄▄░▒▒▒▒▒▒▒▒▒▒░░░░█░\n░░░░░░░░░░░░░░▀▄▄▄▄▄░░░░░░░░█░░\n";console.log(e)}}]),e}();t.default=o},,function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=function(){function e(){n(this,e),this.timerNode=document.querySelector("#timer"),this.timer,this.timeRunning=!1}return i(e,[{key:"clean",value:function(){this.timerNode.textContent="000"}},{key:"startTimer",value:function(){var e=this;this.timeRunning=!0;var t=0;++t,this.updateTimer(t),this.timer=setInterval(function(){++t,e.updateTimer(t)},1e3)}},{key:"stopTimer",value:function(){this.timeRunning=!1,clearInterval(this.timer)}},{key:"updateTimer",value:function(e){var t="000";e+="",this.timerNode.textContent=t.substring(0,t.length-e.length)+e}}]),e}();t.timer=new r},,function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),o=n(1),a=i(o),c=n(3),l=function(){function e(){var t=this;r(this,e),document.onkeypress=function(e){var e=e||window.event;switch(e.code){case"KeyR":var n=document.querySelector('[name="map-size"]:checked').value;t.changeLevel(n);break;case"Digit1":t.changeLevel("small");break;case"Digit2":t.changeLevel("medium");break;case"Digit3":t.changeLevel("large")}}}return s(e,[{key:"changeLevel",value:function(e){c.timer.clean(),console.log("========== New Game =========="),window.map=new a.default(e),document.querySelector('[value="'+e+'"]').checked=!0}}]),e}();new l}]);