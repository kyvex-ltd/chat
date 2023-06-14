import {
  api_url, test_url,
  getTheme, setTheme,
  getQueryParam,
  emojis
} from './chat/misc.js';
import {hideCommunityList, toggleCommunityList} from './chat/communityList.js';
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

            communities.push({
              name: data.community.name,
              // icon: data.community.icon,
              id: data.community._id
            });

            const communityElement = document.createElement(`a`);
            const communityIcon = document.createElement(`img`);
            const communityName = document.createElement(`span`);

            communityElement.classList.add(`server`);
            communityIcon.classList.add(`server__icon`);
            communityName.classList.add(`server__name`);

            // Make the icon appropriate to be displayed in img.src
            // transfer to blob

            const uint8Array = new Uint8Array(data.community.icon.data);
            const blob = new Blob([uint8Array], {type: "image/png"});
            const imgURI = URL.createObjectURL(blob);


            communityIcon.src = imgURI;
            communityName.textContent = data.community.name;

            communityElement.appendChild(communityIcon);
            communityElement.appendChild(communityName);

            communityContainer.appendChild(communityElement);

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
  createCommunity(test_url);
});
