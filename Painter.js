"use strict";

//we're going to store all sprites in separate object, they'll be downloaded only when game is started
let sprites = {};

window.requestAnimationFrame = window.requestAnimationFrame ||
                               window.webkitRequestAnimationFrame ||
                               window.mozRequestAnimationFrame ||
                               window.oRequestAnimationFrame ||
                               window.msRequestAnimationFrame ||
                               function (callback) {
                                 window.setTimeout(callback, 1000/60);
                               };
let target = {
  targetSprite: undefined,
  position : { x : 460, y : 0 },
  origin: { x:34, y: 34},
};

let Game = {
  spritesStillLoading: 0
};

Game.start = function () {
    Canvas2D.initialize("mycanvas");
    Keyboard.initialize();
    Mouse.initialize();
    Game.loadAssets();
    Game.assetLoadingLoop();
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

Game.initialize = function() {
  cannon.handleInput();
};

Game.update =function() {
  cannon.update();
};

Game.draw = function () {
  Canvas2D.clear();
  Canvas2D.drawImage(sprites.backgroundSprite, { x : 0, y : 0 }, 0, {x: 0, y:0});
  target.origin = { x: sprites.targetSprite.width/2, y: sprites.targetSprite.height/2};
  //Canvas2D.drawImage(sprites.targetSprite, target.position, 0, target.origin);
  //Canvas2D.drawImage(sprites.cannon_barrel, cannon.position, cannon.rotation, cannon.origin);
  //nested  here for clarifying, which drawing instructions belong to Game object
  cannon.draw();
};

Game.loadAssets = function () {
  let spriteFolder = "./sprites";
  sprites.background = Game.loadSprite(spriteFolder +"spr_background.jpg");
  // I NEED CORRECT ALL SPRITES PATHS THIS WAY
}