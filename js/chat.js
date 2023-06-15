import {
  url,
  getTheme, setTheme,
  getQueryParam,
  emojis
} from './chat/misc.js';
import {hideCommunityList, toggleCommunityList} from './chat/communityList.js';
import {createCommunity} from './chat/createCommunity.js';
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
  if (!e.target.classList.contains(`server`)) {
    hideCommunityList(communitiesContainer);
  }
});

document.addEventListener(`keydown`, (e) => {
  if (e.key === `Escape`) {
    hideCommunityList(communitiesContainer);
  }

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
    "headers": {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  })
    .then(res => res.json())
    .then(data => {
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
            addCommunity(data.community, communityContainer);
          });
      });
    });

} catch (err) {
  console.error(err);
} finally {

}

const createCommunityButton = document.querySelector(`#create__community__submit`);
const createCommunityContainer = document.querySelector(`#dialog__create__community`);

createCommunityButton.addEventListener(`click`, () => {
  createCommunity(url);
});
