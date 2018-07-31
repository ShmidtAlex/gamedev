"use strict";

let Game = {
    canvas : undefined,
    canvasContext : undefined,
    backgroundSprite : undefined,
    cannonBarrelSprite: undefined,
    balloonSprite2 : undefined,
    balloonSprite3 : undefined,
    cannonPosition : { x : 460, y : 0 },
    cannonOrigin: { x:34, y: 34},
    cannonImageSize: {h: 20, w:20 },
};
console.log(Game.cannonImageSize);

Game.start = function () {
    Game.canvas = document.getElementById("mycanvas");
    Game.canvasContext = Game.canvas.getContext("2d");
    Game.backgroundSprite = new Image();
    Game.backgroundSprite.src = "spr_background.jpg";
    Game.cannonBarrelSprite = new Image();
    Game.balloonSprite2 = new Image();
    Game.balloonSprite3 = new Image();
    Game.cannonBarrelSprite.src = "target_PNG17.png";
    window.setTimeout(Game.mainLoop, 500);
};

document.addEventListener( 'DOMContentLoaded', Game.start);

Game.clearCanvas = function () {
    Game.canvasContext.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
};

Game.drawImage = function (sprite, position, origin, imageSize) {
  console.log();
  Game.canvasContext.save();
  Game.canvasContext.translate(position.x, position.y);
  Game.canvasContext.drawImage(sprite, 0, 0, imageSize.x || sprite.width, imageSize.y || sprite.height,
      -origin.x, -origin.y, sprite.width, sprite.height);
  console.log(sprite.w, sprite.h);
  Game.canvasContext.restore();
};
Game.mainLoop = function() {
    Game.clearCanvas();
    Game.update();
    Game.draw();
    window.setTimeout(Game.mainLoop, 1000 / 60);
};

Game.update = function () {
    //let d = new Date();
    //Game.cannonPosition.x = d.getTime() * 0.3 % Game.canvas.width;
    Game.canvas.onmousemove = Game.handleMouseMove;
};

Game.draw = function () {
    Game.drawImage(Game.backgroundSprite, { x : 0, y : 0 }, {}, );
    Game.cannonOrigin = { x: Game.cannonBarrelSprite.width/2, y: Game.cannonBarrelSprite.height/2};
    Game.drawImage(Game.cannonBarrelSprite, Game.cannonPosition, Game.cannonOrigin, { h: 20, w:20 });
    console.log(Game.cannonImageSize);
};
Game.handleMouseMove = function(e){
  Game.cannonPosition = { x: e.pageX, y: e.pageY };
  console.log(Game.cannonPosition);
};
