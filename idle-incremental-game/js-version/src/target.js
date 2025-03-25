// target.js
import { variables } from "./index";
import { updateInfo } from "./controllers";
import { checkNewUpgrades, checkUpgradePrice } from "./upgrades";

let x;

class Target {
  constructor(level) {
    this.drop = level;
    this.health = level * 2 + 1;
  }

  hit(passive) {
    if (passive) {
      this.health -= variables.passiveDamage;
    } else {
      this.health -= variables.damage;
    }
    this.targetDefeated();
  }

  targetDefeated() {
    if (this.health <= 0) {
      variables.defeated += 1;
      variables.money += this.drop + 1;
      checkNewUpgrades();
      checkUpgradePrice();
      createTarget();
      updateInfo();
    }
  }
}
let eletarget = document.querySelector("#target");

function createTarget() {
  let target = new Target(
    variables.defeated % 10 == 0 ? variables.defeated * 5 : variables.defeated
  );
  x = target;

  if (variables.defeated % 10 == 0 && variables.defeated != 0) {
    eletarget.classList.add("boss");
  } else if (eletarget.classList.contains("boss")) {
    eletarget.classList.remove("boss");
  }
}

function manualDamage() {
  eletarget.addEventListener("click", () => {
    updateHit(false);
  });
}
function updateHit(passive) {
  x.hit(passive);
  eletarget.textContent = x.health;
}

function UpdatePassiveDamage() {
  updateHit(true);
}

export { UpdatePassiveDamage, createTarget, manualDamage };

// why does webpack say can'r access lexical declaration y nefore initialisation
