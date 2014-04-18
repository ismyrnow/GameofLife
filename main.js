(function ($, app) {
  'use strict';

  var ctx; // canvas 2d context
  var grid; // 2d array of 1's and 0's (live and dead)
  var bounds;
  var cellSize = 14;
  var gridSize = 25;

  $(init);

  function init() {
    // init canvas
    var canvas = document.getElementById('canvas');
    canvas.width = cellSize * gridSize + 2 * gridSize + 2;
    canvas.height = cellSize * gridSize + 2 * gridSize + 2;
    ctx = canvas.getContext('2d');
    drawGrid();

    // init bounds
    bounds = {
      xMin: 0,
      xMax: gridSize,
      yMin: 0,
      yMax: gridSize
    };

    // init grid
    grid = createGrid();

    // init pattern
    window.app.setPattern('acorn', grid);

    // start program

    var id;
    var count = 500;
    id = setInterval(function () {
      redraw();
      tick();
      if (count-- === 0) {
        clearInterval(id);
      }
    }, 200);
  }

  function createGrid() {
    var grid = new Array(bounds.xMax);

    for (var x = bounds.xMin - 1; x <= bounds.xMax + 1; x++) {
      grid[x] = new Array(bounds.yMax + 1);
      for (var y = bounds.yMin - 1; y <= bounds.yMax + 1; y++) {
        grid[x][y] = 0;
      }
    }

    return grid;
  }

  function tick() {
    var newGrid = createGrid();
    var newBounds = cloneBounds();

    forEachCell(function (x, y) {
      var alive = checkIsAlive(x, y);
      var neighbors = countLiveNeighbors(x, y);

      if (alive && neighbors < 2) {
        newGrid[x][y] = 0;
      } else if (alive && (neighbors === 2 || neighbors === 3)) {
        newGrid[x][y] = 1;
        extendBounds(newBounds, x, y);
      } else if (alive && neighbors > 3) {
        newGrid[x][y] = 0;
      } else if (!alive && neighbors === 3) {
        newGrid[x][y] = 1;
        extendBounds(newBounds, x, y);
      }
    });

    grid = newGrid;
    bounds = newBounds;
  }

  function countLiveNeighbors(x, y) {
    var n = 0;

    for (var dx = -1; dx < 2; dx++) {
      for (var dy = -1; dy < 2; dy++) {
        if (grid[x + dx] && grid[x + dx][y + dy]) {
          n += grid[x + dx][y + dy];
        }
      }
    }

    if (grid[x] && grid[x][y]) {
      n -= grid[x][y];
    }

    return n;
  }

  function cloneBounds() {
    var newBounds = {
      xMin: bounds.xMin,
      xMax: bounds.xMax,
      yMin: bounds.yMin,
      yMax: bounds.yMax
    };

    return newBounds;
  }

  function extendBounds(bounds, x, y) {
    bounds.xMin = Math.min(bounds.xMin, x);
    bounds.xMax = Math.max(bounds.xMax, x);
    bounds.yMin = Math.min(bounds.yMin, y);
    bounds.yMax = Math.max(bounds.yMax, y);
  }

  function redraw() {
    forEachCell(drawCell);
  }

  function checkIsAlive(x, y) {
    return grid[x] && grid[x][y] && grid[x][y] === 1;
  }

  function drawGrid() {
    var width = cellSize * gridSize + 2 * gridSize + 2;
    var height = cellSize * gridSize + 2 * gridSize + 2;

    ctx.fillStyle = 'rgb(200,200,200)';
    for (var x = 0; x <= (width - 2) / cellSize; x++) {
      // horizontal
      ctx.fillRect(
        0,
        (x * cellSize) + (x * 2),
        width,
        2
      );
      // vertical
      ctx.fillRect(
        (x * cellSize) + (x * 2),
        0,
        2,
        height
      );
    }
  }

  function drawCell(x, y) {
    var isAlive = checkIsAlive(x, y);
    ctx.fillStyle = isAlive ? 'rgb(0,0,0)' : 'rgb(255,255,255)';
    ctx.fillRect(x * cellSize + x * 2 + 2, y * cellSize + y * 2 + 2, cellSize, cellSize);
  }

  function forEachCell(fn) {
    for (var x = bounds.xMin - 1; x <= bounds.xMax + 1; x++) {
      for (var y = bounds.yMin - 1; y <= bounds.yMax + 1; y++) {
        fn(x, y);
      }
    }
  }

})(jQuery, window.app || {});
