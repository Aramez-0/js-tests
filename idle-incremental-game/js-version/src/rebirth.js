import { variables } from "./index";
import { reset } from "./controllers";

function Rebirth() {
  const rebirthBtn = document.querySelector("#rebirth");
  rebirthBtn.addEventListener("click", () => {
    reset();
    variables.rebirth++;
  });
  console.log(variables.rebirth);
}

export { Rebirth };
