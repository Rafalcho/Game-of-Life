document.addEventListener('DOMContentLoaded', function() {

  function GameOfLife(boardWidth, boardHeight) {

    this.width = boardWidth;
    this.height = boardHeight;
    this.board = document.querySelector('#board');
    this.cells = [];
    this.createBoard = function() {

      this.board.style.width = this.width * 10 + 'px';
      this.board.style.height = this.height + 10 + 'px';

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

  }

  var game = new GameOfLife(10,10);
  game.createBoard();

});
