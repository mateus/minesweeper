export default class MapBuilder {
  constructor(level = 'medium') {
    // const wrapper = document.querySelector('.minesweeper');

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
        rows: 24,
        columns: 28,
        mines: 80,
      },
    }

    this.map = this.build(levels[level].rows,
                          levels[level].columns,
                          levels[level].mines);
    this.printMap(level);
  }

  build(rows, columns, totalMines) {
    let minePos = this.generateMinesArr(rows, columns, totalMines);

    let map = [];
    for (let r = 0; r < rows; r++) {
      map[r] = [];
      for (let c = 0; c < columns; c++) {
        map[r][c] = minePos.indexOf(`r${r}c${c}`) != -1 ? '*' : '0';
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
}
