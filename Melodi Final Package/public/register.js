// register.js
const API_SERVER = localStorage.getItem("MelodyAPIUrl");
document.getElementById('registrationForm').addEventListener('submit', async function (e) {
  e.preventDefault(); // Prevent form submission

  // Get the entered username and password
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  const yourname = document.getElementById('yourname').value;
  const email = document.getElementById('email').value;
  const goals = document.getElementById('goals').value;
  const body = { username: username, password: password, yourname: yourname, email: email, goals: goals };
  console.log("registrationForm:", body);
  const resp = await fetch(API_SERVER + "profile",
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
  sessionStorage.setItem('userData', JSON.stringify({ username: username, password: password }));

  // Registration successful
  alert('Registration successful! You can now log in.');
  window.location.href = 'login.html'; // Redirect to the login page
});