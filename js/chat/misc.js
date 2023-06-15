export const api_url = "https://api.chat.kyvex.co.uk";
export const test_url = "http://localhost:3000";
export const url = api_url;

export function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

export function getTheme() {
  return localStorage.getItem("theme") || "light";
}

export function setTheme(theme) {
  localStorage.setItem("theme", theme);
}


// emojis.js
export const emojis = {
  general: `🌎`,
  'off-topic': `🎲`,
  game: `🎮`,
  programming: `👨‍💻`,
  bot: '🤖',
  other: `📁`
};
