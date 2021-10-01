var canvas = document.getElementById('canvas'); // on récupère le canvas d'id zone dans html
var contexte = canvas.getContext('2d'); // c'est expliqué là Julien : https://developer.mozilla.org/fr/docs/Web/API/Canvas_API/Tutorial/Basic_usage
var largeur = hauteur = 25;
var x = Math.trunc(canvas.height / 2);
var y = Math.trunc(canvas.width / 2);

var depX=depY=0;

// ça charge ce bout de code uniquement quand la page a entièrement chargé
window.onload=function() {
	var interval = setInterval(jeu, 500); // vérification toutes les 500ms
	document.addEventListener("keydown", clavier); // on écoute les events du clavier
}

function jeu() {
	// le plus gros du taff mdr
	x +=depX;
	y +=depY;
	contexte.clearRect(0, 0, canvas.width, canvas.height);
	contexte.fillStyle = "green";
	contexte.fillRect(x, y, largeur, hauteur);
}

function clavier(action) {
	switch(action.keyCode) {
	case 37: // à faire - tourner à gauche
	if(hist==39){break;}
	depX=-25;
	depY=0;
	hist=action.keyCode;
	break;
	case 38: // à faire - monter
	if(hist==40){break;}
	depX=0
	depY=-25
	hist=action.keyCode;
	break;
	case 39: // à faire - tourner à droite
	if(hist==37){break;}
	depX=25
	depY=0
	hist=action.keyCode;
	break;
	case 40: // à faire - descendre
	if(hist==38){break;}
	depX=0
	depY=25
	hist=action.keyCode;
	break;
	case 32: // à faire - espace
	depX=0
	depY=0
	break;
	}
}