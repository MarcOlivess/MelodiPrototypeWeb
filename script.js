// Mock data for user activity and interactions
var mockData = {
    games: { progress: 50, interactions: 10 },
    lessons: { progress: 75, interactions: 20 },
    forums: { posts: 5, interactions: 8 },
    chatrooms: { messages: 15, interactions: 12 }
  };
  
  // Function to handle Google Sign-In
  function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var username = profile.getName();
    var email = profile.getEmail();
    var imageUrl = profile.getImageUrl();
  
    var userData = {
      username: username,
      email: email,
      imageUrl: imageUrl,
      progress: {
        lesson1: false,
        lesson2: false,
        lesson3: false
      },
      leaderboardScore: 0
    };
  
    localStorage.setItem(email, JSON.stringify(userData));
    updateWebsiteInfo(userData);
  }
  
  // Function to display user profile on the home page
  function showProfile() {
    gapi.load('auth2', function () {
      gapi.auth2.init().then(function () {
        if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
          var profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
          var email = profile.getEmail();
          var userData = JSON.parse(localStorage.getItem(email));
  
          if (userData) {
            document.getElementById('profileUsername').textContent = userData.username;
            document.getElementById('profileEmail').textContent = userData.email;
            document.getElementById('profileProgress').textContent = JSON.stringify(userData.progress);
            document.getElementById('profileInteractions').textContent = userData.interactions;
          }
        } else {
          // User is not signed in, redirect to the login page or show the login section
          window.location.href = "index.html";
          // or
          // document.getElementById('loginSection').style.display = 'block';
          // document.getElementById('profileSection').style.display = 'none';
        }
      });
    });
  }
  
  // Function to handle user sign out
  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      document.getElementById('loginSection').style.display = 'block';
      document.getElementById('profileSection').style.display = 'none';
      clearWebsiteInfo();
      localStorage.clear();
    });
  }
  
  function clearWebsiteInfo() {
    document.getElementById('playerName').textContent = '';
    document.getElementById('profilePhoto').src = '';
    document.getElementById('lesson1').checked = false;
    document.getElementById('lesson2').checked = false;
    document.getElementById('lesson3').checked = false;
    document.getElementById('leaderboardScore').textContent = '';
  }

  function updateWebsiteInfo(userData) {
    document.getElementById('playerName').textContent = userData.username;
    document.getElementById('profilePhoto').src = userData.imageUrl;
    document.getElementById('lesson1').checked = userData.progress.lesson1;
    document.getElementById('lesson2').checked = userData.progress.lesson2;
    document.getElementById('lesson3').checked = userData.progress.lesson3;
    document.getElementById('leaderboardScore').textContent = userData.leaderboardScore;
  }
  
  // Call showProfile function when the home page loads
  window.onload = showProfile;