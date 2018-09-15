"use strict";

//https://www.google.se/search?q=perlin+noise&rlz=1CAHPZV_enSE813&oq=perlin+&aqs=chrome.1.69i57j0l5.8461j0j1&sourceid=chrome&ie=UTF-8
//https://www.google.se/search?rlz=1CAHPZV_enSE813&ei=JCmaW8-GNIHIwAKCh4u4Bg&q=simplex+noise&oq=simplex+noise&gs_l=psy-ab.3..0i67k1l3j0j0i67k1j0l5.88801.89835.0.90352.9.8.0.0.0.0.146.760.1j5.6.0....0...1c.1.64.psy-ab..5.4.560...0i7i30k1.0.ji9YZe0He9k
//https://en.wikipedia.org/wiki/OpenSimplex_noise

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let terrain = []; // = [ 5, 9, 1, 3, 9, 3, 5, 3, 5, 7, 25 ];
let entities = [];
let viewportX = 0;
let viewportY = 0;
terrain.length = 350;
ctx.imageSmoothingEnabled = false;
generateTerrain();

setInterval(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTerrain();
}, 50);

function generateTerrain() {
    for (let i = 0; i < terrain.length; i++) {
        terrain[i] = generateTerrainPos(i);
    }
}

function generateTerrainMore(nBlocks) {
    terrain.length = terrain.length + nBlocks;
    for (let i = 0; i < terrain.length; i++) {
        if (typeof terrain[i] === "undefined") {
            terrain[i] = generateTerrainPos(i);
        }
    }
}

function generateTerrainPos(pos) {
    if (pos === 0) {
        return Math.random() * 50;
    } else {
        const randomNumber = Math.random();
        let sign;
        if (Math.random() < 0.5/* || terrain[pos - 1] > 200*/) {
            sign = -1;
        } else {
            sign = 1;
        }
        if (randomNumber < 0.1) {
            addEntity("tree", pos);
        } else if (randomNumber < 0.15) {
            addEntity("bush", pos);
        }
        return Math.random() * 3 * sign + terrain[pos - 1];
    }
}

function drawTerrain() {
    ctx.fillStyle = "#000FFF";
    ctx.fillRect(0, canvas.height - 20 + viewportY, canvas.width, canvas.height);
    for (let i = viewportX; i < terrain.length + viewportX; i++) {
        ctx.fillStyle = "#077607";
        //console.log(i);
        //if (typeof terrain[i] === "undefined") '
        //generateTerrainPos(i);
        ctx.fillRect(2 * (i - viewportX), canvas.height - 20 - terrain[i] + viewportY, 2, canvas.height);
        for (let j = 0; j < entities.length; j++) {
            if (entities[j].x === i) {
                if (terrain[i] > 0) {
                    if (entities[j].type === "tree") drawTree(i);
                    if (entities[j].type === "bush") drawBush(i);
                } else if (terrain[i] < -10) {
                    drawAlga(i);
                }
            }
        }
    }
}

function drawTree(treeX) {
    ctx.fillStyle = "#8c2a06";
    ctx.fillRect(2 * (treeX - viewportX), canvas.height - 20 - terrain[treeX] + viewportY, 2, -20);
    ctx.fillStyle = "#00FF00";
    ctx.beginPath();
    ctx.arc(2 * (treeX - viewportX) + 1, canvas.height - 40 - terrain[treeX] + viewportY, 10, 0, 2 * Math.PI);
    ctx.fill();
}

function drawBush(bushX) {
    ctx.fillStyle = "#00FF00";
    ctx.beginPath();
    ctx.arc(2 * (bushX - viewportX) + 1, canvas.height - 21 - terrain[bushX] + viewportY, 4, 0, 2 * Math.PI);
    ctx.fill();
}

function drawAlga(algaX) {
    ctx.fillStyle = "#00FF00";
    /*ctx.beginPath();
    ctx.arc(2 * (algaX - viewportX) + 1, canvas.height - 20 - terrain[algaX] + viewportY, 4, 0, 2 * Math.PI);
    ctx.fill();*/
    ctx.fillRect(2 * (algaX - viewportX), canvas.height - 20 - terrain[algaX] + viewportY, 2, Math.random() - 5);
}

function addEntity(createdType, xCoord) {
    entities.push({type: createdType, x: xCoord});
}

document.addEventListener("keydown", function(event) {
    switch (event.code) {
        case "KeyR":
            entities.length = 0;
            generateTerrain();
            break;
        case "ArrowLeft":
            if (viewportX > 0) {
                viewportX--;
            }
            if (typeof terrain[viewportX + 200] === "undefined") {
                generateTerrainMore(viewportX - terrain.length + 200);
            }
            break;
        case "ArrowRight":
            viewportX++;
            if (typeof terrain[viewportX + 200] === "undefined") {
                generateTerrainMore(viewportX - terrain.length + 200);
}
            break;
        case "ArrowUp":
            viewportY++;
            break;
        case "ArrowDown":
            viewportY--;
            break;
    }
});