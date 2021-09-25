var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

for (var i = 0; i < 600; i++) { // on a donc 24*24 case de 25pix
	ctx.strokeStyle = 'blue'; // #E9967A00 pour transparent
	ctx.strokeRect(0,i*25, 600, 0); // ligne honrizontal : cote 1= decalage sur x/ la 2 sur y / la 3 taille du trace sur x / idem sur y
	ctx.strokeStyle = 'black';
	ctx.strokeRect(i*25,0,0, 600); // ligne vertical 
}


/* Peut etre le faire en mode tableau genre
on a un tableau et quand on fait les different move sa fait case du tableau +1 / -1 / +1 ligne / -1 ligne ??jsp dit moi arthur
et tkt prochaine scance soit je t'aide sur le font soit je bosse la forme */ 