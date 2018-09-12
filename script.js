"use strict";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let terrain = []; // = [ 5, 9, 1, 3, 9, 3, 5, 3, 5, 7, 25 ];
let entities = [];
let viewport = 0;
terrain.length = 350;
generateTerrain();

setInterval(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTerrain();
}, 100);

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
        let sign;
        if (Math.random() < 0.5 || terrain[pos - 1] > 200) {
            sign = -1;
        } else {
            sign = 1;
        }
        if (terrain[pos - 1] < 0) {
            sign = 1;
        }
        if (Math.random() < 0.1) {
            addEntity("tree", pos);
        }
        return Math.random() * 3 * sign + terrain[pos - 1];
    }
}

function drawTerrain() {
    ctx.fillStyle = "#000FFF";
    ctx.fillRect(0, canvas.height - 20, canvas.width, canvas.height);
    for (let i = viewport; i < terrain.length + viewport; i++) {
        ctx.fillStyle = "#00FF99";
        //console.log(i);
        //if (typeof terrain[i] === "undefined") '
        //generateTerrainPos(i);
        ctx.fillRect(2 * (i - viewport), canvas.height - 20 - terrain[i], 2, canvas.height);
    }
}

function addEntity(createdType, xCoord) {
    const entity = {type: createdType, x: xCoord};
    entities.push(entity);
}

document.addEventListener("keydown", function(event) {
    switch (event.code) {
        case "KeyR":
            generateTerrain();
            break;
        case "ArrowLeft":
            if (viewport > 0) {
                viewport--;
            }
            if (typeof terrain[viewport + 200] === "undefined") {
                generateTerrainMore(viewport);
            }
            break;
        case "ArrowRight":
            viewport++;
            /*if (typeof terrain[terrain.length + viewport] === "undefined") {
                console.log(terrain.length + viewport);
                terrain.push(generateTerrainPos(terrain.length + viewport - 1));
            }*/

            /*if (viewport % 100 === 0) {
                generateTerrain(viewport)
            }
            break;*/
            if (typeof terrain[viewport + 200] === "undefined") {
                generateTerrainMore(viewport);
            }
            break;
    }
});