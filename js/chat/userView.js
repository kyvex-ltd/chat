export function refreshUserView(users, container) {
  users.forEach((user, i) => {
    setTimeout(() => {
      const userElement = document.createElement(`a`);
      const userEmoji = document.createElement(`div`);
      const userInfo = document.createElement(`div`);
      const userName = document.createElement(`div`);
      const userDesc = document.createElement(`div`);

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

      container.appendChild(userElement);
    }, i * 100);
  });
}
