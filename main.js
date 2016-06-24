(function (App) {
  'use strict';

  var ctx, game, gridWidth, gridHeight;
  var CELL_SIZE = 22;
  var GRID_BORDER_WIDTH = 1;
  var CELL_COLOR_DEAD = 'rgb(255,255,255)';
  var CELL_COLOR_ALIVE = 'rgb(0,0,0)';

  init();

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

    // start program
    game = new App.GameOfLife(gridWidth, gridHeight, 'acorn');

    var id;
    var count = 500;
    id = setInterval(function () {
      redraw();
      game.tick();
      if (count-- === 0) {
        clearInterval(id);
        ctx.fillStyle = 'rgba(255,255,255,.8)';
        ctx.fillRect(0,0,widthPx,heightPx);
      }
    }, 80);
  }

  function redraw() {
    game.forEachCell(drawCell);
  }

  function drawCell(x, y, isAlive) {
    var canvasX = (x * CELL_SIZE) + (x * GRID_BORDER_WIDTH) + GRID_BORDER_WIDTH;
    var canvasY = (y * CELL_SIZE) + (y * GRID_BORDER_WIDTH) + GRID_BORDER_WIDTH;
    ctx.fillStyle = isAlive ? CELL_COLOR_ALIVE : CELL_COLOR_DEAD;
    ctx.fillRect(canvasX, canvasY, CELL_SIZE, CELL_SIZE);
  }

})(window.App || {});
