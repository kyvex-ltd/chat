export function addCommunity(community, container) {

  const communityElement = document.createElement(`a`);
  const communityIcon = document.createElement(`img`);
  const communityName = document.createElement(`span`);

  communityElement.classList.add(`server`);
  communityIcon.classList.add(`server__icon`);
  communityName.classList.add(`server__name`);

  const uint8Array = new Uint8Array(community.icon.data);
  const blob = new Blob([uint8Array], {type: "image/png"});
  const imgURI = URL.createObjectURL(blob);

  communityElement.href = `?community=${community._id}`;
  communityElement.title = community.description;
  communityIcon.src = imgURI
  communityName.textContent = community.name;

  communityElement.appendChild(communityIcon);
  communityElement.appendChild(communityName);

  container.appendChild(communityElement);

}

export function addCategory(category, container) {

  const categoryElement = document.createElement(`a`);
  const categoryName = document.createElement(`span`);

  categoryElement.classList.add(`server`);
  categoryName.classList.add(`server__name`);

  categoryElement.href = `?category=${category._id}`;
  categoryName.textContent = category.name;

  categoryElement.appendChild(categoryName);

  container.appendChild(categoryElement);

}

export function addChannel(channel, container) {

  const channelElement = document.createElement(`a`);
  const channelName = document.createElement(`span`);

  channelElement.classList.add(`server`);
  channelName.classList.add(`server__name`);

  channelElement.href = `?channel=${channel._id}`;
  channelName.textContent = channel.name;

  channelElement.appendChild(channelName);

  container.appendChild(channelElement);

}
