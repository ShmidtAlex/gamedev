"use strict";

let Canvas2D = {
  canvas : undefined,
  canvasContext : undefined,
};
let Game = {};

let target = {
  targetSprite: undefined,
  position : { x : 460, y : 0 },
  origin: { x:34, y: 34},
};
let cannon = {
  cannonBarrelSprite: undefined, 
};
let Mouse = {
  position: {x: 0, y: 0},
  leftDown: false,
}
let Keys = {
  A: 65,     G: 71,    M: 77,    S: 83, 
  Y: 89,     B: 66,    H: 72,    N: 78, 
  T: 84,     Z: 90,    C: 67,    I: 73, 
  O: 79,     U: 85,    D: 68,    J: 74, 
  P: 80,     V: 86,    E: 69,    K: 75, 
  Q: 81,     W: 87,    F: 70,    L: 76, 
  R: 82,     X: 88,
};

//"-1" means, that user currentyl is not pressing any key
let Keyboard = { keyDown: -1 };
//we're going to store all sprites in separate object, they'll be downloaded only when game is started
let sprites = {};
Game.start = function () {
    Canvas2D.initialize("mycanvas");
    //special variable for folder, which stores sprites
    let spriteFolder = './sprites/';
    sprites.backgroundSprite = new Image();
    sprites.backgroundSprite.src = spriteFolder + "spr_background.jpg";
    sprites.targetSprite = new Image();
    sprites.targetSprite.src = spriteFolder + "target_PNG17.png";
    sprites.cannonBarrelSprite = new Image();
    sprites.cannonBarrelSprite.src = spriteFolder + "spr_cannon_barrel.png";
    sprites.balloonYellow = new Image();
    sprites.balloonYellow.src = spriteFolder + "spr_balloon.png";
    sprites.cannon_red = Game.loadSprite(spriteFolder + "spr_cannot_red.png");
    sprites.cannon_green = Game.loadSprite(spriteFolder + "spr_cannot_green.png");
    sprites.cannon_blue = Game.loadSprite(spriteFolder + "spr_cannot_blue.png");
    Game.balloonSprite2 = new Image();
    Game.balloonSprite3 = new Image();
    document.onkeyup = handleKeyUp;
    document.onmousedown = handleMouseDown;
    document.onmouseup = handleMouseUp;
    //invoke function, which assigns values to variables:
    cannon.initialize();
    console.log(cannon.currentColor)
    window.setTimeout(Game.mainLoop, 500);
};
//this method assigns value to
Canvas2D.initialize = function(canvasName) {
  Canvas2D.canvas = document.getElementById("mycanvas");
  Canvas2D.canvasContext = Canvas2D.canvas.getContext("2d");
}
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
    cannon.update();
    Game.draw();

    window.setTimeout(Game.mainLoop, 1000 / 60);
};

cannon.update = function () {
  if(Mouse.leftDown) {
    let opposite = Mouse.position.y - cannon.position.y;
    let adjacent = Mouse.position.x - cannon.position.x;
    cannon.rotation = Math.atan2(opposite, adjacent);
  }
  
    //let d = new Date();
    //cannon.position.x = d.getTime() * 0.3 % Canvas2D.canvas.width;
    Canvas2D.canvas.onmousemove = Game.handleMouseMove;
};

Game.draw = function () {
    Canvas2D.drawImage(sprites.backgroundSprite, { x : 0, y : 0 }, 0, {x: 0, y:0});
    target.origin = { x: sprites.targetSprite.width/2, y: sprites.targetSprite.height/2};
    Canvas2D.drawImage(sprites.targetSprite, target.position, 0, target.origin);
    //for clarifying, which drawing instructions belong to Game object
    cannon.draw();
    //console.log(cannon.origin);
    
};
Game.loadSprite = function(){

}
//this method just assigns values to the variables
cannon.initialize = function() {
  cannon.position = {x: 72, y: 405};
  cannon.colorPosition = {x: 55, y: 388};
  cannon.origin = {x: 34, y: 34};
  cannon.currentColor = sprites.cannon_red;
  cannon.rotation = 0;
};
cannon.draw = function() {
  Canvas2D.drawImage(sprites.cannonBarrelSprite, cannon.position, cannon.rotation, cannon.origin);
}
// cannon.update = function() {
//   let opposite
// }
//this one define mouse position for different goals:
Game.handleMouseMove = function(e){
  target.position = { x: e.pageX, y: e.pageY };
  Mouse.position = { x: e.pageX, y: e.pageY };
};
function handleMouseDown(e) {
  //if (e.which === 1) {
    Mouse.leftDown = true;
    console.log(Mouse.leftDown);
 // }
}
function handleMouseUp(e) {
  //if (e.wich === 1) {
    Mouse.leftDown = false;
    console.log(Mouse.leftDown);
  //}
}

function handleKeyDown(e) {
  Keyboard.keyDown = e.keyCode;
}
//when user press the key, the keyCode it stored in Keyboard
document.onkeydown = handleKeyDown; 
//in this approach user can't press keys simultaneously
function handleKeyUp(e) {
  Keyboard.keyDown = -1;
}
