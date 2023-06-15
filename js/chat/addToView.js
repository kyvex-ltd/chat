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
