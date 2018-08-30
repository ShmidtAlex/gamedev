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
};

Game.initialize = function() {
  cannon.initialize();
};

Game.handleInput = function () {
  cannon.handleInput();
}
Game.update =function() {
  //cannon.update();
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
  let spriteFolder = "./sprites/";
  sprites.background = Game.loadSprite(spriteFolder +"spr_background.jpg");
  sprites.backgroundSprite = Game.loadSprite(spriteFolder + "spr_background.jpg");
  sprites.targetSprite = Game.loadSprite(spriteFolder + "target_PNG17.png");
  //console.log(targetSprite);
  sprites.cannonBarrelSprite = Game.loadSprite(spriteFolder + "spr_cannon_barrel.png");
  //sprites.balloonYellow.src = spriteFolder + "spr_balloon.png";
  sprites.cannon_red = Game.loadSprite(spriteFolder + "spr_cannon_red.png");
  sprites.cannon_green = Game.loadSprite(spriteFolder + "spr_cannon_green.png");
  sprites.cannon_blue  = Game.loadSprite(spriteFolder + "spr_cannon_blue.png");
}

//launched on each sprites in loadAccess() method
Game.loadSprite = function(imageName) {
  let image = new Image();
  image.src = imageName;
  //every time, when we loading one sprite, we count it
  Game.spritesStillLoading +=1;
  //this is event(onload) handler:
  image.onload = function() {
    //every time, when we finised loading sprite, we decrement it
    Game.spritesStillLoading -=1;
  };
  return image;
}

//Launched only after loadAssets() method
Game.assetLoadingLoop = function() {
  if (Game.spritesStillLoading > 0) {
    window.setTimeout(Game.assetLoadingLoop, 1000 / 60);
  }
  else {
    Game.initialize();
    Game.mainLoop();
  }
};

//launched only if all sprites loaded (checking in previous method assetLoadingLoop)
Game.mainLoop = function() {
  Game.handleInput();
  Game.update();
  Game.draw();
  Mouse.reset();
  window.requestAnimationFrame(Game.mainLoop);
}