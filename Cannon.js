"use strict";

let cannon = {
  //cannonBarrelSprite: undefined, 
};

cannon.initialize = function() {
  cannon.position = {x: 72, y: 405};
  cannon.colorPosition = {x: 55, y: 388};
  cannon.origin = {x: 34, y: 34};
  cannon.colorOrigin = {x:0, y:0};
  cannon.currentColor = sprites.cannon_red;
  cannon.rotation = 0;
  cannon.calculateAngle = false;
};

cannon.handleInput = function(delta) {
  if (Keyboard.keyDown === Keys.R) {
    cannon.currentColor = sprites.cannon_red;
  }
  else if (Keyboard.keyDown === Keys.G) {
    cannon.currentColor = sprites.cannon_green;
  }
  else if (Keyboard.keyDown === Keys.B) {
    cannon.currentColor = sprites.cannon_blue;
  }
  let opposite = Mouse.position.y - cannon.position.y;
  let adjacent = Mouse.position.x - cannon.position.x;
  cannon.rotation = Magh.atan2(opposite, adjacent);
};

cannon.draw = function() {
  Canvas2D.drawImage(sprites.cannonBarrelSprite, cannon.position, cannon.rotation, cannon.origin);
  Canvas2D.drawImage(cannon.currentColor, cannon.colorPosition, 0,  cannon.colorOrigin);
};