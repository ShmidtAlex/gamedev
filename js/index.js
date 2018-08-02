"use strict";

let Canvas2D = {
  canvas : undefined,
  canvasContext : undefined,
};
let Game = {
    backgroundSprite : undefined,
    balloonSprite2 : undefined,
    balloonSprite3 : undefined,
};
let target = {
  targetSprite: undefined,
  position : { x : 460, y : 0 },
  origin: { x:34, y: 34},
};
let cannon = {
  cannonBarrelSprite: undefined,
  position: {x: 72, y: 405},
  origin: {x: 34, y: 34},
  rotation: 0,
};
let Mouse = {
  position: {x: 0, y: 0},
}
//we're going to store all sprites in separate object, they'll be downloaded only when game is started
let sprites = {};
Game.start = function () {
    Canvas2D.canvas = document.getElementById("mycanvas");
    Canvas2D.canvasContext = Canvas2D.canvas.getContext("2d");
    //special variable for folder, which stores sprites
    let spriteFolder = './sprites/';
    Game.backgroundSprite = new Image();
    Game.backgroundSprite.src = spriteFolder + "spr_background.jpg";
    target.targetSprite = new Image();
    target.targetSprite.src = spriteFolder + "target_PNG17.png";
    cannon.cannonBarrelSprite = new Image();
    cannon.cannonBarrelSprite.src = spriteFolder + "spr_cannon_barrel.png";
    Game.balloonSprite2 = new Image();
    Game.balloonSprite3 = new Image();
    
    window.setTimeout(Game.mainLoop, 500);
};

document.addEventListener( 'DOMContentLoaded', Game.start);

Canvas2D.clearCanvas = function () {
    Canvas2D.canvasContext.clearRect(0, 0, Canvas2D.canvas.width, Canvas2D.canvas.height);
};

Canvas2D.drawImage = function (sprite, position, rotation, origin) {
  Canvas2D.canvasContext.save();
  Canvas2D.canvasContext.translate(position.x, position.y);
  Canvas2D.canvasContext.rotate(rotation);
  Canvas2D.canvasContext.drawImage(sprite, 0, 0, sprite.width, sprite.height,
      -origin.x, -origin.y, sprite.width, sprite.height);
 
  Canvas2D.canvasContext.restore();
};
Game.mainLoop = function() {
    Canvas2D.clearCanvas();
    Game.update();
    Game.draw();
    window.setTimeout(Game.mainLoop, 1000 / 60);
};

Game.update = function () {
  let opposite = Mouse.position.y - cannon.position.y;
  let adjacent = Mouse.position.x - cannon.position.x;
  cannon.rotation = Math.atan2(opposite, adjacent);
    //let d = new Date();
    //cannon.position.x = d.getTime() * 0.3 % Canvas2D.canvas.width;
    Canvas2D.canvas.onmousemove = Game.handleMouseMove;
};

Game.draw = function () {
    Canvas2D.drawImage(Game.backgroundSprite, { x : 0, y : 0 }, 0, {x: 0, y:0});
    target.origin = { x: target.targetSprite.width/2, y: target.targetSprite.height/2};
    Canvas2D.drawImage(target.targetSprite, target.position, 0, target.origin);
    Canvas2D.drawImage(cannon.cannonBarrelSprite, cannon.position, cannon.rotation, cannon.origin)
    //console.log(cannon.origin);
    
};
//this one define mouse position for different goals:
Game.handleMouseMove = function(e){
  target.position = { x: e.pageX, y: e.pageY };
  Mouse.position = { x: e.pageX, y: e.pageY };
};
