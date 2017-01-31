!function(e){function t(n){if(i[n])return i[n].exports;var s=i[n]={exports:{},id:n,loaded:!1};return e[n].call(s.exports,s,s.exports,t),s.loaded=!0,s.exports}var i={};return t.m=e,t.c=i,t.p="",t(0)}([function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}var s=i(1),r=n(s),o=i(2),a=n(o);new r.default("small"),new a.default},function(e,t){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),s=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"medium";i(this,e);var n={small:{rows:15,columns:12,mines:15},medium:{rows:16,columns:20,mines:40},large:{rows:18,columns:28,mines:80}};this.BLOCK_CLASSES={BASE:"minesweeper__block",STATES:{OPEN:"minesweeper__block--open",RED:"minesweeper__block--red",GREEN:"minesweeper__block--green",FLAG:"minesweeper__block--flag",BOMB:"minesweeper__block--bomb",FIRST_BOMB:"minesweeper__block--first-bomb"}},this.gameOver=!1,this.wrapper=document.querySelector(".minesweeper"),this.wrapper.classList.add("minesweeper--"+t),this.flagsArr=[],this.mineArr=this.generateMinesArr(n[t].rows,n[t].columns,n[t].mines),this.map=this.build(n[t].rows,n[t].columns,n[t].mines),this.printMap(t),this.renderMap()}return n(e,[{key:"build",value:function(e,t,i){for(var n=[],s=0;s<e;s++){n[s]=[];for(var r=0;r<t;r++)n[s][r]=this.mineArr.indexOf("r"+s+"c"+r)!==-1?"*":"0"}return n=this.setValuesForEachPosition(n)}},{key:"setValuesForEachPosition",value:function(e){for(var t=e.length,i=e[0].length,n=0,s=0;s<t;s++)for(var r=0;r<i;r++)n=0,s>0&&r>0&&"*"===e[s-1][r-1]&&n++,s>0&&"*"===e[s-1][r]&&n++,s>0&&r<i&&"*"===e[s-1][r+1]&&n++,r>0&&"*"===e[s][r-1]&&n++,r<i&&"*"===e[s][r+1]&&n++,r>0&&s<t-1&&"*"===e[s+1][r-1]&&n++,s<t-1&&"*"===e[s+1][r]&&n++,r<i&&s<t-1&&"*"===e[s+1][r+1]&&n++,"*"!=e[s][r]&&(e[s][r]=n);return e}},{key:"generateMinesArr",value:function(e,t,i){for(var n=[],s=void 0,r=void 0,o=0;o<i;o++){for(s=this.getRandom(0,e),r=this.getRandom(0,t);n.indexOf("r"+s+"c"+r)!==-1;)s=this.getRandom(0,e),r=this.getRandom(0,t);n.push("r"+s+"c"+r)}return n}},{key:"printMap",value:function(e){console.log("Level: "+e),console.log(this.map.join("\n"))}},{key:"getRandom",value:function(e,t){return Math.floor(Math.random()*(t-e))+e}},{key:"renderMap",value:function(){for(var e=this.map.length,t=this.map[0].length,i=void 0,n=0;n<e;n++)for(var s=0;s<t;s++)i=document.createElement("div"),i.classList.add(this.BLOCK_CLASSES.BASE),i.dataset.position="r"+n+"c"+s,i.onclick=this.blockClick.bind(this,i),i.oncontextmenu=this.blockRightClick.bind(this,i),this.wrapper.appendChild(i)}},{key:"blockClick",value:function(e){var t=this.getElementPosition(e),i=t.row,n=t.column;this.map[i][n];this.openSingleBlock(i,n,e)}},{key:"blockRightClick",value:function(e,t){t.preventDefault();var i=this.getElementPosition(e),n=i.row,s=i.column;if(!this.isGameOver())if(e.classList.contains(this.BLOCK_CLASSES.STATES.OPEN)||e.classList.contains(this.BLOCK_CLASSES.STATES.FLAG))e.classList.contains(this.BLOCK_CLASSES.STATES.OPEN)||(e.classList.remove(this.BLOCK_CLASSES.STATES.FLAG),e.querySelector("span").remove(),this.flagsArr.splice(this.flagsArr.indexOf("r"+n+"c"+s),1));else{var r=document.createElement("span"),o=document.createElement("i");o.classList.add("fa"),o.classList.add("fa-flag"),r.appendChild(o),e.classList.add(this.BLOCK_CLASSES.STATES.FLAG),e.appendChild(r),this.flagsArr.push("r"+n+"c"+s)}}},{key:"getElementPosition",value:function(e){var t=e.dataset.position,i=t.substring(1,t.indexOf("c")),n=t.substring(t.indexOf("c")+1,t.length);return{row:i,column:n}}},{key:"isGameOver",value:function(){return this.gameOver}},{key:"openSingleBlock",value:function(e,t,i){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{firstBomb:!0},s=this.map[e][t],r=parseInt(s);if(!(i.classList.contains(this.BLOCK_CLASSES.STATES.OPEN)||i.classList.contains(this.BLOCK_CLASSES.STATES.FLAG)||this.isGameOver()&&n.firstBomb)){i.classList.add(this.BLOCK_CLASSES.STATES.OPEN);var o=document.createElement("span");if(r)o.textContent=s;else if("*"===s){var a=document.createElement("i");a.classList.add("fa"),a.classList.add("fa-bomb"),o.appendChild(a),i.classList.add(this.BLOCK_CLASSES.STATES.BOMB),n.firstBomb&&(this.gameOver=!0,console.log("== Game Over =="),i.classList.add(this.BLOCK_CLASSES.STATES.FIRST_BOMB),this.reviewAllBombs())}r&&2===parseInt(s)?i.classList.add(this.BLOCK_CLASSES.STATES.GREEN):r&&parseInt(s)>2&&i.classList.add(this.BLOCK_CLASSES.STATES.RED),i.appendChild(o)}}},{key:"reviewAllBombs",value:function(){for(var e=void 0,t=void 0,i=void 0,n=0;n<this.mineArr.length;n++)t=this.mineArr[n].substring(1,this.mineArr[n].indexOf("c")),i=this.mineArr[n].substring(this.mineArr[n].indexOf("c")+1,this.mineArr[n].length),e=document.querySelector('[data-position="r'+t+"c"+i+'"]'),this.openSingleBomb(t,i,e,n)}},{key:"openSingleBomb",value:function(e,t,i,n){setTimeout(this.openSingleBlock.bind(this,e,t,i,{firstBomb:!1}),50*n)}}]),e}();t.default=s},function(e,t){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var n=function e(){i(this,e)};t.default=n}]);