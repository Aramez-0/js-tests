/*
 add a point increase display near points display, after round, timeout(reset pointIncrease, 1000)
 flashing border around a win line would be nice
*/

const slots = document.querySelectorAll(".slot");
const bRoll = document.querySelector("#roll");
const displayPoints = document.querySelector("#points");
const displayUpgrades = document.querySelector("#upgrades");
const buyUpgrade = document.querySelector("#buy-upgrade");
let points = 0;
let baseChoices = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let numChoices = [0, 1, 2, 3, 4, 5, 6, 7, 8];

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
  slots.forEach((slot) => numChange(slot));
  setTimeout(() => {
    checkMatchPoints();
    numChoices = Array.from(baseChoices);
  }, 2800);
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

function matchpoints(a, b, c) {
  if (a === b && b === c) {
    let f = parseInt(a);
    if (f === 0) f = 10;
    updatePoints(f);
  }
}

function checkMatchPoints() {
  matchpoints(slots[0].textContent, slots[1].textContent, slots[2].textContent);
  matchpoints(slots[3].textContent, slots[4].textContent, slots[5].textContent);
  matchpoints(slots[6].textContent, slots[7].textContent, slots[8].textContent);
  matchpoints(slots[0].textContent, slots[3].textContent, slots[6].textContent);
  matchpoints(slots[1].textContent, slots[4].textContent, slots[7].textContent);
  matchpoints(slots[2].textContent, slots[5].textContent, slots[8].textContent);
  matchpoints(slots[0].textContent, slots[4].textContent, slots[8].textContent);
  matchpoints(slots[2].textContent, slots[4].textContent, slots[6].textContent);
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
  if (points >= (i == 0 ? 9 * 10 : i * 10) && !arr.includes(i)) {
    addUpgrade(i);
  } else if (points < (i == 0 ? 9 * 10 : i * 10) && arr.includes(i)) {
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
