document.addEventListener('DOMContentLoaded', function() {

  function GameOfLife(boardWidth, boardHeight) {

    this.width = boardWidth;
    this.height = boardHeight;
    this.board = document.querySelector('#board');
    this.cells = [];
    this.index = function(x, y) {
      var position = x + y * this.width;
      return this.cells[position];
    };
    this.createBoard = function() {

      this.board.style.width = this.width * 10 + 'px';
      this.board.style.height = this.height * 10 + 'px';

      var numberOfFields = this.height * this.width;

      for (var i = 0; i < numberOfFields; i++) {
        var newDiv = document.createElement('div');
        this.board.appendChild(newDiv);
      }

      this.cells = Array.from(document.querySelectorAll('#board div'));
      this.cells.forEach(function(e) {
        e.addEventListener('click', function() {
          this.classList.toggle('live');

        });
      });

    };

    this.setCellState = function(x, y, state) {
      this.index(x, y).classList.add(state);
    };

    this.computeCellNextState = function(x, y) {

      var totalLiveNeighbours = 0;

      // console.log(this.index(x - 1, y - 1).classList);
      // console.log(this.index(x + 1, y + 1).classList);
      if (this.index(x - 1, y - 1) !== undefined && this.index(x - 1, y - 1).classList.contains('live')) {
        totalLiveNeighbours++;
      }

      if (this.index(x, y - 1) !== undefined && this.index(x, y - 1).classList.contains('live')) {
        totalLiveNeighbours++;
      }

      if (this.index(x + 1, y - 1) !== undefined && this.index(x + 1, y - 1).classList.contains('live')) {
        totalLiveNeighbours++;
      }

      if (this.index(x - 1, y) !== undefined && this.index(x - 1, y).classList.contains('live')) {
        totalLiveNeighbours++;
      }

      if (this.index(x + 1, y) !== undefined && this.index(x + 1, y).classList.contains('live')) {
        totalLiveNeighbours++;
      }

      if (this.index(x - 1, y + 1) !== undefined && this.index(x - 1, y + 1).classList.contains('live')) {
        totalLiveNeighbours++;
      }

      if (this.index(x, y + 1) !== undefined && this.index(x, y + 1).classList.contains('live')) {
        totalLiveNeighbours++;
      }

      if (this.index(x + 1, y + 1) !== undefined && this.index(x + 1, y + 1).classList.contains('live')) {
        totalLiveNeighbours++;
      }

      if (this.index(x, y).classList.contains('live')) {
        if (totalLiveNeighbours === 2 || totalLiveNeighbours === 3) {
          return 1;
        } else {
          return 0;
        }
      } else {
        if (totalLiveNeighbours === 3) {
          return 1;
        } else {
          return 0;
        }
      }

    };

    this.nextGeneration = [];

    this.computeNextGeneration = function() {

      for (var i = 0; i < this.width; i++) {
        for (var j = 0; j < this.width; j++) {
          this.nextGeneration.push(this.computeCellNextState(j, i));

        }
      }

    };

    this.printNextGeneration = function() {
      this.computeNextGeneration();

      for (var i = 0; i < this.nextGeneration.length; i++) {
        if (this.nextGeneration[i] === 1) {
          this.cells[i].classList.add('live');
        } else if (this.nextGeneration[i] === 0) {
          this.cells[i].classList.remove('live');
        }
      }
      this.nextGeneration = [];
    };

    this.firstGlider = function() {
      this.setCellState(0, 0, 'live');
      this.setCellState(1, 0, 'live');
      this.setCellState(2, 0, 'live');
      this.setCellState(3, 0, 'live');
      this.setCellState(4, 0, 'live');
    };

  }

  var game = new GameOfLife(50,50);
  game.createBoard();
  // game.firstGlider();
  // game.computeNextGeneration();

  var playButton = document.querySelector('#play');
  playButton.addEventListener('click', function() {
    game.printNextGeneration();
  });

});
