/* var c1=doculent.getElementById("zone")
ci.strokeStyle = 'rgb
var pinceau=c1;getContext("2d);

ci.strokeStyle = 'blue';
pinceau.moveTo(0,50);
pinceau.lineTo(c1.width, 50);
pinceau.stroke(); */


var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

for (var i = 0; i < 600; i++) {
	ctx.strokeStyle = 'blue'; 
	ctx.strokeRect(0,i*25, 600, 0); // ligne honrizontal : cote 1= decalage sur x/ la 2 sur y / la 3 taille du trace sur x / idem sur y
	ctx.strokeStyle = 'black';
	ctx.strokeRect(i*25,0,0, 600); // ligne vertical 
}
