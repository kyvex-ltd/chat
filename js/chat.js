import {
  api_url, test_url,
  getTheme, setTheme,
  getQueryParam,
  emojis
} from './chat/misc.js';
import {refreshCommunityView} from './chat/communityView.js';
import {refreshUserView} from './chat/userView.js';
import {refreshChannelView} from './chat/channelView.js';
import {toggleCommunityList} from './chat/communityList.js';
import {createCommunity} from './chat/createCommunity.js';

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

const communities = [];
const users = [];
const channels = [];

const channelContainer = document.querySelector(`#channel__view`);
const userContainer = document.querySelector(`#user__view`);
const communityContainer = document.querySelector(`#community__view`);

function refreshViews() {
  refreshChannelView(channels, channelContainer);
  refreshUserView(users, userContainer);
  refreshCommunityView(communities, communityContainer);
}

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

  fetch(`${test_url}/api/v1/users/${tag}`, {
    method: "GET",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  })
    .then(res => res.json())
    .then(data => {
      data.user.servers.forEach(server => {
        fetch(`${test_url}/api/v1/community/${server.serverId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        })
          .then(res => res.json())
          .then(data => {
            const uint8Array = new Uint8Array(data.community.icon.data);
            const blob = new Blob([uint8Array], {type: "image/png"});
            const imgURI = URL.createObjectURL(blob);

            communities.push([data.community.name, imgURI, data.community.id]);
            refreshViews();
          });
      });
      refreshViews();
    });
} catch (err) {
  console.error(err);
}

const createCommunityButton = document.querySelector(`#create__community__submit`);
const createCommunityContainer = document.querySelector(`#dialog__create__community`);

createCommunityButton.addEventListener(`click`, createCommunity);
