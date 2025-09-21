// =======================
// GAME VARIABLES
// =======================

// Keeps track of the snake’s current movement direction
// x: -1 → left, x:1 → right, y:-1 → up, y:1 → down
let inputDir = { x: 0, y: 0 };

// Audio files
const musicSound = new Audio("music/music.mp3");   // Background music
musicSound.loop = true;                             // Loop it continuously
musicSound.play();                                  // Start playing immediately

const foodSound = new Audio("music/food.mp3");     // Plays when snake eats
const gameOverSound = new Audio("music/gameover.mp3"); // Plays when snake dies
const moveSound = new Audio("music/move.mp3");     // Plays on key press

// Speed controls how fast the snake moves (higher → faster)
let speed = 5;

// Timestamp of the last frame when the snake moved
// Used to regulate movement speed
let lastPaintTime = 0;

// Snake segments stored in an array of objects
// Each object = {x: col, y: row} position in grid
// snakeArr[0] is always the head
let snakeArr = [{ x: 13, y: 15 }];

// Food position on the grid
let food = { x: 6, y: 7 };

// Player score
let score = 0;


// =======================
// MAIN GAME LOOP
// =======================
function main(ctime) {
  // requestAnimationFrame keeps calling main repeatedly
  window.requestAnimationFrame(main);

  // ctime = current timestamp in milliseconds

  // Regulate movement speed
  // Only update the snake if enough time has passed
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return; // Skip this frame if not enough time
  }

  // Update lastPaintTime for next frame
  lastPaintTime = ctime;

  // Call the game engine to render everything
  gameEngine();
}


// =======================
// COLLISION DETECTION
// =======================
function isCollide(sarr) {
  // Check if snake head hits its own body
  for (let i = 1; i < sarr.length; i++) {
    if (sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y) {
      return true; // Collision detected
    }
  }

  // Check if snake hits wall
  if (sarr[0].x > 20 || sarr[0].x < 1 || sarr[0].y > 20 || sarr[0].y < 1) {
    return true; // Head is outside grid
  }

  return false; // No collision
}


// =======================
// GAME ENGINE
// =======================
function gameEngine() {
  // --------- COLLISION HANDLING ----------
  if (isCollide(snakeArr)) {
    gameOverSound.play();  // Play game over sound
    musicSound.pause();     // Stop background music

    // Reset snake direction to stop moving
    inputDir = { x: 0, y: 0 };

    // Alert user
    alert("Game Over. Press any key to play again!");

    // Reset snake to starting position
    snakeArr = [{ x: 13, y: 15 }];

    // Reset score
    score = 0;

    // Restart music
    musicSound.play();
  }

  // --------- FOOD EATEN ----------
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    score += 1;            // Increase score
    foodSound.play();       // Play eating sound

    // Update high score if needed
    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      hiBox.innerHTML = hiscoreval; // Show new high score
    }

    scoreBox.innerHTML = score; // Update score display

    // Add new segment to snake head
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });

    // Generate new food in random position within grid
    let a = 1, b = 20;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  // --------- MOVE SNAKE BODY ----------
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    // Each segment takes position of the previous segment
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  // Move snake head
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;


  // --------- RENDER SNAKE & FOOD ----------
  gameBoard.innerHTML = ""; // Clear previous frame

  // Draw each snake segment
  snakeArr.forEach((e, index) => {
    let snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;      // Row position
    snakeElement.style.gridColumnStart = e.x;   // Column position

    if (index === 0) {
      snakeElement.classList.add("bdy");       // Head
    } else {
      snakeElement.classList.add("snake");     // Body
      snakeElement.style.backgroundColor = "rgb(237, 33, 237)";
      snakeElement.style.height = "30px";
    }

    gameBoard.appendChild(snakeElement);       // Add to board
  });

  // Draw food
  let foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  foodElement.style.backgroundColor = "rgba(71, 218, 3, 1)";
  foodElement.style.height = "30px";

  gameBoard.appendChild(foodElement);
}


// =======================
// HIGH SCORE INITIALIZATION
// =======================
let hiscore = localStorage.getItem("hiscore");
let hiscoreval;
if (hiscore === null) {
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(hiscore);
  hiBox.innerHTML = hiscoreval; // Show stored high score immediately
}


// =======================
// START GAME LOOP
// =======================
window.requestAnimationFrame(main);


// =======================
// KEYBOARD INPUT
// =======================
window.addEventListener("keydown", (e) => {
  moveSound.play(); // Play sound when key pressed

  switch (e.key) {
    case "ArrowUp":
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowRight":
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    case "ArrowLeft":
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    default:
      break; // Ignore other keys
  }
});
