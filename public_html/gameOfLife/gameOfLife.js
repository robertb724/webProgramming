var canvas;
var ctx;
var gameSize;
var gameStatus;
var generation = 0;
var population = 0;

function generateMap(x){
  gameSize = x;
  var theGrid = [];
  for (var i = 0; i < x; i++){
    theGrid[i] = [];
    for (var j = 0; j < x; j++){
      theGrid[i][j] = Math.floor((Math.random() * 2)+0);
    }
  }
  return theGrid;
}

function drawMap(theMap, size){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  population = 0;

  cellSize = 500 / size;

  for (var i = 0; i < size; i++){
    for (var j = 0; j < size; j++){
      if (theMap[i][j] == 0){
        ctx.strokeRect(i*cellSize,j*cellSize,cellSize,cellSize);
      }
      else if (theMap[i][j] == 1) {
        ctx.fillRect(i*cellSize,j*cellSize,cellSize,cellSize);
        population += 1;
      }
    }
  }
  document.getElementById('numGen').innerHTML = "Generation: " + generation;
  document.getElementById("numPop").innerHTML = "population: " + population;
}

document.querySelector("GOL").addEventListener("click", function (event) {
  document.querySelector("output").textContent = event.clientX + ", " + event.clientY;
});
/*
function click(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    console.log("x: " + x + " y: " + y);
}
*/
function nextGen(theMap){
  var tempMap = [];
  for (var i = 0; i < gameSize; i++){
    tempMap[i] = [];
    for (var j = 0; j < gameSize; j++){
      var neighbors = 0;
      var above = (i-1 >= 0) ? i-1 : gameSize-1;
      var below = (i+1 <= gameSize-1) ? i+1 : 0;
      var left = (j-1 >= 0) ? j-1 : gameSize - 1;
      var right = (j+1 <= gameSize-1) ? j+1 : 0;
      neighbors += theMap[above][left];
      neighbors += theMap[above][j];
      neighbors += theMap[above][right];
      neighbors += theMap[i][left];
      neighbors += theMap[i][right];
      neighbors += theMap[below][left];
      neighbors += theMap[below][j];
      neighbors += theMap[below][right];
      if (theMap[i][j] == 1 && neighbors < 2){//dies by under population
        tempMap[i][j] = 0;
      }
      else if (theMap[i][j] == 1 && neighbors > 3) {//dies by overcrowding
        tempMap[i][j] = 0;
      }
      else if (theMap[i][j] == 0 & neighbors == 3) {
        tempMap[i][j] = 1;
      }
      else{
        tempMap[i][j] = theMap[i][j];
      }
    }
  }
  for (var i = 0; i < gameSize; i++){
    for (var j = 0; j < gameSize; j++){
      theMap[i][j] = tempMap[i][j]
    }
  }
  generation++;
}
function nextGenBtn(){
  nextGen(theMap);
  drawMap(theMap, gameSize);
}
function nextGen23(){
  for (var i = 0; i < 23; i++) {
    nextGen(theMap);
    drawMap(theMap, gameSize);
  }
}
function gameStart(){
  gameStatus = 1;
  while (gameStatus != 0){
    nextGen(theMap);
    drawMap(theMap, gameSize);
  }
}
function gameStop(){
  gameStatus = 0;
}
function resetBtn(){
  theMap = [];
  theMap = generateMap(gameSize);
  drawMap(theMap, gameSize);
}

function startGame(size){
  canvas = document.getElementById("GOL");
  ctx = canvas.getContext("2d");
  theMap = generateMap(size);
  drawMap(theMap, size);
  //canvas.addEventListener('click', click(canvas, event), false);
}
