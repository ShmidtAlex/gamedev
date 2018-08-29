"use strict";

function handleMouseMove(e){
  target.position = { x: e.pageX, y: e.pageY };
  Mouse.position = { x: e.pageX, y: e.pageY };
}

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

let Mouse = {
  position: {x: 0, y: 0},
  //is left key of mouse pressed?
  leftDown: false,
  leftPressed: false,
}

Mouse.initialize = function() {
  document.onmousemove = handleMouseMove;
  document.onmousedown = handleMouseDown;
  document.onmouseup = handleMouseUp;
}

Mouse.reset = function() {
  Mouse.leftPressed = false;
}