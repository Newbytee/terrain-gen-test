const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let terrain = []; // = [ 5, 9, 1, 3, 9, 3, 5, 3, 5, 7, 25 ];
terrain.length = 250;

setInterval(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    generateTerrain();
}, 500);

function generateTerrain() {
    for (let i = 0; i < terrain.length; i++) {
        terrain[i] = Math.random() * 20;
    }
    
    for (let i = 0; i < terrain.length; i++) {
        ctx.fillStyle = "#33FF33";
        ctx.fillRect(2 * i, canvas.height - 20 - terrain[i], 2, canvas.height);    
    }
}