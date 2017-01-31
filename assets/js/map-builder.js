export default class MapBuilder {
  constructor(level = 'medium') {
    const levels = {
      'small': {
        rows: 15,
        columns: 12,
        mines: 15,
      },
      'medium': {
        rows: 16,
        columns: 20,
        mines: 40,
      },
      'large': {
        rows: 18,
        columns: 28,
        mines: 80,
      },
    }

    this.wrapper = document.querySelector('.minesweeper');
    this.wrapper.classList.add(`minesweeper--${level}`);
    this.map = this.build(levels[level].rows,
                          levels[level].columns,
                          levels[level].mines);
    this.printMap(level);
    this.renderMap();
  }

  build(rows, columns, totalMines) {
    const minePos = this.generateMinesArr(rows, columns, totalMines);
    let map = [];

    for (let r = 0; r < rows; r++) {
      map[r] = [];
      for (let c = 0; c < columns; c++) {
        map[r][c] = minePos.indexOf(`r${r}c${c}`) != -1 ? '*' : '0';
      }
    }

    map = this.setValuesForEachPosition(map);
    return map;
  }

  setValuesForEachPosition(map) {
    const rows = map.length;
    const columns = map[0].length;
    let total = 0;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        total = 0;

        // Top left element
        if (r > 0 && c > 0 && map[r-1][c-1] == '*') { total++ }
        // Top element
        if (r > 0 && map[r-1][c] == '*') { total++ }
        // Top right element
        if (r > 0 && c < columns && map[r-1][c+1] == '*') { total++ }
        // Left element
        if (c > 0 && map[r][c-1] == '*') { total++ }
        // Right element
        if (c < columns && map[r][c+1] == '*') { total++ }
        // Bottom left element
        if (c > 0 && r < rows - 1 && map[r+1][c-1] == '*') { total++ }
        // Bottom element
        if (r < rows - 1 && map[r+1][c] == '*') { total++ }
        // Bottom right element
        if (c < columns && r < rows - 1 && map[r+1][c+1] == '*') { total++ }

        if (map[r][c] != '*') {
          map[r][c] = total;
        }
      }
    }

    return map;
  }

  generateMinesArr(rows, columns, totalMines) {
    let minePositions = [];
    let tempRow, tempCol;

    for (let i = 0; i < totalMines; i++) {
      tempRow = this.getRandom(0, rows);
      tempCol = this.getRandom(0, columns);

      while (minePositions.indexOf(`r${tempRow}c${tempCol}`) != -1) {
        tempRow = this.getRandom(0, rows);
        tempCol = this.getRandom(0, columns);
      }

      minePositions.push(`r${tempRow}c${tempCol}`);
    }

    return minePositions;
  }

  printMap(level) {
    console.log(`Level: ${level}`);
    console.log(this.map.join("\n"));
  }

  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  renderMap() {
    const rows = this.map.length;
    const columns = this.map[0].length;
    let block;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        block = document.createElement('div');
        block.classList.add('minesweeper__block');
        block.dataset.position = `r${r}c${c}`;
        block.onclick = this.blockClick.bind(this, block);
        this.wrapper.appendChild(block);
      }
    }
  }

  blockClick(block) {
    const positionAttr = block.dataset.position;
    const row = positionAttr.substring(1, positionAttr.indexOf('c'));
    const column = positionAttr.substring(positionAttr.indexOf('c') + 1, positionAttr.length);
    const blockValue = this.map[row][column];

    this.openSingleBlock(row, column, block);
  }

  openSingleBlock(row, column, block) {
    const blockValue = this.map[row][column];
    const isNumericBlock = parseInt(blockValue);

    if (!block.classList.contains('minesweeper__block--open')) {
      let spanWithValue = document.createElement('span');

      if (isNumericBlock) {
        spanWithValue.textContent = blockValue;
      } else if (blockValue == '*'){
        let bomb = document.createElement('i');
        bomb.classList.add('fa')
        bomb.classList.add('fa-bomb');
        spanWithValue.appendChild(bomb);
        block.classList.add('minesweeper__block--bomb');
      }

      block.classList.add('minesweeper__block--open');

      if (isNumericBlock && parseInt(blockValue) == 2) {
        block.classList.add('minesweeper__block--green');
      } else if (isNumericBlock && parseInt(blockValue) > 2) {
        block.classList.add('minesweeper__block--red');
      }

      block.appendChild(spanWithValue);
    }
  }
}
