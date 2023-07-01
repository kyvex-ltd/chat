import {addCategory, addCommunity} from './addToView.js';
import {getQueryParam, url,} from './misc.js';

const communityContainer = document.querySelector(`#community__view`);
const createCommunityContainer = document.querySelector(`#dialog__create__community`);

export function createCommunity() {
  const name = document.querySelector(`#create__community__name`).value;
  const description = document.querySelector(`#create__community__description`).value;

  if (name === `` || description === ``) alert(`Please enter a name and description`);
  else {
    const name = document.querySelector(`#create__community__name`).value;
    const description = document.querySelector(`#create__community__description`).value;

    // Fetch
    fetch(`${url}/api/v1/community/create`, {
      method: `POST`,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem(`token`)}`,
        'Content-Type': `application/json`
      },
      body: JSON.stringify({name, description})
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        if (res.community.name) {
          addCommunity(res.community, communityContainer);
          createCommunityContainer.close();
        } else {
          createCommunityContainer.close();
          alert("Couldn't create community, please try again later");
        }

      })
      .catch(err => console.error(err));
  }
}

export function createCategory() {
  return alert(`501: This feature is not yet implemented`);
  const name = document.querySelector(`#create__category__name`).value;
  const description = document.querySelector(`#create__category__description`).value;
  const communityId = getQueryParam("community");

  if (name === `` || communityId === ``) alert(`Please enter a name and select a community`);

  else {
    // Fetch
    fetch(`${url}/api/v1/category/create`, {
      method: `POST`,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem(`token`)}`,
        'Content-Type': `application/json`
      },
      body: JSON.stringify({name, description, communityId})
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        if (res.category.name) {
          addCatego
          ry(res.category, communityContainer);
          createCategoryContainer.close();
        } else {
          createCategoryContainer.close();
          alert("Couldn't create category, please try again later");
        }

      })
      .catch(err => console.error(err));
  }
}

export function createChannel() {
  return alert(`501: This feature is not yet implemented`);
  const name = document.querySelector(`#create__channel__name`).value;
}
