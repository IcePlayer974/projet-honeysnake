/* var c1=doculent.getElementById("zone")
ci.strokeStyle = 'rgb
var pinceau=c1;getContext("2d);

ci.strokeStyle = 'blue';
pinceau.moveTo(0,50);
pinceau.lineTo(c1.width, 50);
pinceau.stroke(); */


var ctx = document.getElementById('zone').getContext('2d');

for (var i = 0; i < 6; i++) {
  for (var j = 0; j < 6; j++) {
    ctx.strokeStyle = 'rgb(0,' + Math.floor(255 - 42.5 * i) + ',' +
                      Math.floor(255 - 42.5 * j) + ')';
    ctx.beginPath();
    ctx.arc(12.5 + j * 25, 12.5 + i * 25, 10, 0, Math.PI * 2, true);
    ctx.stroke();
  }
}