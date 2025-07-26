// ✅ 1. Audio Setup

const audio = new Audio("scott-joplin-swipesy-classical-remix-10595.mp3");
const loserAudio = new Audio("wah-wah-sad-trombone-6347.mp3");
const winnerAudio = new Audio("short-crowd-cheer-6713.mp3");
const elmAudio = new Audio("correct-2-46134.mp3");
audio.play();
audio.loop = true; 
 
 

// ✅ 2. Game Setup

let currentTurn = "X";
let gameWon = false;
 

const board = document.querySelectorAll(".cell");
const messageBox = document.getElementById("message");
const reset = document.querySelector("#resetBtn");
const resultImage = document.querySelector(".result-image");
const desc = document.querySelector(".status");
// const winLine = document.querySelector(".line");

let winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6] // diagonals
];
 

// ✅ 3. Player Move + Game Logic
// ✅ 1. Define checkWin() once
function checkWin(player) {
  for (const condition of winConditions) {
    const [a, b, c] = condition;
    if (
      board[a].textContent === player &&
      board[b].textContent === player &&
      board[c].textContent === player
    )
     {
      gameWon = true;
      elmAudio.play();
      return true;
    }
  }
  return false;
}

// ✅ 2. Define aiTurn() once
function aiTurn() {
  if (gameWon) return;

  desc.textContent = "AI turn!!";

   setTimeout(() => {
  let emptyCells = [...board].filter(cell => cell.innerHTML === "");
  if (emptyCells.length === 0) return;

  let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  randomCell.innerHTML = "O";

  if (checkWin("O")) {
    desc.textContent = "AI wins! 🤖";
    resultImage.innerHTML = `<img src="https://i.giphy.com/ntDg2yPK3jAlLwMr1R.webp" style="width: 250px;" />`;
    loserAudio.play();
    gameWon = true;
    return;
  }

  // Check draw
  if ([...board].every(cell => cell.innerHTML !== "") && !gameWon) {
    desc.textContent = "It's a draw 🤝";
    resultImage.innerHTML = `<img src="https://i.giphy.com/faQ96sLh7nH5P91OLn.webp" style="width: 250px;" />`;
    return;
  }

  currentTurn = "X";
  desc.textContent = "Your turn!!";
  }, 900);
}

// ✅ 3. Cell click event
board.forEach((cell) => {
  cell.addEventListener("click", function () {
    if (gameWon) return;

    if (cell.innerHTML === "") {
      cell.innerHTML = currentTurn;

      if (checkWin("X")) {
        desc.textContent = "You win 🏆";
        resultImage.innerHTML = `<img src="https://i.giphy.com/4jE8HiqhsEh6s81DrS.webp" style="width: 250px;" />`;
        winnerAudio.play();
        return;
      }
 
      // Check draw

  if ([...board].every(cell => cell.innerHTML !== "") && !gameWon) {
    desc.textContent = "It's a draw 🤝";
    resultImage.innerHTML = `<img src="https://i.giphy.com/faQ96sLh7nH5P91OLn.webp" style="width: 250px;" />`;
    return;
  }

      currentTurn = "O";
      setTimeout(aiTurn, 700);

    } else {
      messageBox.textContent = "Already taken!";
      messageBox.style.color = "red";
      messageBox.style.fontSize = "20px";
      messageBox.style.fontWeight = "bold";
      setTimeout(() => (messageBox.textContent = ""), 1500);
    }
  });
});


// ✅ 4. Reset Game Logic
reset.addEventListener("click", function () {
  board.forEach(cell => cell.innerHTML = "");
  currentTurn = "X";
  gameWon = false;
  
  resultImage.innerHTML = "";

  setTimeout(() => {
    reset.innerHTML = "Game Reset";
    reset.style.backgroundColor = "blue";
    reset.style.fontSize = "14px";
    reset.style.fontWeight = "bolder";
    resultImage.innerHTML = `<img src="https://i.giphy.com/l1J3preURPiwjRPvG.webp" style="width: 200px;" />`;
    desc.textContent = "Your turn!!";
  }, 100);

  setTimeout(() => {
    reset.innerHTML = "Reset";
    reset.style.backgroundColor = "green";
    resultImage.innerHTML = "";
  }, 2650);
});

