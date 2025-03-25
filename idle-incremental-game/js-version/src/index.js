// index.js
import "./style.css";

let variables = {
  money: 0,
  defeated: 0,
  damage: 1,
  passiveDamage: 0,
  rebirth: 1,
  uptime: 0,
};

export { variables };

import { uuUptime } from "./controllers";
uuUptime;

import { Rebirth } from "./rebirth";
Rebirth();

import { createBoost } from "./boosts";
setInterval(createBoost, 300000);

import { achievementBtn } from "./achievements";
achievementBtn();

import { UpdatePassiveDamage, manualDamage, createTarget } from "./target";
createTarget();
setInterval(UpdatePassiveDamage, 100);
manualDamage();

import { createUpgrade } from "./upgrades";
createUpgrade("stick", "A stick", 1);
