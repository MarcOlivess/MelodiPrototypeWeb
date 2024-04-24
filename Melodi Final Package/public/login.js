// login.js
const API_SERVER = localStorage.getItem("MelodyAPIUrl");
console.log("Login.API_SERVER:", API_SERVER);
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent form submission

    // Get the entered username and password
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    const body = { username: username, password: password };
    console.log("registrationForm:", body);
    const resp = await fetch(API_SERVER + "login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })
    const json = await resp.json();
    console.log(json);
    alert(json.message);
    if (json.status === 1) {
      sessionStorage.setItem('currentUser', JSON.stringify(json.user));
      window.location.href = 'profile.html'; // Redirect to the profile page
    }

  });
});