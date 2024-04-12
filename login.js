// login.js

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent form submission
  
      // Get the entered username and password
      var username = document.getElementById('username').value;
      var password = document.getElementById('password').value;
  
      // Call the server-side validation function
      handleLoginRequest(username, password, function(user) {
        if (user) {
          // Login successful
          alert('Login successful!');
          localStorage.setItem('currentUser', JSON.stringify(user));
          window.location.href = 'profile.html'; // Redirect to the profile page
        } else {
          // Login failed
          alert('Invalid username or password. Please try again.');
        }
      });
    });
  });