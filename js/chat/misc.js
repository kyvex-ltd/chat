const api_url = "https://api.chat.kyvex.co.uk:3000", test_url = "http://localhost:3000";
let url;

url = test_url;
if (window.location.hostname === "localhost") url = test_url;
if (window.location.hostname === "chat.kyvex.co.uk") url = api_url;

console.log(`Using ${url}!`);
export {url};

export function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

export function getTheme() {
  return localStorage.getItem("theme") || "system";
}

export function setTheme(theme) {
  theme = theme.toLowerCase();
  if (theme !== "light" || theme !== "dark" || theme !== "system" || theme !== "custom") return;
  localStorage.setItem("theme", theme);
}

export const emojis = {
  'general': `🌎`,
  'off-topic': `🎲`,
  'game': `🎮`,
  'programming': `‍💻`,
  'bot': '🤖',
  'other': `📁`
};
