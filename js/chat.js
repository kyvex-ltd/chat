import {
  url,
  getTheme, setTheme,
  getQueryParam,
  emojis
} from './chat/misc.js';
import {hideCommunityList, toggleCommunityList} from './chat/communityList.js';
import {createCategory, createChannel, createCommunity} from './chat/createX.js';
import {addCommunity} from './chat/addToView.js';

const community = getQueryParam("community");
const channel = getQueryParam("channel");
const user = getQueryParam("user");

const theme = getTheme();
document.body.classList.toggle("dark", theme === "dark");
document.body.classList.toggle("light", theme === "light");

window.addEventListener("storage", (event) => {
  if (event.key === "theme") {
    const theme = event.newValue || "light";
    document.body.classList.toggle("dark", theme === "dark");
    document.body.classList.toggle("light", theme === "light");
  }
});

// Verify whether the user is logged in
setInterval(() => {
  try {
    fetch(`${url}/api/v1/auth/logged-in`, {
      method: `GET`,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem(`token`)}`
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.status !== 200) {
          localStorage.removeItem(`token`);
          localStorage.removeItem(`user`);
          alert(`You're not logged in!`);
          return window.location.href = `/login.html`;
        }
      })
      .catch(err => console.error(err));
  } catch (e) {
    console.error(e);
  }

}, 1000);

const communities = [], users = [], channels = [];

const channelContainer = document.querySelector(`#channel__view`);
const userContainer = document.querySelector(`#user__view`);
const communityContainer = document.querySelector(`#community__view`);

const communitiesButton = document.querySelector(`#show__communities`);
const communitiesContainer = document.querySelector(`#communities__container`);

communitiesButton.addEventListener(`click`, () => {
  toggleCommunityList(communitiesContainer);
});
communitiesContainer.addEventListener(`click`, (e) => {
  if (!e.target.classList.contains(`server`)) hideCommunityList(communitiesContainer);
});

document.addEventListener(`keydown`, (e) => {
  if (e.key === `Escape`) hideCommunityList(communitiesContainer);

  if (e.ctrlKey || e.metaKey) {
    if (e.key === `k` || e.key === `l`) {
      e.preventDefault();
      toggleCommunityList(communitiesContainer);
    }
  }
});

try {
  const userData = JSON.parse(localStorage.getItem("user"));
  const tag = userData.tag;

  fetch(`${url}/api/v1/users/${tag}`, {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${localStorage.getItem(`token`)}`
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      data.user.servers.forEach(server => {
        fetch(`${url}/api/v1/community/${server.serverId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        })
          .then(res => res.json())
          .then(data => {
            console.log(data)
            if (data.status === 200) addCommunity(data.community, communityContainer);
          });
      });
    });
} catch (err) {
  console.error(err.stack);
}

const createButtons = {
  community: document.querySelector(`#create__community__submit`),
  category: document.querySelector(`#create__category__submit`),
  channel: document.querySelector(`#create__channel__submit`)
}

createButtons.community.addEventListener(`click`, () => {
  createCommunity();
});

createButtons.category.addEventListener(`click`, () => {
  return alert(`501: This feature is not yet implemented`);
});

createButtons.channel.addEventListener(`click`, () => {
  return alert(`501: This feature is not yet implemented`);
});

document.querySelectorAll(`.accordion`).forEach((accordion) => {
  accordion.addEventListener(`click`, (e) => {
    if (!e.currentTarget.dataset) return;
    let expanded = e.currentTarget.dataset.expanded;
    if (expanded === `true`) e.currentTarget.dataset.expanded = `false`;
    else e.currentTarget.dataset.expanded = `true`;
  });
});
