var canvas = document.getElementById("jeu");
var context = canvas.getContext("2d");
var jack = document.getElementById("jack");
var score = 0;
var highscore = 0;
var grille = 16;
var count = 0;
  
var snake = {
	// on centre à peu près le serpent au début du jeu
	x: 160,
	y: 160,
  
	// déplacement du serpent
	dx: grille,
	dy: 0,
  
	// tableau pour chaque case occupée par le corps du serpent
	cells: [],
  
	// la taille du serpent au début, ça doit augmenter à chaque point
	maxCells: 4
};

// on fait apparaître la bouteille aléatoirement dans le canvas au chargement de la page
var apple = {
	x: aleatoire(0, 25) * grille,
	y: aleatoire(1, 24) * grille // 1 24 au lieu de 0 25 pour éviter que la moitié de la bouteille soit hors du canvas
};

/*
on affiche le meilleur score stocké dans le navigateur au chargement de la page
!! comme la page sera reload à chaque gameover, on peut faire en sorte que
la fonction soit exécuté uniquement au chargement de la page !!
*/
window.onload = updateHighscore;

// suivre le score du joueur
function scoreJoueur() {
	score++;
	document.getElementById("scorehtml").innerHTML = score;
}

/* NORMALEMENT INUTILE après modif gameover
function resetScore() {
	score = 0;
	document.getElementById("scorehtml").innerHTML = score;
}
*/

function gameover() {
	/*
	document.getElementById("gameover").cloneNode(true).play();
	alert("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀GAME OVER\n\nVous avez tout votre temps pour battre le record du monde !");
	*/
	window.location.replace("over.html");
}

// fonction pour mettre à jour le highscore sur le HTML
function updateHighscore() {
	document.getElementById("hautscore").innerHTML = localStorage.getItem("highscore1");
}

/*
nombre aléatoire dans un intervalle spécifié
https://stackoverflow.com/a/1527820/2124254
*/
function aleatoire(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

// boucle pour faire tourner le jeu
function loop() {
	requestAnimationFrame(loop);
  
	/*
	Afficher le meilleur score stocké dans le navigateur sur la page HTML
	si et seulement si le score fait est supérieur au précédent highscore
	*/
	if (score > highscore) {
		highscore = score;
		localStorage.setItem("highscore1", highscore);
	}

	// on ralentit la boucle à 7.5 fps au lieu de 60 fps (rafraîchissement écran PC) -> (60/7.5 = 8)
	if (++count < 8) {
		return;
	}

	count = 0;
	context.clearRect(0, 0, canvas.width, canvas.height);

	// on déplace le snake
	snake.x += snake.dx;
	snake.y += snake.dy;

	// faire en sorte que le snake puisse passer les murs horizontaux de l'autre côté
	if (snake.x < 0) {
		snake.x = canvas.width - grille;
	}
	else if (snake.x >= canvas.width) {
		snake.x = 0;
	}
  
	// faire en sorte que le snake puisse passer les murs verticaux de l'autre côté
	if (snake.y < 0) {
		snake.y = canvas.height - grille;
	}
	else if (snake.y >= canvas.height) {
		snake.y = 0;
	}

	// on remplit le tableau avec le corps du snake
	snake.cells.unshift({x: snake.x, y: snake.y});

	// on retire certaines parties du tableau quand la queue avance
	if (snake.cells.length > snake.maxCells) {
		snake.cells.pop();
	}

	// dessiner la bouteille dans le canvas
	context.drawImage(jack, apple.x, apple.y, grille - 1, (2 * grille) - 1);

	// dessiner le snake un bout à la fois
	context.fillStyle = "green";
	snake.cells.forEach(function(cell, index) {

		// le dessiner 1 pixel en moins de côté permet de mieux le visualiser, on laisse un creux
		context.fillRect(cell.x, cell.y, grille - 1, grille - 1);

		// snake sur jack
		if ((cell.x === apple.x) && ((cell.y === apple.y) || (cell.y === apple.y + grille))) {
			snake.maxCells++;
			document.getElementById("bouteille").cloneNode(true).play();
			scoreJoueur();

			// canvas fait 400x400 soit grille de 25x25 
			apple.x = aleatoire(0, 25) * grille;
			apple.y = aleatoire(1, 24) * grille;
			
			while ((apple.x === snake.x) || (apple.x === cell.x)) {
				apple.x = aleatoire(0, 25) * grille;
			}
			while ((apple.y === snake.y) || ((apple.y + grille) === cell.y)) {
				apple.y = aleatoire(1, 24) * grille;
			}
		}

		// vérifier la collision avec la queue du serpent
		for (var i = index + 1; i < snake.cells.length; i++) {
		
			if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
				/* anciennement condition pour relancer la game
				inutile depuis la page gameover
				
				snake.x = 160;
				snake.y = 160;
				snake.cells = [];
				snake.maxCells = 4;
				snake.dx = grille;
				snake.dy = 0;
				gameover();
				resetScore();
				updateHighscore();

				apple.x = aleatoire(0, 25) * grille;
				apple.y = aleatoire(1, 24) * grille;
				*/
				gameover();
			}
			
		}
	});
}

// écoute des événements claviers (pour les flèches)
document.addEventListener("keydown", function(e) {
  
	/*
	on fait en sorte que le navigateur ne scroll pas
	la page quand on utilise les touches haut et bas.
	jouer en ayant une page qui scroll toute seule,
	c'est pas fun
	*/
	e.preventDefault();
  
	// éviter que le serpent puisse faire demi-tour sur lui-même
	// Flèche gauche
	if (e.which === 37 && snake.dx === 0) {
		snake.dx = -grille;
		snake.dy = 0;
	}
	// Flèche haut
	else if (e.which === 38 && snake.dy === 0) {
		snake.dy = -grille;
		snake.dx = 0;
	}
	// Flèche droite
	else if (e.which === 39 && snake.dx === 0) {
		snake.dx = grille;
		snake.dy = 0;
	}
	// Flèche bas
	else if (e.which === 40 && snake.dy === 0) {
		snake.dy = grille;
		snake.dx = 0;
	}
});

// lancement du jeu
requestAnimationFrame(loop);