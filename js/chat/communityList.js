export function showCommunityList(container) {
  container.style.top = `0`;
  const firstCommunity = document.querySelector(`#community__view .server`);
  if (firstCommunity !== null) firstCommunity.focus();
}

export function hideCommunityList(container) {
  container.style.top = `-100%`;
}

export function toggleCommunityList(container) {
  if (container.style.top === `-100%`) {
    showCommunityList(container);
  } else {
    hideCommunityList(container);
  }
}
