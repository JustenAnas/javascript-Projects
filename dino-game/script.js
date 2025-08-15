document.addEventListener("DOMContentLoaded", () => {
  // State
  let score = 0;
  let scoreIntervalId = null;
  let collisionIntervalId = null;
  let gameOver = false;
  let obstacleIntervalId = null;
  let birdIntervalIds = [];

  // Cached DOM
  const scoreEl = document.getElementById("score");
  const resetBtn = document.getElementById("reset");
  const gameOverImg = document.getElementById("game-over-img");
  const cactusContainer = document.querySelector(".cactus-container");

  function updateScoreDisplay() {
    if (scoreEl) scoreEl.textContent = String(score).padStart(4, "0");
  }

  //btn logic
  document.getElementById("invert-btn").addEventListener("click", function () {
    const gamecontainer = document.querySelector(".game-container");
    const btn = document.getElementById("invert-btn");

    gamecontainer.classList.toggle("inverted");

    if (btn.textContent === "Light Mode") {
      btn.textContent = "Dark Mode";
      btn.style.backgroundColor = "#e8e2e2ff";
      btn.style.color = "#000000";
    } else {
      btn.textContent = "Light Mode";
    }
  });

  // ---------- spawn a random cactus or bird ----------
  function spawnObstacle() {
    if (obstacleIntervalId) clearInterval(obstacleIntervalId);
    obstacleIntervalId = setInterval(() => {
      if (gameOver) return;
      if (!cactusContainer) return;
      cactusContainer.innerHTML = ""; // remove any old obstacle

      const type = Math.random() < 0.5 ? "cactus" : "bird";
      if (type === "cactus") {
        const options = [
          "img/big-cactus1.png",
          "img/big-cactus2.png",
          "img/big-cactus3.png",
          "img/cactus1.png",
          "img/cactus2.png",
          "img/cactus3.png",
        ];
        const randomOption =
          options[Math.floor(Math.random() * options.length)];
        const cactus = document.createElement("img");
        cactus.src = randomOption;
        cactus.alt = "Cactus";
        cactus.className = "cactus";
        cactus.onerror = () =>
          console.error("Cactus failed to load:", cactus.src);
        cactusContainer.appendChild(cactus);
      } else {
        const bird = document.createElement("div");
        bird.className = "bird1"; // default frame
        bird.style.width = Math.random() < 0.5 ? "40px" : "60px"; // random size
        bird.style.height = "40px";
        bird.style.backgroundImage = 'url("img/bird1.png")';
        bird.style.backgroundSize = "cover";
        cactusContainer.appendChild(bird);

        let wingUp = true;
        const flapId = setInterval(() => {
          bird.style.backgroundImage = wingUp
            ? 'url("img/bird1.png")'
            : 'url("img/bird2.png")';
          wingUp = !wingUp;
        }, 150);
        birdIntervalIds.push(flapId);
      }
    }, 2000); // new obstacle every 2 sec
  }

  // ---------- score counter ----------
  function startScoreCounter() {
    if (scoreIntervalId) clearInterval(scoreIntervalId);
    scoreIntervalId = setInterval(() => {
      if (!gameOver) {
        score++;
        updateScoreDisplay();
      }
    }, 100);
  }

  // ---------- collision check ----------
  function startCollisionCheck() {
    if (collisionIntervalId) clearInterval(collisionIntervalId);

    collisionIntervalId = setInterval(() => {
      const dino = document.querySelector(".dino");
      const cactus = document.querySelector(".cactus-container img");
      const birds = document.querySelectorAll(".bird1");

      if (!dino) return;

      const dinoRect = dino.getBoundingClientRect();
      let hit = false;

      if (cactus) {
        const cactusRect = cactus.getBoundingClientRect();
        if (
          dinoRect.right > cactusRect.left &&
          dinoRect.left < cactusRect.right &&
          dinoRect.bottom > cactusRect.top &&
          dinoRect.top < cactusRect.bottom
        ) {
          hit = true;
        }
      }

      birds.forEach((bird) => {
        const birdRect = bird.getBoundingClientRect();
        if (
          dinoRect.right > birdRect.left &&
          dinoRect.left < birdRect.right &&
          dinoRect.bottom > birdRect.top &&
          dinoRect.top < birdRect.bottom
        ) {
          hit = true;
        }
      });

      if (hit) {
        document
          .querySelectorAll(
            ".dino_right_leg, .dino_left_leg, .cactus, .cloud, .track, .jump, .bird1"
          )
          .forEach((el) => {
            el.style.animation = "none";
          });

        birdIntervalIds.forEach((id) => clearInterval(id));
        birdIntervalIds = [];

        document
          .querySelectorAll(".dino_left_leg, .dino_right_leg")
          .forEach((leg) => (leg.style.visibility = "hidden"));

        if (gameOverImg) gameOverImg.style.display = "block";
        if (resetBtn) resetBtn.style.display = "block";

        dino.src = "img/dino-dead.png";
        gameOver = true;

        if (scoreIntervalId) clearInterval(scoreIntervalId);
        if (collisionIntervalId) clearInterval(collisionIntervalId);
        collisionIntervalId = null;
      }
    }, 40);
  }

  // ---------- jump handler ----------
  function setupJumpListeners() {
    document.addEventListener("click", () => {
      if (gameOver) return;
      const parts = document.querySelector(".dino-wrapper");
      const anm = document.querySelectorAll(".dino_left_leg , .dino_right_leg");
      parts.classList.add("jump");
      anm.forEach((leg) => {
        leg.style.animation = "none";
      });
      setTimeout(() => {
        parts.classList.remove("jump");
        anm.forEach((leg) => (leg.style.animation = ""));
      }, 400);
    });

    document.addEventListener("keydown", (e) => {
      if (gameOver) return;
      if ([" ", "ArrowUp", "Enter"].includes(e.key)) {
        const parts = document.querySelector(".dino-wrapper");
        const anm = document.querySelectorAll(
          ".dino_left_leg, .dino_right_leg"
        );
        parts.classList.add("jump");
        anm.forEach((leg) => {
          leg.style.animation = "none";
        });
        setTimeout(() => {
          parts.classList.remove("jump");
          anm.forEach((leg) => {
            leg.style.animation = "";
          });
        }, 400);
      }
    });
  }

  // ---------- reset logic ----------
  function resetGame() {
    if (gameOverImg) gameOverImg.style.display = "none";
    if (resetBtn) resetBtn.style.display = "none";

    document
      .querySelectorAll(
        ".dino, .dino_left_leg, .dino_right_leg, .cactus, .cloud, .track, .jump, .bird1"
      )
      .forEach((el) => (el.style.animation = ""));

    const dino = document.querySelector(".dino");
    if (dino) dino.src = "img/dino.png";

    gameOver = false;
    score = 0;
    updateScoreDisplay();

    document
      .querySelectorAll(".dino, .dino_left_leg, .dino_right_leg")
      .forEach((p) => p.classList.remove("jump"));

    document
      .querySelectorAll(".dino_left_leg, .dino_right_leg")
      .forEach((leg) => (leg.style.visibility = "visible"));

    birdIntervalIds.forEach((id) => clearInterval(id));
    birdIntervalIds = [];

    spawnObstacle();
    startScoreCounter();
    startCollisionCheck();
  }

  // ---------- wire reset button ----------
  if (resetBtn) {
    resetBtn.addEventListener("click", resetGame);
  }

  // ---------- initial boot ----------
  updateScoreDisplay();
  setupJumpListeners();
  spawnObstacle();
  startScoreCounter();
  startCollisionCheck();
});
