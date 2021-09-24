// ça charge le javascript uniquement quand la page a entièrement chargé
window.onload=function() {
	var canvas = document.getElementById('zone'); // on récupère le canvas d'id zone dans html
	var ctx = canvas.getContext('2d'); // c'est expliqué là Julien : https://developer.mozilla.org/fr/docs/Web/API/Canvas_API/Tutorial/Basic_usage
	var intervalID = setInterval(jeu, 10); // vérification toutes les 10ms
	document.addEventListener("keydown", keyboard); // on écoute les events du clavier
}
function jeu() {
	// le plus gros du taff mdr
}
function keyboard(evt) {
	switch(evt.keyCode) {
	case 37: // à faire - tourner à gauche
	break;
	case 38: // à faire - monter
	break;
	case 39: // à faire - tourner à droite
	break;
	case 40: // à faire - descendre
	break;
	}
}