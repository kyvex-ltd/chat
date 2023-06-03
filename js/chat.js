// Theme Switcher
const theme = localStorage.getItem("theme") || "light";
document.body.classList.toggle("dark", theme === "dark");
document.body.classList.toggle("light", theme === "light");

window.addEventListener("storage", (event) => {
  console.log(event);
  if (event.key === "theme") {
    const theme = event.newValue || "light";
    document.body.classList.toggle("dark", theme === "dark");
    document.body.classList.toggle("light", theme === "light");
  }
});

// Populate channels, users and communities
// The following will be replaced by API calls in the future
// https://github.com/kyvex-ltd/chat_api
const
  channels = [
    [`General`, `general stuff`],
    [`Random`, `random stuff`],
    [`Games`, `games`],
    [`Programming`, `programming`],
    [`Bots`, `bots`],
  ],
  emojis = {
    'general': `🌎`,
    'off-topic': `🎲`,
    'game': `🎮`,
    'programming': `👨‍💻`,
    'bot': '🤖',
    'other': `📁`
  },
  users = ['Beau', 'Beau 2'],
  communities = [[`Cool Community`, `cat.png`], [`Cool Community 2`, `cat.png`]];

const
  channelContainer = document.querySelector(`#channel__view`),
  userContainer = document.querySelector(`#user__view`),
  communityContainer = document.querySelector(`#community__view`);

channels.forEach((channel, i) => {
  setTimeout(() => {

    const
      channelElement = document.createElement(`a`),
      channelEmoji = document.createElement(`div`),
      channelInfo = document.createElement(`div`),
      channelName = document.createElement(`div`),
      channelDesc = document.createElement(`div`);

    channelElement.classList.add(`item`);
    channelEmoji.classList.add(`item__emoji`);

    channelInfo.classList.add(`item__info`);
    channelName.classList.add(`item__name`);
    channelDesc.classList.add(`item__desc`);

    channelElement.href = `#`;
    channelName.textContent = channel[0];
    channelDesc.textContent = channel[1];

    let emoji = emojis.other;
    for (let emojiName in emojis) {
      if (channel[0].toLowerCase().includes(emojiName)) {
        emoji = emojis[emojiName];
        break;
      }
    }

    channelEmoji.textContent = emoji;
    channelInfo.appendChild(channelName);
    channelInfo.appendChild(channelDesc);
    channelElement.appendChild(channelEmoji);
    channelElement.appendChild(channelInfo);
    channelContainer.appendChild(channelElement);

  }, i * 250);
});
users.forEach((user, i) => {
  setTimeout(() => {

    const
      userElement = document.createElement(`a`),
      userEmoji = document.createElement(`div`),
      userInfo = document.createElement(`div`),
      userName = document.createElement(`div`),
      userDesc = document.createElement(`div`);

    userElement.classList.add(`item`);

    userInfo.classList.add(`item__info`);
    userName.classList.add(`item__name`);
    userDesc.classList.add(`item__desc`);

    userElement.href = `#`;
    userName.textContent = user;
    userDesc.textContent = `I'm a cool person`;

    userInfo.appendChild(userName);
    userInfo.appendChild(userDesc);

    userElement.appendChild(userEmoji);
    userElement.appendChild(userInfo);

    userContainer.appendChild(userElement);

  }, i * 100);
});
communities.forEach((community, i) => {

  setTimeout(() => {

    const
      communityElement = document.createElement(`a`),
      communityIcon = document.createElement(`img`),
      communityName = document.createElement(`span`);

    communityElement.classList.add(`server`);
    communityIcon.classList.add(`server__icon`);
    communityName.classList.add(`server__name`);

    communityElement.href = `#`;
    communityIcon.src = `img/${community[1]}`;
    communityName.textContent = community[0];

    communityElement.appendChild(communityIcon);
    communityElement.appendChild(communityName);

    communityContainer.appendChild(communityElement);

  }, i * 100);
});


// Show communities list
const
  communitiesButton = document.querySelector(`#show__communities`),
  communitiesContainer = document.querySelector(`#communities__container`);

function toggleCommunities() {
  if (communitiesContainer.style.top === `-100%`) {

    // focus first community
    const firstCommunity = document.querySelector(`#community__view .server`);
    if (firstCommunity !== null) firstCommunity.focus();

    communitiesContainer.style.top = `0`;

  } else communitiesContainer.style.top = `-100%`;
}

// if user clicks communities button, show it
communitiesButton.addEventListener(`click`, () => {
  toggleCommunities();
});

// if user clicks off the communities list, hide it
communitiesContainer.addEventListener(`click`, (e) => {
  if (e.target.closest(`#communities__container`) !== null) {
    toggleCommunities();
  }
});

document.addEventListener(`keydown`, (e) => {
  if (e.key === `Escape`) communitiesContainer.style.top = `-100%`;

  // if modifier is down
  if (e.ctrlKey || e.metaKey) {
    if (e.key === `k`) {
      e.preventDefault();
      toggleCommunities();

    }

    if (e.key === `l`) {
      e.preventDefault();
      toggleCommunities();
    }

  }

});
