(function ($, App) {
  'use strict';

  var ctx; // canvas 2d context
  var grid;
  var gridWidth, gridHeight;
  var CELL_SIZE = 22;
  var GRID_BORDER_WIDTH = 1;
  var BORDER_COLOR = 'rgb(255,255,255)';
  var CELL_COLOR_DEAD = 'rgb(255,255,255)';
  var CELL_COLOR_ALIVE = 'rgb(0,0,0)';

  $(init);

  function init() {
    var widthPx = window.innerWidth;
    var heightPx = window.innerHeight;
    gridWidth = Math.floor(widthPx / (CELL_SIZE + GRID_BORDER_WIDTH));
    gridHeight = Math.floor(heightPx / (CELL_SIZE + GRID_BORDER_WIDTH));

    // init canvas
    var canvas = document.getElementById('canvas');
    canvas.width = widthPx;
    canvas.height = heightPx;
    ctx = canvas.getContext('2d');
    drawGrid();

    // init grid
    grid = new App.Grid({
      xMin: 0,
      xMax: gridWidth,
      yMin: 0,
      yMax: gridHeight
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
    }, 80);
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
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;

    ctx.fillStyle = BORDER_COLOR;

    // horizontal lines
    for (var y = 0; y <= gridHeight; y++) {
      ctx.fillRect(
        0,
        y * (CELL_SIZE + GRID_BORDER_WIDTH),
        width,
        GRID_BORDER_WIDTH
      );
    }

    // vertical lines
    for (var x = 0; x <= gridWidth; x++) {
      ctx.fillRect(
        x * (CELL_SIZE + GRID_BORDER_WIDTH),
        0,
        GRID_BORDER_WIDTH,
        height
      );
    }
  }

  function drawCell(x, y) {
    var isAlive = grid.checkIsAlive(x, y);
    var canvasX = (x * CELL_SIZE) + (x * GRID_BORDER_WIDTH) + GRID_BORDER_WIDTH;
    var canvasY = (y * CELL_SIZE) + (y * GRID_BORDER_WIDTH) + GRID_BORDER_WIDTH;
    ctx.fillStyle = isAlive ? CELL_COLOR_ALIVE : CELL_COLOR_DEAD;
    ctx.fillRect(canvasX, canvasY, CELL_SIZE, CELL_SIZE);
  }

})(jQuery, window.App || {});
