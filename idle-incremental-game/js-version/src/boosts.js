import { variables } from "./index";
import { achievements, addAchievement } from "./achievements";

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
      variables.damage += 2;
      setTimeout(() => {
        variables.damage /= 2;
      }, 10000);
    } else {
      variables.passiveDamage += 2;
      setTimeout(() => {
        variables.passiveDamage /= 2;
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

export { createBoost };
