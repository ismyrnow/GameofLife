(function () {
  'use strict';

  function GameOfLife(width, height, pattern) {
    // init grid
    this.grid = new App.Grid({
      xMin: 0,
      xMax: width,
      yMin: 0,
      yMax: height
    });

    // init pattern
    this.grid.setPattern(pattern);
  }

  GameOfLife.prototype.forEachCell = function(fn) {
    var grid = this.grid;
    grid.forEachCell(function(x, y) {
      fn(x, y, grid.checkIsAlive(x, y));
    });
  };

  GameOfLife.prototype.tick = function() {
    var grid = this.grid;
    var newGrid = new App.Grid(grid.bounds);

    grid.forEachCell(function (x, y) {
      var alive = grid.checkIsAlive(x, y);
      var neighbors = grid.countLiveNeighbors(x, y);

      if (alive && neighbors < 2) {
        newGrid.setAt(x, y, 0);
      } else if (alive && (neighbors === 2 || neighbors === 3)) {
        newGrid.setAt(x, y, 1);
      } else if (alive && neighbors > 3) {
        newGrid.setAt(x, y, 0);
      } else if (!alive && neighbors === 3) {
        newGrid.setAt(x, y, 1);
      }
    });

    this.grid = newGrid;
  };

  App.GameOfLife = GameOfLife;

})();
