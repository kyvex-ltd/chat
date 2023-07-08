import {addCategory, addCommunity} from './addToView.js';
import {getQueryParam, url,} from './misc.js';

const communityContainer = document.querySelector(`#community__view`);
const createCommunityContainer = document.querySelector(`#dialog__create__community`);

/**
 * Create a community
 * @returns {Promise<void>}
 * @constructor
 * @param {string} name
 * @param {string} description
 * @description Makes a POST request to the API to create a community with the given name and description and Bearer token
 * @example createCommunity("Kyvex", "The official Kyvex community")
 * @see {@link https://kyvex.co.uk/chat_api/docs/Community/createCommunity.html} (not yet created) for more information
 */

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

/**
 * Create a category
 * @returns {Promise<void>}
 * @constructor
 * @param {string} name
 * @param {string} description
 * @param {string} communityId - The ID of the community to create the category in
 * @description Makes a POST request to the API to create a category with the given name,
 * description and community ID and Bearer token
 * @example createCategory("General", "General chat", "1234567890")
 * @see {@link https://kyvex.co.uk/chat_api/docs/Category/createCategory.html} (not yet created) for more information
 */
export function createCategory() {
  const name = document.querySelector(`#create__category__name`).value;
  const description = document.querySelector(`#create__category__description`).value;
  const communityId = getQueryParam("community");

  if (name === `` || communityId === ``) alert(`Please enter a name and select a community`);

  else {
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
          addCategory(res.category, communityContainer);
          createCategoryContainer.close();
        } else {
          createCategoryContainer.close();
          alert("Couldn't create category, please try again later");
        }
      })
      .catch(err => console.error(err));
  }
}


/**
 * Create a channel
 * @returns {Promise<void>}
 * @constructor
 * @param {string} name
 * @param {string} description
 * @param {string} categoryId - The ID of the category to create the channel in
 * @description Makes a POST request to the API to create a channel with the given name,
 * description and category ID and Bearer token.
 * If there is no category, it will be added into the "Misc." category
 * @example createChannel("General", "General chat", "1234567890") // Creates a channel called "General" in the category with the ID "1234567890"
 * @see {@link https://kyvex.co.uk/chat_api/docs/Channel/createChannel.html} (not yet created) for more information
 */
export function createChannel() {
  const name = document.querySelector(`#create__channel__name`).value;
  const description = document.querySelector(`#create__channel__description`).value || ``;
  const categoryId = getQueryParam("category");

  if (name === `` || categoryId === ``) return alert(`Please enter a name and select a category`);

  else {
    fetch(`${url}/api/v1/channel/create`, {
      method: `POST`,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem(`token`)}`,
        'Content-Type': `application/json`
      },
      body: JSON.stringify({name, description, categoryId})
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        if (res.channel.name) {
          addChannel(res.channel, communityContainer);
          createChannelContainer.close();
        } else {
          createChannelContainer.close();
          alert("Couldn't create channel, please try again later");
        }
      })
      .catch(err => console.error(err));
  }
}

