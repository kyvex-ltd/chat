import {url} from '../chat/misc.js';

function register(displayName, username, password, email) {

  // Create an object with the registration data
  let userData = {
    tag: username,
    displayName: displayName,
    password: password,
    email: email
  };

  console.log(userData)

  console.log("sent")
  // Send the registration request to the server
  fetch(url + '/api/v1/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
    .then(response => response.json())
    .then(data => {
      if (data.msg) return alert(`Error: ${data.msg}`);

      localStorage.setItem('token', data.token);
      window.location.href = "chat.html";
    })
    .catch(error => {
      console.log("An error occurred:");
      console.error(error);

    });
}

document.getElementById('register__button').addEventListener('click', function (e) {
  e.preventDefault();
  register(
    document.getElementById('displayname').value,
    document.getElementById('username').value,
    document.getElementById('password').value,
    document.getElementById('email').value)
});
