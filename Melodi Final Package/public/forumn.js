const socket = io('ws://34.222.153.47:3000')
const apiUrl = localStorage.getItem("MelodyAPIUrl");
const msgInput = document.querySelector('#message')
const nameInput = document.querySelector('#name')
const chatRoom = document.querySelector('#room')
const activity = document.querySelector('.activity')
const usersList = document.querySelector('.user-list')
const roomList = document.querySelector('.room-list')
const chatDisplay = document.querySelector('.chat-display')
const userName = document.querySelector('.user-name')

let forumnMessages;
const loadData = async () => {
    const resp = await fetch(apiUrl + "forumnMessages/1");
    //const text = await resp.text();
    //console.log("TEXT:", text);
    forumnMessages = await resp.json();

    console.log("forumnMessages:", forumnMessages);

    for (let m of forumnMessages) {
        const li = document.createElement('li')
        const name = m.username;
        const time = m.stamp;
        const text = m.message;
        li.className = 'post'
        if (name === currentUser.username) li.className = 'post post--left'
        if (name !== currentUser.username && name !== 'Admin') li.className = 'post post--right'
        if (name !== 'Admin') {
            li.innerHTML = `<div class="post__header ${name === currentUser.username
                ? 'post__header--user'
                : 'post__header--reply'
                }">
        <span class="post__header--name">${name}</span> 
        <span class="post__header--time">${time}</span> 
        </div>
        <div class="post__text">${text}</div>`
        } else {
            li.innerHTML = `<div class="post__text">${text}</div>`
        }
        document.querySelector('.chat-display').appendChild(li)

        chatDisplay.scrollTop = chatDisplay.scrollHeight
    }
}

let currentUser;
function pageLoad() {
    const temp = sessionStorage.getItem("currentUser");
    if (temp) {
        currentUser = JSON.parse(temp);
        console.log("currentUser:", currentUser);
        userName.innerHTML = currentUser.name;
        socket.emit('enterRoom', {
            name: currentUser.username,
            room: "mainroom"
        })
    } else {
        window.location.replace("login");
    }
    loadData();
}

function sendMessage(e) {
    e.preventDefault()
    if (currentUser.username && msgInput.value && chatRoom.value) {
        socket.emit('message', {
            name: currentUser.username,
            userId: currentUser.id,
            text: msgInput.value,
            forumnId: 1
        })
        msgInput.value = ""
    }
    msgInput.focus()
}

function enterRoom(e) {
    e.preventDefault()
    if (currentUser.username && chatRoom.value) {
        socket.emit('enterRoom', {
            name: currentUser.username,
            room: chatRoom.value
        })
    }
}

document.querySelector('.form-msg')
    .addEventListener('submit', sendMessage)


msgInput.addEventListener('keypress', () => {
    socket.emit('activity', currentUser.username)
})

// Listen for messages 
socket.on("message", (data) => {
    activity.textContent = ""
    const { name, text, time } = data
    const li = document.createElement('li')
    li.className = 'post'
    if (name === currentUser.username) li.className = 'post post--left'
    if (name !== currentUser.username && name !== 'Admin') li.className = 'post post--right'
    if (name !== 'Admin') {
        li.innerHTML = `<div class="post__header ${name === currentUser.username
            ? 'post__header--user'
            : 'post__header--reply'
            }">
        <span class="post__header--name">${name}</span> 
        <span class="post__header--time">${time}</span> 
        </div>
        <div class="post__text">${text}</div>`
    } else {
        li.innerHTML = `<div class="post__text">${text}</div>`
    }
    document.querySelector('.chat-display').appendChild(li)

    chatDisplay.scrollTop = chatDisplay.scrollHeight
})

let activityTimer
socket.on("activity", (name) => {
    activity.textContent = `${name} is typing...`

    // Clear after 3 seconds 
    clearTimeout(activityTimer)
    activityTimer = setTimeout(() => {
        activity.textContent = ""
    }, 3000)
})

socket.on('userList', ({ users }) => {
    showUsers(users)
})

socket.on('roomList', ({ rooms }) => {
    showRooms(rooms)
})

function showUsers(users) {
    usersList.textContent = ''
    if (users) {
        usersList.innerHTML = `<em>Users in ${chatRoom.value}:</em>`
        users.forEach((user, i) => {
            usersList.textContent += ` ${user.name}`
            if (users.length > 1 && i !== users.length - 1) {
                usersList.textContent += ","
            }
        })
    }
}

function showRooms(rooms) {
    roomList.textContent = ''
    if (rooms) {
        roomList.innerHTML = '<em>Active Rooms:</em>'
        rooms.forEach((room, i) => {
            roomList.textContent += ` ${room}`
            if (rooms.length > 1 && i !== rooms.length - 1) {
                roomList.textContent += ","
            }
        })
    }
}