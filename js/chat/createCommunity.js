import {addCommunity} from './addToView.js';

const communityContainer = document.querySelector(`#community__view`);
const createCommunityContainer = document.querySelector(`#dialog__create__community`);

export function createCommunity(url) {
  const name = document.querySelector(`#create__community__name`).value;
  const description = document.querySelector(`#create__community__description`).value;

  if (name === `` || description === ``) {
    alert(`Please enter a name and description`);
  } else {
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
