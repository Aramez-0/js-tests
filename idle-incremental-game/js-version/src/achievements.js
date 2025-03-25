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

function achievementBtn() {
  let achievementsContainer = document.querySelector("#achievements-container");
  achievementsContainer.style.visibility = "hidden";
  let openAchievements = document.querySelector(".open-achievements");
  openAchievements.addEventListener("click", () => {
    achievementsContainer.style.visibility == "hidden"
      ? (achievementsContainer.style.visibility = "visible")
      : (achievementsContainer.style.visibility = "hidden");
  });
}
export { achievements, addAchievement, achievementBtn };
