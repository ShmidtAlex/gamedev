"use strict";

//we're going to store all sprites in separate object, they'll be downloaded only when game is started
let sprites = {};

//this one define mouse position for different goals:
function handleMouseMove(e){
  target.position = { x: e.pageX, y: e.pageY };
  Mouse.position = { x: e.pageX, y: e.pageY };
};
function handleMouseDown(e) {
  if (e.key !== -1) {
    if(!Mouse.leftDown ){
      Mouse.leftPressed = true;
    }
    Mouse.leftDown = true;
  }
}
function handleMouseUp(e) {
  if (e.key !== -1) {
    Mouse.leftDown = false;
  }
}

function handleKeyDown(e) {
  Keyboard.keyDown = e.keyCode;
}
//when user press the key, the keyCode it stored in Keyboard

//in this approach user can't press keys simultaneously
function handleKeyUp(e) {
  Keyboard.keyDown = -1;
}
//"-1" means, that user currentyl is not pressing any key
let Keyboard = { keyDown: -1 };

let Keys = {
  A: 65,     G: 71,    M: 77,    S: 83, 
  Y: 89,     B: 66,    H: 72,    N: 78, 
  T: 84,     Z: 90,    C: 67,    I: 73, 
  O: 79,     U: 85,    D: 68,    J: 74, 
  P: 80,     V: 86,    E: 69,    K: 75, 
  Q: 81,     W: 87,    F: 70,    L: 76, 
  R: 82,     X: 88,
};

let Mouse = {
  position: {x: 0, y: 0},
  leftDown: false,
}

Mouse.reset = function() {
  Mouse.leftPressed = false;
}

let Canvas2D = {
  canvas : undefined,
  canvasContext : undefined,
};


let target = {
  targetSprite: undefined,
  position : { x : 460, y : 0 },
  origin: { x:34, y: 34},
};

//this method assigns value to
Canvas2D.initialize = function(canvasName) {
  Canvas2D.canvas = document.getElementById("mycanvas");
  Canvas2D.canvasContext = Canvas2D.canvas.getContext("2d");
}


Canvas2D.clear = function () {
    Canvas2D.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Canvas2D.drawImage = function (sprite, position, rotation, origin) {
  Canvas2D.canvasContext.save();
  Canvas2D.canvasContext.translate(position.x, position.y);
  Canvas2D.canvasContext.rotate(rotation);
  Canvas2D.canvasContext.drawImage(sprite, 0, 0, sprite.width, sprite.height,
      -origin.x, -origin.y, sprite.width, sprite.height); 
  Canvas2D.canvasContext.restore();
};

let cannon = {
  //cannonBarrelSprite: undefined, 
};

cannon.initialize = function() {
  cannon.position = {x: 72, y: 405};
  cannon.colorPosition = {x: 55, y: 388};
  cannon.origin = {x: 34, y: 34};
  cannon.colorOrigin = {x:0, y:0};
  cannon.currentColor = sprites.cannon_red;
  console.log(cannon.currentColor)
  cannon.rotation = 0;
  cannon.calculateAngle = false;
};

console.log(sprites);
let Game = {};

Game.start = function () {
    Canvas2D.initialize("mycanvas");
    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;
    document.onmousemove = handleMouseMove;
    document.onmousedown = handleMouseDown;
    document.onmouseup = handleMouseUp;
    //special variable for folder, which stores sprites
    let spriteFolder = './sprites/';
    sprites.backgroundSprite = new Image();
    sprites.backgroundSprite.src = spriteFolder + "spr_background.jpg";
    sprites.targetSprite = new Image();
    sprites.targetSprite.src = spriteFolder + "target_PNG17.png";
    sprites.cannonBarrelSprite = new Image();
    sprites.cannonBarrelSprite.src = spriteFolder + "spr_cannon_barrel.png";
    //sprites.balloonYellow.src = spriteFolder + "spr_balloon.png";
    sprites.cannon_red = new Image();
    sprites.cannon_red.src = spriteFolder + "spr_cannon_red.png";
    sprites.cannon_green = new Image();
    sprites.cannon_green.src = spriteFolder + "spr_cannon_green.png";
    sprites.cannon_blue  = new Image();
    sprites.cannon_blue.src = spriteFolder + "spr_cannon_blue.png";
    //invoke function, which assigns values to variables:
    cannon.initialize();
    //console.log(cannon.currentColor)
    window.setTimeout(Game.mainLoop, 500);
};
cannon.update = function () {
  if (Keyboard.keyDown === Keys.R) {
    cannon.currentColor = sprites.cannon_red;
  } else if (Keyboard.keyDown === Keys.G) {
    cannon.currentColor = sprites.cannon_green;
  } else if (Keyboard.keyDown === Keys.B) {
    cannon.currentColor = sprites.cannon_blue;
  }
  if(Mouse.leftPressed) {
    cannon.calculateAngle = !cannon.calculateAngle;
  }
  if(cannon.calculateAngle) {
    let opposite = Mouse.position.y - cannon.position.y;
    let adjacent = Mouse.position.x - cannon.position.x;
    cannon.rotation = Math.atan2(opposite, adjacent);
  } else {
    cannon.rotation = 0
  }
};
cannon.draw = function() {
  Canvas2D.drawImage(sprites.cannonBarrelSprite, cannon.position, cannon.rotation, cannon.origin);
  Canvas2D.drawImage(cannon.currentColor, cannon.colorPosition, 0,  cannon.colorOrigin);
};

document.addEventListener( 'DOMContentLoaded', Game.start);

Game.mainLoop = function() {
    Game.update();
    Game.draw();
    Mouse.reset();
    window.setTimeout(Game.mainLoop, 1000 / 60);
};

Game.update =function() {
  cannon.update();
}
Game.draw = function () {
  Canvas2D.clear();
  Canvas2D.drawImage(sprites.backgroundSprite, { x : 0, y : 0 }, 0, {x: 0, y:0});
  target.origin = { x: sprites.targetSprite.width/2, y: sprites.targetSprite.height/2};
  //Canvas2D.drawImage(sprites.targetSprite, target.position, 0, target.origin);
  //Canvas2D.drawImage(sprites.cannon_barrel, cannon.position, cannon.rotation, cannon.origin);
  //nested  here for clarifying, which drawing instructions belong to Game object
  cannon.draw();
};
