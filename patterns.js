(function (app) {
  'use strict';

  app.setPattern = function (pattern, grid) {

    switch (pattern) {

      case 'toad':
        grid[1][1] = 1;
        grid[2][1] = 1;
        grid[3][1] = 1;
        grid[0][2] = 1;
        grid[1][2] = 1;
        grid[2][2] = 1;
        break;

      case 'flyer':
        grid[0][0] = 1;
        grid[0][2] = 1;
        grid[1][2] = 1;
        grid[1][1] = 1;
        grid[2][1] = 1;
        break;

      case 'acorn':
        grid[17][14] = 1;
        grid[19][15] = 1;
        grid[16][16] = 1;
        grid[17][16] = 1;
        grid[20][16] = 1;
        grid[21][16] = 1;
        grid[22][16] = 1;
        break;

    }

  };

})(window.app || {});
