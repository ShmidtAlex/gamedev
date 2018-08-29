

//this one define mouse position for different goals:




//when user press the key, the keyCode it stored in Keyboard

//in this approach user can't press keys simultaneously

//"-1" means, that user currentyl is not pressing any key










//this method assigns value to













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


document.addEventListener( 'DOMContentLoaded', Game.start);

Game.mainLoop = function() {
    Game.update();
    Game.draw();
    Mouse.reset();
    window.setTimeout(Game.mainLoop, 1000 / 60);
};



