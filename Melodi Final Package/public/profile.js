// profile.js

document.addEventListener('DOMContentLoaded', function () {
  var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  const testUser = { "id": 1, "name": "Bob Test", "goals": "Testing", "gamesWon": 0, "highestRank": 1, "image": "DogGolden.png", "username": "testerb", "password": "March2024", "email": "bob@test.com", "phone": "555-1212", "role_id": 1, "status": 1 }
  if (currentUser) {
    console.log("currentUser", currentUser);
    // Display user-specific data
    document.getElementById('username').textContent = currentUser.username;
    const img = "images/" + (currentUser.image === null || currentUser.image === "" ? "dog.jpg" : currentUser.image);
    console.log("img", img);
    document.getElementById('profilePic').src = img;
    document.getElementById('goal').textContent = currentUser.goals;
    document.getElementById('topRank').textContent = currentUser.highestRank;

    document.getElementById('yourname').textContent = currentUser.name;
    document.getElementById('email').textContent = currentUser.email;

    // Update lesson progress bar
    var lessonProgress = currentUser.lessonProgress;
    var progressPercentage = (lessonProgress / 4) * 100;
    document.getElementById('lessonProgress').style.width = progressPercentage + '%';
  } else {
    // User not logged in, redirect to the login page
    window.location.href = 'login.html';
  }

  // Logout functionality
  document.getElementById('logoutBtn').addEventListener('click', function () {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'login.html'; // Redirect to the login page
  });
});