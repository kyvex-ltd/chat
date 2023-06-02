// NAV BAR SCROLL
const
  NAVBAR = document.getElementById("nav"),
  HERO = document.getElementById("hero");

window.addEventListener("scroll", () => {
  if (window.scrollY > HERO.offsetHeight) NAVBAR.style.top = "0";
  else NAVBAR.style.top = "-256px";
});

// If an element in the nav is focussed, make sure the nav is visible
NAVBAR.addEventListener("focusin", () => {
  NAVBAR.style.top = "0";
});
