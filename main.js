(function ($, App) {
  'use strict';

  var ctx; // canvas 2d context
  var grid;
  var cellSize = 14;
  var gridSize = 25;
  var gridBorderWidth = 1;

  $(init);

  function init() {
    // init canvas
    var canvas = document.getElementById('canvas');
    canvas.width = cellSize * gridSize + gridBorderWidth * gridSize + gridBorderWidth;
    canvas.height = cellSize * gridSize + gridBorderWidth * gridSize + gridBorderWidth;
    ctx = canvas.getContext('2d');
    drawGrid();

    // init grid
    grid = new App.Grid({
      xMin: 0,
      xMax: gridSize,
      yMin: 0,
      yMax: gridSize
    });

    // init pattern
    grid.setPattern('acorn');

    // start program

    var id;
    var count = 500;
    id = setInterval(function () {
      redraw();
      tick();
      if (count-- === 0) {
        clearInterval(id);
      }
    }, 100);
  }

  function tick() {
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

    grid = newGrid;
  }

  function redraw() {
    grid.forEachCell(drawCell);
  }

  function drawGrid() {
    var width = (cellSize * gridSize) + (gridBorderWidth * gridSize) + gridBorderWidth;
    var height = (cellSize * gridSize) + (gridBorderWidth * gridSize) + gridBorderWidth;

    ctx.fillStyle = 'rgb(200,200,200)';
    for (var x = 0; x <= (width - 2) / cellSize; x++) {
      // horizontal
      ctx.fillRect(
        0,
        (x * cellSize) + (x * gridBorderWidth),
        width,
        gridBorderWidth
      );
      // vertical
      ctx.fillRect(
        (x * cellSize) + (x * gridBorderWidth),
        0,
        gridBorderWidth,
        height
      );
    }
  }

  function drawCell(x, y) {
    var isAlive = grid.checkIsAlive(x, y);
    var canvasX = (x * cellSize) + (x * gridBorderWidth) + gridBorderWidth;
    var canvasY = (y * cellSize) + (y * gridBorderWidth) + gridBorderWidth;
    ctx.fillStyle = isAlive ? 'rgb(0,0,0)' : 'rgb(255,255,255)';
    ctx.fillRect(canvasX, canvasY, cellSize, cellSize);
  }

})(jQuery, window.App || {});
