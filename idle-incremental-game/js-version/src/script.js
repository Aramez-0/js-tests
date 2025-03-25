let money = 0;
let defeated = 0;
let damage = 1;
let passiveDamage = 0;
let rebirth = 1;

let moneyDisplayer = document.querySelector("#money-displayer");
let damageDisplayer = document.querySelector("#damage-displayer");
let passiveDamageDisplayer = document.querySelector(
  "#passive-damage-displayer"
);
let defeatedDisplayer = document.querySelector("#defeated-displayer");

let uptime = 0;

function updateUptime() {
  uptime++;

  if (uptime >= 1800 && achievements.time1.completed == false) {
    addAchievement(achievements.time1.title, achievements.time1.color);
    achievements.time1.completed = true;
  }
  if (uptime >= 3600 && achievements.time2.completed == false) {
    addAchievement(achievements.time2.title, achievements.time2.color);
    achievements.time2.completed = true;
  }
}

setInterval(updateUptime, 1000);

function updateInfo() {
  moneyDisplayer.textContent = `Money: ${money}`;
  damageDisplayer.textContent = `Damage: ${damage}`;
  passiveDamageDisplayer.textContent = `Passive Damage: ${passiveDamage}`;
  defeatedDisplayer.textContent = `Targets Defeated: ${defeated}`;
  if (money >= 100000) {
    rebirthBtn.style.visibility = "visible";
  } else {
    rebirthBtn.style.visibility = "hidden";
  }
}

class Upgrade {
  constructor(name, desc, price) {
    this.name = name;
    this.desc = desc;
    this.price = price;
    this.damage = Math.round(this.price / 2 + 1);
  }

  buy() {
    money -= this.price;
    damage += this.damage * rebirth;
    this.price *= 2;
    checkUpgradePrice();
    updateInfo();
  }
}

class passiveUpgrade {
  constructor(name, desc, price) {
    this.name = name;
    this.desc = desc;
    this.price = price;
    this.damage = Math.round(this.price / 100 + 1);
  }

  buy() {
    money -= this.price;
    passiveDamage += this.damage * rebirth;
    this.price *= 2;
    checkUpgradePrice();
    updateInfo();
  }
}

let upgrades = [];

function createUpgrade(name, desc, price, passive) {
  let append = document.querySelector(".upgrades");
  let container = document.createElement("div");
  container.classList.add("upgrade-container");
  append.appendChild(container);

  let upgradeName = document.createElement("h3");
  upgradeName.textContent = name;
  container.appendChild(upgradeName);

  let upgradeDescription = document.createElement("p");
  upgradeDescription.textContent = desc;
  container.appendChild(upgradeDescription);

  let upgradePrice = document.createElement("p");
  upgradePrice.textContent = `$${price}`;
  container.appendChild(upgradePrice);

  let upgradeBtn = document.createElement("button");
  upgradeBtn.textContent = "Buy";
  upgradeBtn.disabled = true;
  container.appendChild(upgradeBtn);

  let upgrade = new Upgrade(name, desc, price);

  if (passive) {
    upgrade = new passiveUpgrade(name, desc, price);
  }

  upgrades.push({ upgrade, container, upgradePrice, upgradeBtn });

  upgradeBtn.addEventListener("click", () => {
    if (money >= upgrade.price) {
      upgrade.buy();
      upgradePrice.textContent = `$${upgrade.price}`;
      upgradeBtn.disabled = true;
    }
  });
}

createUpgrade("Stick", "A stick", 1);

let stone = false;
let flower = false;
let tooth = false;
let hug = false;
let cultivate = false;

function checkUpgradePrice() {
  upgrades.forEach(({ upgrade, upgradeBtn }) => {
    if (money >= upgrade.price) {
      upgradeBtn.disabled = false;
    } else {
      upgradeBtn.disabled = true;
    }
  });
}

function UpdatePassiveDamage() {
  updateHit(true);
}

setInterval(UpdatePassiveDamage, 100);

function checkNewUpgrades() {
  if (money >= 10 && !stone) {
    createUpgrade("Stone", "A stone", 10);
    stone = true;
  } else if (money >= 20 && !flower) {
    createUpgrade("Flower", "A flower", 20);
    flower = true;
  } else if (money >= 40 && !tooth) {
    createUpgrade("Tooth", "A tooth", 40);
    tooth = true;
  } else if (money >= 80 && !hug) {
    createUpgrade("Hug", "A hug", 80);
    hug = true;
  } else if (money >= 160 && !cultivate) {
    createUpgrade("Cultivate", "You discover cultivation", 160, true);
    cultivate = true;
  }
}

function updateHit(passive) {
  x.hit(passive);
  eletarget.textContent = x.health;
}

class Target {
  constructor(level) {
    this.drop = level;
    this.health = level * 2 + 1;
  }

  hit(passive) {
    if (passive) {
      this.health -= passiveDamage;
    } else {
      this.health -= damage;
    }
    this.targetDefeated();
  }

  targetDefeated() {
    if (this.health <= 0) {
      defeated += 1;
      money += this.drop + 1;
      checkNewUpgrades();
      checkUpgradePrice();
      createTarget();
      updateInfo();
    }
  }
}

let eletarget = document.querySelector("#target");

let x = null;

function createTarget() {
  let target = new Target(defeated % 10 == 0 ? defeated * 5 : defeated);
  x = target;

  if (defeated % 10 == 0 && defeated != 0) {
    eletarget.classList.add("boss");
  } else if (eletarget.classList.contains("boss")) {
    eletarget.classList.remove("boss");
  }
}
createTarget();

eletarget.textContent = x.health;
eletarget.addEventListener("click", () => {
  updateHit(false);
});

function createBoost() {
  let top = Math.round(Math.random() * 100);
  let left = Math.round(Math.random() * 100);

  let container = document.querySelector("#container");
  let div = document.createElement("div");
  div.classList.add("boost");
  div.style.top = `${top}%`;
  div.style.left = `${left}%`;
  container.appendChild(div);

  div.addEventListener("click", () => {
    let index = Math.round(Math.random());
    if (index == 0) {
      damage += 2;
      setTimeout(() => {
        damage /= 2;
      }, 10000);
    } else {
      passiveDamage += 2;
      setTimeout(() => {
        passiveDamage /= 2;
      }, 10000);
    }

    if (achievements.void.completed === false) {
      addAchievement(achievements.void.title, achievements.void.color);
      achievements.void.completed = true;
    }

    div.remove();
  });
  setTimeout(() => {
    div.remove();
  }, 3000);
}

setInterval(createBoost, 300000);

function addAchievement(title, color) {
  let container = document.querySelector("#achievements-container");
  let div = document.createElement("div");
  div.className = "achievement";
  div.title = title;
  div.style.backgroundColor = color;
  container.appendChild(div);
}

let achievements = {
  void: {
    title: "Stare into the void: click a black square",
    color: "black",
    completed: false,
  },
  time1: {
    title: "Time is constant: play for 30 minutes",
    color: "purple",
    completed: false,
  },
  time2: {
    title: "All you see ahead; is the future: play for 1 hour",
    color: "purple",
    completed: false,
  },
};

let achievementsContainer = document.querySelector("#achievements-container");
achievementsContainer.style.visibility = "hidden";
let openAchievements = document.querySelector(".open-achievements");
openAchievements.addEventListener("click", () => {
  if (achievementsContainer.style.visibility == "hidden") {
    achievementsContainer.style.visibility = "visible";
  } else {
    achievementsContainer.style.visibility = "hidden";
  }
});

// rebirth section
const rebirthBtn = document.querySelector("#rebirth");
rebirthBtn.addEventListener("click", () => {
  reset();
  rebirth++;
});

function reset() {
  money = 0;
  defeated = 0;
  damage = 1;
  passiveDamage = 0;
  updateInfo();
  createTarget();
  upgrades = [];
  const upgradesDOM = document.querySelectorAll(".upgrades div");
  upgradesDOM.forEach((u) => {
    u.remove();
  });
  createUpgrade("Stick", "A stick", 1);
}
// have to do something about the damage of upgrades
// potential to have relevant values depend on defeated, check react version for example
// should probably seperate this into modules
