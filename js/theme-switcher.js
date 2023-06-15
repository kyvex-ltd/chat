const THEME_ICON = document.getElementById("theme-toggle"), BODY = document.body;
let THEME = localStorage.getItem("theme");

function toggleTheme() {
  if (THEME === "dark") {
    THEME = "light";
    BODY.classList.remove("dark");
    BODY.classList.add("light");
    THEME_ICON.classList.replace("ai-moon-fill", "ai-sun-fill");
  } else {
    THEME = "dark";
    BODY.classList.remove("light");
    BODY.classList.add("dark");
    THEME_ICON.classList.replace("ai-sun-fill", "ai-moon-fill");
  }
  localStorage.setItem("theme", THEME);
}

THEME_ICON.addEventListener("click", toggleTheme);

// listen for changes in local storage
window.addEventListener("storage", (event) => {
  if (event.key === "theme") toggleTheme();
});
