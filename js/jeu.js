var canvas = document.getElementById('canvas'); // on récupère le canvas d'id zone dans html
var contexte = canvas.getContext('2d'); // c'est expliqué là Julien : https://developer.mozilla.org/fr/docs/Web/API/Canvas_API/Tutorial/Basic_usage
var largeur = hauteur = 25;
var x = Math.trunc(canvas.height / 2);
var y = Math.trunc(canvas.width / 2);
var depX = depY = 0;
var trace = [];
var tailleTrace = tailleInitTrace = 10;
var i;

// ça charge ce bout de code uniquement quand la page a entièrement chargé
window.onload=function() {
	var interval = setInterval(jeu, 500); // vérification toutes les 500ms
	document.addEventListener("keydown", clavier); // on écoute les events du clavier
}

function jeu() {
	// le plus gros du taff mdr
	x += depX;
	y += depY;
	trace.push({x:x, y:y}); // on met x et y dans le tableau
	while (trace.length>tailleTrace) { // tant que le tableau (la trace) dépasse la taille max
		// on en enlève un
		trace.shift();
	}
	contexte.clearRect(0, 0, canvas.width, canvas.height); // clear le canvas avant de rafficher le serpent ayant avancé
	contexte.fillStyle = "green";
	for (i = 0; i < trace.length; i++) {
		contexte.fillRect(trace[i].x, trace[i].y, largeur, hauteur);
	}
}

function clavier(action) {
	switch(action.keyCode) {
	case 37: // à faire - tourner à gauche
	depX = -25;
	depY = 0;
	break;
	case 38: // à faire - monter
	depX = 0;
	depY = -25;
	break;
	case 39: // à faire - tourner à droite
	depX = 25;
	depY = 0;
	break;
	case 40: // à faire - descendre
	depX = 0;
	depY = 25;
	break;
	case 32: // à faire - espace
	depX = 0;
	depY = 0;
	break;
	}
}