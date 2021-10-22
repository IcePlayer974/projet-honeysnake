var canvas = document.getElementById("jeu");
var context = canvas.getContext("2d");
var jack = document.getElementById("");
var score = 0;
var grid = 16;
var count = 0;
  
var snake = {
	x: 160,
	y: 160,
  
  // snake velocity. moves one grid length every frame in either the x or y direction
	dx: grid,
	dy: 0,
  
  // keep track of all grids the snake body occupies
	cells: [],
  
  // length of the snake. grows when eating an apple
	maxCells: 4
};

var apple = {
	x: getRandomInt(0, 25) * grid,
	y: getRandomInt(0, 25) * grid
};

// suivre le score du joueur
function scoreJoueur() {
	score++;
	document.getElementById("scorehtml").innerHTML = score;
}

function resetScore() {
	score = 0;
	document.getElementById("scorehtml").innerHTML = score;
}

function gameover() {
	document.getElementById("gameover").cloneNode(true).play();
	alerteGameover();
}

function alerteGameover() {
	alert("GAME OVER\nVous avez tout votre temps pour battre le record du monde !");
	document.location.reload();
}

// get random whole numbers in a specific range
// @see https://stackoverflow.com/a/1527820/2124254
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// game loop
function loop() {
  requestAnimationFrame(loop);

  // slow game loop to 15 fps instead of 60 (60/15 = 4)
  if (++count < 8) {
    return;
  }

  count = 0;
  context.clearRect(0,0,canvas.width,canvas.height);

  // move snake by it's velocity
  snake.x += snake.dx;
  snake.y += snake.dy;

  // wrap snake position horizontally on edge of screen
  if (snake.x < 0) {
    snake.x = canvas.width - grid;
  }
  else if (snake.x >= canvas.width) {
    snake.x = 0;
  }
  
  // wrap snake position vertically on edge of screen
  if (snake.y < 0) {
    snake.y = canvas.height - grid;
  }
  else if (snake.y >= canvas.height) {
    snake.y = 0;
  }

  // keep track of where snake has been. front of the array is always the head
  snake.cells.unshift({x: snake.x, y: snake.y});

  // remove cells as we move away from them
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  // draw apple
  context.fillStyle = "red";
  context.fillRect(apple.x, apple.y, grid-1, grid-1);

  // draw snake one cell at a time
  context.fillStyle = "green";
  snake.cells.forEach(function(cell, index) {
    
    // drawing 1 px smaller than the grid creates a grid effect in the snake body so you can see how long it is
    context.fillRect(cell.x, cell.y, grid-1, grid-1);  

    // snake ate apple
    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;
	  document.getElementById("bouteille").cloneNode(true).play();
	  scoreJoueur();

      // canvas is 400x400 which is 25x25 grids 
      apple.x = getRandomInt(0, 25) * grid;
      apple.y = getRandomInt(0, 25) * grid;
    }

    // check collision with all cells after this one (modified bubble sort)
    for (var i = index + 1; i < snake.cells.length; i++) {
      
      // snake occupies same space as a body part. reset game
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = grid;
        snake.dy = 0;
		resetScore();
		gameover();

        apple.x = getRandomInt(0, 25) * grid;
        apple.y = getRandomInt(0, 25) * grid;
      }
    }
  });
}

// Ecoute des événements claviers (pour les flèches)
document.addEventListener("keydown", function(e) {
  
  /*
	On fait en sorte que le navigateur ne scroll pas
	la page quand on utilise les touches haut et bas.
	Jouer en ayant une page qui scroll toute seule,
	c'est pas fun.
  */
  e.preventDefault();
  
  // Eviter que le serpent puisse faire demi-tour sur lui-même
  // Flèche gauche
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  }
  // Flèche haut
  else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  }
  // Flèche droite
  else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  }
  // Flèche bas
  else if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});

// Démarrage du jeu
requestAnimationFrame(loop);