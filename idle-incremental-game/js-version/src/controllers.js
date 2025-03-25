// controllers.js
import { createUpgrade, upOb } from "./upgrades";
import { achievements, addAchievement } from "./achievements";
import { variables } from "./index";
import { createTarget } from "./target";

let moneyDisplayer = document.querySelector("#money-displayer");
let damageDisplayer = document.querySelector("#damage-displayer");
let passiveDamageDisplayer = document.querySelector(
  "#passive-damage-displayer"
);
let defeatedDisplayer = document.querySelector("#defeated-displayer");

function updateInfo() {
  moneyDisplayer.textContent = `Money: ${variables.money}`;
  damageDisplayer.textContent = `Damage: ${variables.damage}`;
  passiveDamageDisplayer.textContent = `Passive Damage: ${variables.passiveDamage}`;
  defeatedDisplayer.textContent = `Targets Defeated: ${variables.defeated}`;
  const rebirthBtn = document.querySelector("#rebirth");
  if (variables.money >= 100000) {
    rebirthBtn.style.visibility = "visible";
  } else {
    rebirthBtn.style.visibility = "hidden";
  }
}

function reset() {
  variables.money = 0;
  variables.defeated = 0;
  variables.damage = 1;
  variables.passiveDamage = 0;
  updateInfo();
  createTarget();
  upOb.upgrades = [];
  const upgradesDOM = document.querySelectorAll(".upgrades div");
  upgradesDOM.forEach((u) => {
    u.remove();
  });
  createUpgrade("Stick", "A stick", 1);
}

let uuUptime = setInterval(function updateUptime() {
  variables.uptime++;

  if (variables.uptime >= 1800 && achievements.time1.completed == false) {
    addAchievement(achievements.time1.title, achievements.time1.color);
    achievements.time1.completed = true;
  }
  if (variables.uptime >= 3600 && achievements.time2.completed == false) {
    addAchievement(achievements.time2.title, achievements.time2.color);
    achievements.time2.completed = true;
  }
}, 1000);

export { updateInfo, reset, uuUptime };
