export function refreshCommunityView(communities, container) {
  communities.forEach((community, i) => {
    setTimeout(() => {
      const communityElement = document.createElement(`a`);
      const communityIcon = document.createElement(`img`);
      const communityName = document.createElement(`span`);

      communityElement.classList.add(`server`);
      communityIcon.classList.add(`server__icon`);
      communityName.classList.add(`server__name`);

      communityElement.href = `chat.html?community=${community[2]}`;
      communityIcon.src = `${community[1]}`;
      communityName.textContent = community[0];

      communityElement.appendChild(communityIcon);
      communityElement.appendChild(communityName);

      container.appendChild(communityElement);
    }, i * 100);
  });
}
