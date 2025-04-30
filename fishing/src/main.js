// get document variables
const pond = document.querySelector("#fishing-hole");
const meter = document.querySelector("meter");
const pointsDisplay = document.querySelector("#points");
const fishStatus = document.querySelector("#fish-status");
const fishDisplayCrcl = document.querySelector("#fish-crcl-display");
const upStrengthBtn = document.querySelector("#upgrade-strength");

// tracking variables
let pull = 50;
let fish;
let pullTarget;
let points = 0;
let currentlyFishing = false;
let inter;
let playerStrength = 1;
let upgradeStrength = 100;

// ai generated array
let fishList = [
  { name: "Goldfish", points: 5 },
  { name: "Tuna", points: 15 },
  { name: "Salmon", points: 12 },
  { name: "Clownfish", points: 8 },
  { name: "Anglerfish", points: 25 },
  { name: "Catfish", points: 10 },
  { name: "Swordfish", points: 30 },
  { name: "Pufferfish", points: 18 },
  { name: "Shark", points: 50 },
  { name: "Mackerel", points: 7 },
];

function createFish() {
  fish = fishList[Math.floor(Math.random() * fishList.length)];
  pullTarget = fish.points;
  pull = pullTarget / 3;
  meter.max = pullTarget;
  meter.low = pullTarget / 4;
  meter.high = pullTarget * 0.75;
  meter.optimum = pullTarget;
  meter.value = pull;
  fishCrclThing();
}
createFish();

function fishCrclThing() {
  if (fish.points > 20) {
    fishDisplayCrcl.className = "large-crcl";
  } else if (fish.points > 10) {
    fishDisplayCrcl.className = "medium-crcl";
  } else {
    fishDisplayCrcl.className = "small-crcl";
  }
}

pond.addEventListener("click", () => {
  if (!currentlyFishing) {
    fishFight();
    currentlyFishing = true;
  }
  pull += playerStrength;
  meter.value = pull;
  if (pull >= pullTarget) {
    clearInterval(inter);
    displayFishStatus("Caught");
    points += pullTarget;
    pointsDisplay.textContent = `Points: ${points}`;
    if (points >= upgradeStrength) {
      upStrengthBtn.disabled = false;
    }
    createFish();
    currentlyFishing = false;
  }
});

function fishFight() {
  inter = setInterval(() => {
    pull -= pullTarget / 4;
    meter.value = pull;
    if (pull <= 0) {
      displayFishStatus("Lost");
      createFish();
      currentlyFishing = false;
      clearInterval(inter);
    }
  }, 1000);
}

function displayFishStatus(log) {
  fishStatus.classList.remove("hidden");
  fishStatus.textContent = `${log} ${fish.name}`;
  setTimeout(() => {
    fishStatus.classList.add("hidden");
  }, 1000);
}

upStrengthBtn.addEventListener("click", () => {
  if (points >= upgradeStrength) {
    playerStrength += 1;
    points -= upgradeStrength;
    upgradeStrength *= 2;
    pointsDisplay.textContent = points;
    upStrengthBtn.textContent = upgradeStrength;
    if (points < upgradeStrength) {
      upStrengthBtn.disabled = true;
    }
  }
});
