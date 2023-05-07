// NAV BAR SCROLL
const
  NAVBAR = document.getElementById("nav"),
  HERO = document.getElementById("hero");

window.addEventListener("scroll", () => {
  if (window.scrollY > HERO.offsetHeight) NAVBAR.style.top = "0";
  else NAVBAR.style.top = "-256px";
});

// THEME MANAGER
const
  THEME_ICON = document.getElementById("theme-toggle"),
  NAV = document.getElementById("nav");

let
  THEME = localStorage.getItem("theme");

localStorage.setItem("theme", THEME);

if (THEME === "dark") {
  document.body.classList.add("dark");
  THEME_ICON.classList.replace("ai-sun-fill", "ai-moon-fill");
} else {
  document.body.classList.remove("dark");
  document.body.classList.add("light");
  THEME_ICON.classList.replace("ai-moon-fill", "ai-sun-fill");
}

function change_theme() {
  if (THEME === "dark") {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    THEME_ICON.classList.replace("ai-moon-fill", "ai-sun-fill");
    THEME = "light";
  } else {
    document.body.classList.remove("light");
    document.body.classList.add("dark");
    THEME_ICON.classList.replace("ai-sun-fill", "ai-moon-fill");
    THEME = "dark";
  }
  localStorage.setItem("theme", THEME);
}

// When theme icon is clicked or enter key is pressed
THEME_ICON.addEventListener("click", change_theme);
THEME_ICON.addEventListener("keyup", (e) => {
  if (e.key === "Enter") change_theme();
});

// If an element in the nav is focussed, make sure the nav is visible
NAV.addEventListener("focusin", () => {
  NAVBAR.style.top = "0";
});

// NAV BAR
