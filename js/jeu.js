var canvas = document.getElementById('canvas'); // on récupère le canvas d'id zone dans html
var contexte = canvas.getContext('2d'); // c'est expliqué là Julien : https://developer.mozilla.org/fr/docs/Web/API/Canvas_API/Tutorial/Basic_usage
var largeur = hauteur = 25;
var x = Math.trunc(canvas.height / 2);
var y = Math.trunc(canvas.width / 2);
var depX = depY = 0;
var trace = [];
var tailleTrace = 10; // à changer plus tard
var sautTrace = 2; // à changer plus tard
var tailleMaxTrace = 1000; // à changer plus tard
var hist;
var compteBoucle = 0;
var sautBoucle = 10;
var i;

// ça charge ce bout de code uniquement quand la page a entièrement chargé
window.onload=function() {
	var interval = setInterval(jeu, 500); // vérification toutes les 500ms
	document.addEventListener("keydown", keyboard); // on écoute les events du keyboard
}

function jeu() {
	// le plus gros du taff mdr
	x += depX;
	y += depY;
	// on augmente tailleTrace toutes les secondes, 100 boucles
	if ((tailleTrace <= tailleMaxTrace) && ((depX != 0) || (depY != 0))) {
		if ((compteBoucle++)%100 == 1) {
			sautBoucle--;
			if (sautBoucle < 0) {
				tailleTrace += sautTrace;
			}
		}
	}
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

function keyboard(evt) {
	switch(evt.keyCode) {
	case 37:
	// touche gauche
	if (hist == 39) { break; }
	hist = 37;
	depX = -25;
	depY = 0;
	break;
	case 38:
	// touche haut
	if (hist == 40) { break; }
	hist = 38;
	depX = 0;
	depY = -25;
	break;
	case 39:
	// touche droite
	if (hist == 37) { break; }
	hist = 39;
	depX = 25;
	depY = 0;
	break;
	case 40:
	// touche bas
	if (hist == 38) { break; }
	hist = 40;
	depX = 0;
	depY = 25;
	break;
	case 32:
	// touche espace pour pause
	depX = 0;
	depY = 0;
	break;
	}
}