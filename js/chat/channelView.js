import {emojis} from "./misc.js";

export function refreshChannelView(channels, container) {
  channels.forEach((channel, i) => {
    setTimeout(() => {
      const channelElement = document.createElement(`a`);
      const channelEmoji = document.createElement(`div`);
      const channelInfo = document.createElement(`div`);
      const channelName = document.createElement(`div`);
      const channelDesc = document.createElement(`div`);

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
      container.appendChild(channelElement);
    }, i * 250);
  });
}
