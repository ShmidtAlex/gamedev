"use strict";

let painterGameWorld = {};

painterGameWorld.handleInput = function(delta) {
  ball.handleInput(delta);
  cannon.handleInput(delta);
}

painterGameWorld.update =function(delta) {
  ball.update(delta)
  cannon.update(delta);
};

painterGameWorld.draw = function () {
  Canvas2D.clear();
  Canvas2D.drawImage(sprites.background, { x : 0, y : 0 }, 0, {x: 0, y:0});
  target.origin = { x: sprites.targetSprite.width/2, y: sprites.targetSprite.height/2};
  Canvas2D.drawImage(sprites.targetSprite, target.position, 0, target.origin);
  Canvas2D.drawImage(sprites.cannon_barrel, cannon.position, cannon.rotation, cannon.origin);
  //nested  here for clarifying, which drawing instructions belong to Game object
  ball.draw();
  cannon.draw();
};

painterGameWorld.reset = function() {
  ball.reset();
  cannon.reset();
}

painterGameWorld.isOutsideWorld = function(position) {
  return position.x < 0 || position.x > Game.size.x || position.y > Game.size.y;
}