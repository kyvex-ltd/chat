import {url} from '../chat/misc.js';

function login(username, password) {

  // Create an object with the login credentials
  let credentials = {
    tag: username,
    password: password
  };

  // Send the login request to the server
  fetch(url + '/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(response => response.json())
    .then(function (response) {
      console.log(response)
      try {
        // Save user object and token to local storage
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
      } catch (e) {
        return console.error(e);
      }

      // Redirect to chat page
      window.location.href = "chat.html";
    })
    .catch(error => console.error(error))
    .finally(() => console.log('Login request sent')
    );
}

document.getElementById('login__button').addEventListener('click', function (e) {
  e.preventDefault();
  login(document.getElementById('username').value, document.getElementById('password').value)
});
