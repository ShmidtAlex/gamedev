"use strict";

function handleKeyDown(e) {
  Keyboard.keyDown = e.keyCode;
}
function handleKeyUp(e) {
  Keyboard.keyDown = -1;
}

let Keyboard = { keyDown: -1 };

Keyboard.initialize = function() {
  document.onkeydown = handleKeyDown;
  document.onkeyup = handleKeyUp;
}