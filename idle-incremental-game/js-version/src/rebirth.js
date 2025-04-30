import { variables } from "./index";
import { reset } from "./controllers";
import { achievements, addAchievement } from "./achievements";

function Rebirth() {
  const rebirthBtn = document.querySelector("#rebirth");
  rebirthBtn.addEventListener("click", () => {
    reset();
    variables.rebirth++;
  });
  if (achievements.rebirth.completed == false) {
    addAchievement(achievements.rebirth.title, achievements.rebirth.color);
    achievements.rebirth.completed = true;
  }
}

export { Rebirth };
