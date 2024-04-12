// register.js

document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission
  
    // Get the entered username and password
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
  
    // Store user data in localStorage
    localStorage.setItem('userData', JSON.stringify({ username: username, password: password }));
  
    // Registration successful
    alert('Registration successful! You can now log in.');
    window.location.href = 'login.html'; // Redirect to the login page
  });