"use strict";
let Game = {
  canvas: undefined,
  canvasContext: undefined,
  rectanglePositionX: 0,
  rectanglePositionY: 0,
  kitty: undefined,
}
Game.start = function() {
  Game.canvas = document.getElementById('mycanvas');
  Game.canvasContext = Game.canvas.getContext('2d');
  Game.kitty = new Image();
  //here can be some web-page address of picture:
  Game.kitty.src = "kitty.png";
  //for be sure, that download of picture takes less then 0,5sec
  window.setTimeout(Game.mainLoop, 500);
}
document.addEventListener('DOMContentLoaded', Game.start);

Game.kitty = {
  src: "kitty.png",
  width:50,
  height:0,
}
//console.log(Game.kitty.src);
Game.update = function() {
  // let d = new Date();
  // let currentSystemTime = d.getTime();
  Game.rectanglePositionX--;
  Game.rectanglePositionY-=0.5;
  if(Game.rectanglePositionX >= Game.canvas.width + 40 || Game.rectanglePositionY >= Game.canvas.height + 40 ){
    Game.rectanglePositionX = 0;
    Game.rectanglePositionY = 0;
  } else if ( Game.rectanglePositionX < 0 || Game.rectanglePositionY < 0){
    Game.rectanglePositionX = Game.canvas.width + 40;
    Game.rectanglePositionY = Game.canvas.height + 40;
  }
  //console.log(Game.rectanglePositionX, Game.rectanglePositionY)
};

Game.draw = function() {
  Game.canvasContext.fillStyle = "lightblue";
  Game.canvasContext.fillRect(0, 0, Game.canvas.width, Game.canvas.height);
};
Game.rectDraw = function() {
  Game.canvasContext.fillStyle = "blue";
  Game.canvasContext.fillRect(Game.rectanglePositionX, Game.rectanglePositionY, 50, 50);
  Game.drawImage(Game.kitty, {x:10, y:10});
};
Game.drawImage = function(sprite, position) {
  //create a new drawing state for rotated or scaled sprite, f.e.g.
  Game.canvasContext.save();
  //apply some variety of transformations within drawing state
  //Game.canvasContext.translate(100, 100) f.e.g, sprite will drawn at position (100, 100)
  Game.canvasContext.translate(position.x, position.y);
 // console.log(position.x, position.y);
  Game.canvasContext.drawImage(sprite, 0, 0, sprite.width, sprite.height, -70, -70, sprite.width, sprite.height);
  //console.log(sprite.width);
  //removes drawn state:
  Game.canvasContext.restore();
}

//usually we need clearCanvas method for avoid situation, when square turns into 
// solid bar, but this time we create new special and separated function rectDraw
//for blue rectangle, so this we don't need clearCanvas function at all.
// Game.clearCanvas = function () {
//   Game.canvasContext.clearRect(0,0, Game.canvas.width, Game.canvas.height);
// };
Game.mainLoop = function() {
  //Game.clearCanvas();
  Game.update();
  Game.draw();
  Game.rectDraw();
  
  window.setTimeout(Game.mainLoop, 1000/60);
};