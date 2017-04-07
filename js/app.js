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
      self = this;

      toggleLiveClass = function(event) {
        this.classList.toggle('live');

      };

      this.cells.forEach(function(e) {
        e.addEventListener('click', toggleLiveClass);
      });

      document.body.onmousedown = function() { //changing cells while mouse down
        self.cells.forEach(function(e) {
            e.addEventListener('mouseover', toggleLiveClass);
          });
      };

      document.body.onmouseup = function() {
        self.cells.forEach(function(e) {
            e.removeEventListener('mouseover', toggleLiveClass);
          });
      };
    };

    this.setCellState = function(x, y, state) {
      this.index(x, y).classList.add(state);
    };

    this.computeCellNextState = function(x, y) {

      var totalLiveNeighbours = 0;

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

      for (var i = 0; i < this.height; i++) {
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

    this.clearBoard = function() {
      this.cells.forEach(function(e) {
        e.classList.remove('live');
      });
    };

    this.firstGlider = function() {
      this.setCellState(4, 1, 'live');
      this.setCellState(5, 2, 'live');
      this.setCellState(5, 3, 'live');
      this.setCellState(4, 3, 'live');
      this.setCellState(3, 3, 'live');
    };

  }

  var goButton = document.querySelector('#go');
  goButton.addEventListener('click', function(event) {

    event.preventDefault();
    document.querySelector('.welcome').classList.add('hide');
    var userWidth = document.querySelector('#width').value;
    var userHeight = document.querySelector('#height').value;
    var game = new GameOfLife(userWidth, userHeight);
    game.createBoard();
    game.firstGlider();

    var playButton = document.querySelector('#play');
    playButton.addEventListener('click', function() {
      var generationInterval = setInterval(function() {
        game.printNextGeneration();
      }, 150);

      var pauseButton = document.querySelector('#pause');
      pauseButton.addEventListener('click', function() {
        clearInterval(generationInterval);
      });

      var clearButton = document.querySelector('#clear');
      clearButton.addEventListener('click', function() {
        clearInterval(generationInterval);
        game.clearBoard();
      });
    });

  });

});
