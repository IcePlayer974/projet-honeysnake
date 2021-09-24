var canvas = document.getElementById('canvas'); // on récupère le canvas d'id zone dans html
var contexte = canvas.getContext('2d'); // c'est expliqué là Julien : https://developer.mozilla.org/fr/docs/Web/API/Canvas_API/Tutorial/Basic_usage
var largeur = hauteur = 25;
var x = canvas.height / 2;
var y = canvas.width / 2;

// ça charge ce bout de code uniquement quand la page a entièrement chargé
window.onload=function() {
	var interval = setInterval(jeu, 1000); // vérification toutes les 20ms
	document.addEventListener("keydown", clavier); // on écoute les events du clavier
}

function jeu() {
	// le plus gros du taff mdr
	x += 25;
	contexte.fillStyle = "green";
	contexte.strokeStyle = "black";
	contexte.fillRect(x, y, largeur, hauteur);
	contexte.strokeRect(x + 1, y + 1, largeur - 1, hauteur - 1);
}

function clavier(action) {
	switch(action.keyCode) {
	case 37: // à faire - tourner à gauche
	break;
	case 38: // à faire - monter
	break;
	case 39: // à faire - tourner à droite
	break;
	case 40: // à faire - descendre
	break;
	case 32: // à faire - espace
	break;
	}
}