/* global createCanvas, colorMode, HSB, random, width, height, background
fill
rect, ellipse, text, textSize, keyCode, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW
stroke, fill,
HSB, mouseX, mouseY, mouseIsPressed, pmouseX, pmouseY, line, brushHue, key, car2X, car2Y
hit, collideRectCircle(), hit2, color, loadImage
*/


let backgroundColor, frogX, frogY, score, lives, gameIsOver, car1X, car1Y, car1V, car2V, myButton, alligator;
let loss, win;
let coinList;


function setup() {
  // Canvas & color settings
  createCanvas(500, 500);
  alligator = loadImage("https://cdn.glitch.com/1a51bf75-e3d4-4342-b9ab-fef54290abd5%2F7-75886_alligator-clipart-navigator.png?v=1594754631584")
  coin = loadImage("https://cdn.glitch.com/1a51bf75-e3d4-4342-b9ab-fef54290abd5%2Fc8884d6baa63c7497d28a9fae4f87a03.png?v=1594756056982")
  
  alligator1X = random(width/2) + width/2 - 75;
  alligator1Y = random(height/2) + height/2 - 75;
  
  alligator2X = random(width/2) + 50;
  alligator2Y = random(height/2) + 75;
  
  
  
  
  colorMode(HSB, 360, 100, 100);
  backgroundColor = color(192, 89, 65);
  //position of green circle
  frogX = width/2;
  frogY = height-20;
  //current score
  score = 0;
  lives = 3;
  gameIsOver = false;
  loss = false;
  win = false;
  car1X = 0;
  car1Y = 100;
  car1V = 5;
  car2X = 0;
  car2Y = 250;
  car2V = 2;
  myButton = new Clickable();
   myButton.locate(width/2-50, height/2);
}

function draw() {
  background(backgroundColor);
  tint(backgroundColor);
  image(alligator, alligator1X, alligator1Y, 75, 75); 
  image(alligator, alligator2X, alligator2Y, 75, 75);
  rect(alligator, alligator1X, alligator1Y, 75, 75);  
  rect(alligator, alligator2X, alligator2Y, 75, 75);
  
  // Code for gold goal line
  fill(60, 80, 80);
  rect(0, 0, width, 50);
  // Code to display Frog
  fill(120, 80, 80);
  ellipse(frogX, frogY, 20);
  moveCars();
  drawCars();
  checkCollisions();
  checkWin();
  displayScores();
  playAgain();
}


function keyPressed() {
  if (keyCode === UP_ARROW) {
    frogY -= 10;
  }
    if (keyCode === DOWN_ARROW) {
      frogY += 10;
    }
    if (keyCode === LEFT_ARROW) {
      frogX -= 10;
    }
    if (keyCode === RIGHT_ARROW) {
      frogX += 10;
    }
  }


function moveCars() {
  // Move the car
  car1X += car1V;
  car2X += car2V
  // Reset if it moves off screen
  if (car1X > width) {
    car1X = -40;
  }
  if (car2X > width) {
    
    car2X = -40;
  }

}

function drawCars() {
  // Code for car 1
  fill(0, 80, 80);
  rect(car1X, car1Y, 40, 30);
  // Code for additional cars
  rect(car2X, car2Y, 40, 30);
}

function checkCollisions() {
  // If the frog collides with the car, reset the frog and subtract a life.
  hit = collideRectCircle(car1X, car1Y, 40, 30, frogX, frogY, 20);
  hit2 = collideRectCircle(car2X, car2Y, 40, 30, frogX, frogY, 20);
  hit4 = collideRectCircle(alligator1X, alligator1Y, 75, 75, frogX, frogY, 20);
  hit5 = collideRectCircle(alligator2X, alligator2Y, 75, 75, frogX, frogY, 20);
  if (hit || hit2 || hit4 || hit5) {
    frogX = width/2;
    frogY = height-20;
    lives -= 1;
  }
  
  if (lives == 0) {
    gameIsOver = true;
    loss = true;
  }

}

function checkWin() {
  // If the frog makes it into the yellow gold zone, increment the score
  // and move the frog back down to the bottom.
  
  hit3 = collideRectCircle(0, 0, width, 50, frogX, frogY, 20);
  if (hit3) {
    score+=1;
    frogX = width/2;
    frogY = height-20;
    gameIsOver = true;
    win = true;
  }
  
  
}

function displayScores() {
  textSize(12);
  fill(0);
  // Display Lives
  textAlign(LEFT);
  text(`Lives: ${lives}`, 10, 20);
  text(`Score: ${score}`, 10, 40);
  textSize(60);
  textAlign(CENTER);
  if (loss) {
    background(color(342, 80, 65));
    text("GAME OVER", width/2, 60);
    
  }
  else if (win) {
    background(color(342, 80, 65));
    text("You Won!", width/2, 60);
  }
  // Display Score

  // Display game over message if the game is over

}

function playAgain() {   
  if (gameIsOver) {
    
    myButton.color = "#AAAAFF";
    myButton.textColor = "#FFFFFF";
    myButton.text = "Play Again?";
     myButton.draw();
    
    
    myButton.onPress = function() {
      console.log("I have been pressed!");
      score = 0;
     lives = 3; 
      frogX = width/2;
  frogY = height-20;
       car1X = 0;
  car1Y = 100;
  car1V = 5;
  car2X = 0;
  car2Y = 250;
  car2V = 2;
      
      gameIsOver = false;
      win = false;
      loss = false;
  }
  
}}

function Car(x, y, z) {
  return {
    x: x, y: y, z: z
    
  }
}

