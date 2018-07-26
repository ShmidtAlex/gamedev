//how it looks generally
changeCanvasColor = function() {
  let canvas = document.getElementById('mycanvas');
  let context = canvas.getContext('2d');
  context.fillStyle = "lightblue";
  context.fillRect(0, 0, canvas.width, canvas.height);
  console.log('hello world');
}
document.addEventListener('DOMContentLoaded', changeCanvasColor);
//.style.backgroundColor = "blue";