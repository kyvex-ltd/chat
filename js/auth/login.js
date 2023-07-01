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

      // If the login was successful, store the token and user data in localStorage
      if (response.status === 200) {
        console.log(response)
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        window.location.href = 'chat.html';
      } else {
        alert(response.message);
      }

    })
    .catch(error => console.error(error))
    .finally(() => console.log('Login request sent')
    );
}

document.getElementById('login__button').addEventListener('click', function (e) {
  e.preventDefault();
  login(document.getElementById('username').value, document.getElementById('password').value)
});
