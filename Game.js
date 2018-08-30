"use strict";

//this is reusable file, which can be use in different other games
//it consists from object called Game and several useful methods, belongs to this object

window.requestAnimationFrame = window.requestAnimationFrame ||
                               window.webkitRequestAnimationFrame ||
                               window.mozRequestAnimationFrame ||
                               window.oRequestAnimationFrame ||
                               window.msRequestAnimationFrame ||
                               function (callback) {
                                 window.setTimeout(callback, 1000/60);
};

let Game = {
  spritesStillLoading: 0,
  //in our case this will be painterGameWorld:
  gameWorld: undefined,
};

Game.start = function(canvasName, x, y) {
    Canvas2D.initialize(canvasName);
    Game.size = { x: x, y: y };
    Keyboard.initialize();
    Mouse.initialize();
    Game.loadAssets();
    Game.assetLoadingLoop();
};

Game.loadAssets = function() {
  
};

//launched on each sprites in loadAccess() method
Game.loadSprite = function(imageName) {
  console.log("Loading sprite: " + imageName);
  let image = new Image();
  image.src = imageName;
  //every time, when we loading one sprite, we count it
  this.spritesStillLoading +=1;
  //this is event(onload) handler:
  image.onload = function() {
    //every time, when we finised loading sprite, we decrement it
    Game.spritesStillLoading -=1;
  };
  return image;
};

//Launched only after loadAssets() method
Game.assetLoadingLoop = function() {
  if (Game.spritesStillLoading > 0) {
    //instead of window.setTimeout(Game.assetLoadingLoop, 1000 / 60), we can use modern
    window.requestAnimationFrame(Game.assetLoadingLoop);
  }
  else {
    Game.initialize();
    window.requestAnimationFrame(Game.mainLoop);
  }
};

//launched only if all sprites loaded (checking in previous method assetLoadingLoop)
Game.mainLoop = function() {
  let delta = 1 / 60;
  Game.gameWorld.handleInput(delta);
  Game.gameWorld.update(delta);
  Canvas2D.clear();
  Game.gameWorld.draw();
  Mouse.reset();
  //at this place instead of setTimeout method too:
  requestAnimationFrame(Game.mainLoop);
}