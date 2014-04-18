/* global App:true */
(function () {
  'use strict';

  window.App = window.App || {};

  App.Grid = function (bounds) {

    this.bounds = bounds;
    this.grid = new Array(this.bounds.xMax); // 2d array of 1's and 0's (live and dead)

    for (var x = this.bounds.xMin - 1; x <= this.bounds.xMax + 1; x++) {
      this.grid[x] = new Array(this.bounds.yMax - this.bounds.yMin + 1);
      for (var y = this.bounds.yMin - 1; y <= this.bounds.yMax + 1; y++) {
        this.grid[x][y] = 0;
      }
    }

  };

  App.Grid.prototype.setAt = function (x, y, value) {
    this.grid[x][y] = value;

    if (value === 1) {
      // Potentially extend the bounds to include the new cell.
      this.bounds.xMin = Math.min(this.bounds.xMin, x);
      this.bounds.xMax = Math.max(this.bounds.xMax, x);
      this.bounds.yMin = Math.min(this.bounds.yMin, y);
      this.bounds.yMax = Math.max(this.bounds.yMax, y);
    }
  };

  App.Grid.prototype.setPattern = function (pattern) {

    switch (pattern) {

      case 'toad':
        this.grid[1][1] = 1;
        this.grid[2][1] = 1;
        this.grid[3][1] = 1;
        this.grid[0][2] = 1;
        this.grid[1][2] = 1;
        this.grid[2][2] = 1;
        break;

      case 'flyer':
        this.grid[0][0] = 1;
        this.grid[0][2] = 1;
        this.grid[1][2] = 1;
        this.grid[1][1] = 1;
        this.grid[2][1] = 1;
        break;

      case 'acorn':
        this.grid[17][14] = 1;
        this.grid[19][15] = 1;
        this.grid[16][16] = 1;
        this.grid[17][16] = 1;
        this.grid[20][16] = 1;
        this.grid[21][16] = 1;
        this.grid[22][16] = 1;
        break;

    }
  };

  App.Grid.prototype.forEachCell = function (fn) {
    for (var x = this.bounds.xMin - 1; x <= this.bounds.xMax + 1; x++) {
      for (var y = this.bounds.yMin - 1; y <= this.bounds.yMax + 1; y++) {
        fn(x, y);
      }
    }
  };

  App.Grid.prototype.checkIsAlive = function (x, y) {
    return this.grid[x] && this.grid[x][y] && this.grid[x][y] === 1;
  };

  App.Grid.prototype.countLiveNeighbors = function (x, y) {
    var n = 0;

    for (var dx = -1; dx < 2; dx++) {
      for (var dy = -1; dy < 2; dy++) {
        if (this.grid[x + dx] && this.grid[x + dx][y + dy]) {
          n += this.grid[x + dx][y + dy];
        }
      }
    }

    if (this.grid[x] && this.grid[x][y]) {
      n -= this.grid[x][y];
    }

    return n;
  };

})();
