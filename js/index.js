"use strict";

let Game = {
    canvas : undefined,
    canvasContext : undefined,
    backgroundSprite : undefined,
    targetSprite: undefined,
    cannonBarrelSprite: undefined,
    balloonSprite2 : undefined,
    balloonSprite3 : undefined,
    mousePostion: {x: 0, y: 0},
    targetPosition : { x : 460, y : 0 },
    targetOrigin: { x:34, y: 34},
    cannonPosition: {x: 72, y: 405},
    cannonOrigin: {x: 34, y: 43},
    cannonRotation: 0,
};

Game.start = function () {
    Game.canvas = document.getElementById("mycanvas");
    Game.canvasContext = Game.canvas.getContext("2d");
    Game.backgroundSprite = new Image();
    Game.backgroundSprite.src = "spr_background.jpg";
    Game.targetSprite = new Image();
    Game.targetSprite.src = "target_PNG17.png";
    Game.cannonBarrelSprite = new Image();
    Game.cannonBarrelSprite.src = "spr_cannon_barrel.png";
    Game.balloonSprite2 = new Image();
    Game.balloonSprite3 = new Image();
    
    window.setTimeout(Game.mainLoop, 500);
};

document.addEventListener( 'DOMContentLoaded', Game.start);

Game.clearCanvas = function () {
    Game.canvasContext.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
};

Game.drawImage = function (sprite, position, rotation, origin) {
  Game.canvasContext.save();
  Game.canvasContext.translate(position.x, position.y);
  Game.canvasContext.rotate(rotation);
  Game.canvasContext.drawImage(sprite, 0, 0, sprite.width, sprite.height,
      -origin.x, -origin.y, sprite.width, sprite.height);
 
  Game.canvasContext.restore();
};
Game.mainLoop = function() {
    Game.clearCanvas();
    Game.update();
    Game.draw();
    window.setTimeout(Game.mainLoop, 1000 / 60);
};

Game.update = function () {
  let opposite = Game.mousePostion.y - Game.cannonPosition.y;
  let adjacent = Game.mousePostion.x - Game.cannonPosition.x;
  Game.cannonRotation = Math.atan2(opposite, adjacent);
    //let d = new Date();
    //Game.targetPosition.x = d.getTime() * 0.3 % Game.canvas.width;
    Game.canvas.onmousemove = Game.handleMouseMove;
};

Game.draw = function () {
    Game.drawImage(Game.backgroundSprite, { x : 0, y : 0 }, 0, {x: 0, y:0});
    Game.targetOrigin = { x: Game.targetSprite.width/2, y: Game.targetSprite.height/2};
    Game.drawImage(Game.targetSprite, Game.targetPosition, 0, Game.targetOrigin);
    Game.drawImage(Game.cannonBarrelSprite, Game.cannonPosition, Game.cannonRotation, Game.cannonOrigin)
    //console.log(Game.targetOrigin);
    
};
//this one define mouse position for different goals:
Game.handleMouseMove = function(e){
  Game.targetPosition = { x: e.pageX, y: e.pageY };
  Game.mousePostion = { x: e.pageX, y: e.pageY };
};
