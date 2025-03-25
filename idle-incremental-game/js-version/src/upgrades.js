import { variables } from "./index";
import { updateInfo } from "./controllers";

class Upgrade {
  constructor(name, desc, price) {
    this.name = name;
    this.desc = desc;
    this.price = price;
    this.damage = Math.round(this.price / 2 + 1);
  }

  buy() {
    variables.money -= this.price;
    variables.damage += this.damage * variables.rebirth;
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
    variables.money -= this.price;
    variables.passiveDamage += this.damage * variables.rebirth;
    this.price *= 2;
    checkUpgradePrice();
    updateInfo();
  }
}

let upOb = {
  upgrades: [],
};
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

  upOb.upgrades.push({ upgrade, container, upgradePrice, upgradeBtn });

  upgradeBtn.addEventListener("click", () => {
    if (variables.money >= upgrade.price) {
      upgrade.buy();
      upgradePrice.textContent = `$${upgrade.price}`;
      upgradeBtn.disabled = true;
    }
  });
}

function checkUpgradePrice() {
  upOb.upgrades.forEach(({ upgrade, upgradeBtn }) => {
    if (variables.money >= upgrade.price) {
      upgradeBtn.disabled = false;
    } else {
      upgradeBtn.disabled = true;
    }
  });
}

let stone = false;
let flower = false;
let tooth = false;
let hug = false;
let cultivate = false;

function checkNewUpgrades() {
  if (variables.money >= 10 && !stone) {
    createUpgrade("Stone", "A stone", 10);
    stone = true;
  } else if (variables.money >= 20 && !flower) {
    createUpgrade("Flower", "A flower", 20);
    flower = true;
  } else if (variables.money >= 40 && !tooth) {
    createUpgrade("Tooth", "A tooth", 40);
    tooth = true;
  } else if (variables.money >= 80 && !hug) {
    createUpgrade("Hug", "A hug", 80);
    hug = true;
  } else if (variables.money >= 160 && !cultivate) {
    createUpgrade("Cultivate", "You discover cultivation", 160, true);
    cultivate = true;
  }
}

export { checkNewUpgrades, checkUpgradePrice, createUpgrade, upOb };
