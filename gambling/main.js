const slots = document.querySelectorAll(".slot");
const bRoll = document.querySelector("#roll");
const displayPoints = document.querySelector("#points");
const displayUpgrades = document.querySelector("#upgrades");
const buyUpgrade = document.querySelector("#buy-upgrade");
const displayPlusPoint = document.querySelector("#plus-points");
let points = 0;
let baseChoices = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let numChoices = Array.from(baseChoices);
let pointIncrease = 0;

bRoll.addEventListener("click", roll);

function randomNum(slot) {
  let n = numChoices[Math.floor(Math.random() * numChoices.length)];
  numChoices.push(n);
  switch (n) {
    case 0:
      slot.className = "slot one";
      break;
    case 1:
      slot.className = "slot two";
      break;
    case 2:
      slot.className = "slot three";
      break;
    case 3:
      slot.className = "slot four";
      break;
    case 4:
      slot.className = "slot five";
      break;
    case 5:
      slot.className = "slot six";
      break;
    case 6:
      slot.className = "slot seven";
      break;
    case 7:
      slot.className = "slot eight";
      break;
    case 8:
      slot.className = "slot nine";
  }
  return n;
}

function roll() {
  bRoll.removeEventListener("click", roll);
  displayPlusPoint.textContent = "";
  slots.forEach((slot) => numChange(slot));
  setTimeout(() => {
    checkMatchPoints();
    displayPlusPoint.textContent = `+${pointIncrease}`;
    pointIncrease = 0;
    numChoices = Array.from(baseChoices);
  }, 2750);
  setTimeout(() => {
    bRoll.addEventListener("click", roll);
  }, 3000);
}

function numChange(slot) {
  let i = 0;
  const interval = setInterval(() => {
    slot.textContent = randomNum(slot);
    i++;
    if (i === 5) {
      clearInterval(interval);
    }
  }, 500);
}

function matchpoints(e, a, b, c, d = c) {
  if (
    a.textContent === b.textContent &&
    b.textContent === c.textContent &&
    c.textContent === d.textContent
  ) {
    a.classList.add("score");
    b.classList.add("score");
    c.classList.add("score");
    d.classList.add("score");
    let f = parseInt(a.textContent);
    if (f === 0) f = 10;
    updatePoints(f * e);
    pointIncrease += f * e;
  }
}

function checkMatchPoints() {
  matchpoints(3, slots[0], slots[1], slots[2]);
  matchpoints(3, slots[3], slots[4], slots[5]);
  matchpoints(3, slots[6], slots[7], slots[8]);
  matchpoints(3, slots[0], slots[3], slots[6]);
  matchpoints(3, slots[1], slots[4], slots[7]);
  matchpoints(3, slots[2], slots[5], slots[8]);
  matchpoints(3, slots[0], slots[4], slots[8]);
  matchpoints(3, slots[2], slots[4], slots[6]);
  matchpoints(4, slots[1], slots[3], slots[5], slots[7]);
  matchpoints(4, slots[0], slots[1], slots[3], slots[4]);
  matchpoints(4, slots[1], slots[2], slots[4], slots[5]);
  matchpoints(4, slots[3], slots[4], slots[6], slots[7]);
  matchpoints(4, slots[4], slots[5], slots[7], slots[8]);
}

buyUpgrade.addEventListener("click", () => {
  if (displayUpgrades.children.length == 0) {
    return;
  }
  let value = parseInt(displayUpgrades.value);
  baseChoices.push(value);
  if (value == 0) {
    updatePoints(-90);
  } else {
    updatePoints(-value * 10);
  }
});

function addUpgrade(type) {
  let option = document.createElement("option");
  let same = baseChoices.filter((n) => {
    return n == type;
  }).length;
  option.value = type;
  option.id = `up-${type}`;
  option.textContent = `Increase ${type} chance ${Math.round(100 / same)}%`;
  displayUpgrades.appendChild(option);
}

function checkUpgrade(i, arr) {
  if (points >= (i == 0 ? 10 : i) * 10 && !arr.includes(i)) {
    addUpgrade(i);
  } else if (points < (i == 0 ? 10 : i) * 10 && arr.includes(i)) {
    document.querySelector(`#up-${i}`).remove();
  }
}

function checkIfUpgrade() {
  let arr = [];
  for (let i of displayUpgrades.children) {
    arr.push(parseInt(i.value));
  }
  for (let i = 0; i < 9; i++) {
    checkUpgrade(i, arr);
  }
}

function updatePoints(amount) {
  points += amount;
  checkIfUpgrade();
  displayPoints.textContent = `Points: ${points}`;
}
