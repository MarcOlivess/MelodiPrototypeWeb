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
    
    var userData = {
      username: username,
      email: email,
      progress: mockData,
      interactions: 0
    };
    
    localStorage.setItem(email, JSON.stringify(userData));
    showProfile(userData);
  }
  
  // Function to display user profile
  function showProfile(userData) {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('profileSection').style.display = 'block';
    
    document.getElementById('profileUsername').textContent = userData.username;
    document.getElementById('profileEmail').textContent = userData.email;
    document.getElementById('profileProgress').textContent = JSON.stringify(userData.progress);
    document.getElementById('profileInteractions').textContent = userData.interactions;
  }
  
  // Function to handle user sign out
  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      document.getElementById('profileSection').style.display = 'none';
      document.getElementById('loginSection').style.display = 'block';
      localStorage.clear();
    });
  }