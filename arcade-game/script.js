const strip = document.querySelector("#strip-container");
const startMain = document.querySelector("#start-game");
const startBlur = document.querySelector("#start-blur");
const startDifficulty = document.querySelector("#difficulty")
let currentPlayerPosition = 48;

startMain.addEventListener("click", () => {
  startBlur.style.visibility = "hidden";
  main(startDifficulty.value);
});

function main(d) {
    let difficulty = d
  let currentlyPlaying = true;

  function handlePlayerMovement(e) {
    if (
      e.key === "ArrowLeft" &&
      currentPlayerPosition % 10 != 1 &&
      currentPlayerPosition % 10 != 6
    ) {
      updatePlayerPosition(-1);
    } else if (
      e.key === "ArrowDown" &&
      currentPlayerPosition != 46 &&
      currentPlayerPosition != 47 &&
      currentPlayerPosition != 48 &&
      currentPlayerPosition != 49 &&
      currentPlayerPosition != 50
    ) {
      updatePlayerPosition(5);
    } else if (e.key === "ArrowRight" && currentPlayerPosition % 5 != 0) {
      updatePlayerPosition(1);
    } else if (
      e.key === "ArrowUp" &&
      currentPlayerPosition != 1 &&
      currentPlayerPosition != 2 &&
      currentPlayerPosition != 3 &&
      currentPlayerPosition != 4 &&
      currentPlayerPosition != 5
    ) {
      updatePlayerPosition(-5);
    }
  }

  document.addEventListener("keydown", handlePlayerMovement);

  function updatePlayerPosition(n) {
    if (
      document
        .querySelector(`.p-${currentPlayerPosition + n}`)
        .classList.contains("enemy")
    ) {
      reset();
      return;
    }
    document
      .querySelector(`.p-${currentPlayerPosition}`)
      .classList.remove("player");
    document
      .querySelector(`.p-${currentPlayerPosition + n}`)
      .classList.add("player");
    currentPlayerPosition += n;
  }

  const enemySpawn = setInterval(() => {
    let spawned = 0;
    for (let i = 1; i < 6; i++) {
      if (Math.floor(Math.random() * (5 - difficulty)) == 0 && spawned < 4) {
        spawned++;
        document.querySelector(`.p-${i}`).classList.add("enemy");
        moveEnemy(i);
      }
    }
  }, 4000 / difficulty);

  function moveEnemy(n) {
    let i = n;
    const set = setInterval(() => {
      if (i == n + 45 || currentlyPlaying === false) {
        document.querySelector(`.p-${i}`).classList.remove("enemy");
        clearInterval(set);
        return;
      }
      document.querySelector(`.p-${i}`).classList.remove("enemy");
      document.querySelector(`.p-${i + 5}`).classList.add("enemy");
      if (document.querySelector(`.p-${i + 5}`).classList.contains("player")) {
        reset()
        return
      }
      i += 5;
    }, 1200 / difficulty);
  }

  function reset() {
    currentlyPlaying = false;
    document.removeEventListener("keydown", handlePlayerMovement);
    clearInterval(enemySpawn);
    startBlur.style.visibility = "visible";
    document
      .querySelector(`.p-${currentPlayerPosition}`)
      .classList.remove("player");
    document.querySelector(".p-48").classList.add("player");
    currentPlayerPosition = 48;
    const divs = document.querySelectorAll("#strip-container div");
    for (let i of divs) {
      if (i.classList.contains("enemy")) {
        i.classList.remove("enemy");
      }
    }
  }
}
