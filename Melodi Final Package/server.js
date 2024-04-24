const port = 3000;
const bodyParser = require('body-parser');
const express = require("express");
const session = require('express-session');
const app = express();
const { Server } = require("socket.io");
const path = require('path');
const fileURLToPath = require('url');
const { query, createUser, login, saveForumnMessage, getForumnMessages, getTopRank } = require("./dao/MainDAO");
app.use(session({ secret: 'XASDASDA' }));
//const apiRouter = express.Router();
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

const ADMIN = "Admin"

let ssn;
const GC_RELEASE = "2024-04-15";
app.get("/forumnMessages/:id", async (req, res) => {
    console.log("forumnMessages");
    const messages = await getForumnMessages(req.params.id);
    res.send(messages);
});
app.get("/topRank/:rank", async (req, res) => {
    console.log("forumnMessages");
    const top = await getTopRank(req.params.rank);
    console.log("TOP:", top);
    res.send(top);
});
app.post("/forumnMessage/", async (req, res) => {
    console.log("post forumnMessage: ", req.body);
    const resp = await saveForumnMessage(req.body.userId, req.body.text, req.body.forumnId);
    res.send(resp);
});
app.get("/release", (req, res) => {
    ssn = req.session;
    res.send({ releease: GC_RELEASE, message: "Hello" });
});
app.get("/", (req, res) => {
    ssn = req.session;
    res.send({ releease: GC_RELEASE, message: "Hello" });
});
app.get("/whoami", (req, res) => {
    ssn = req.session;
    res.send({ releease: GC_RELEASE, message: "Hello", user: ssn.user });
});

app.get("/profiles", async (req, res) => {
    const users = await query("SELECT * FROM profiles", null);
    res.send(users);
});
app.post("/profile", async (req, res) => {
    const user = req.body;
    console.log("post profile:", user);
    const resp = await createUser(user);
    res.send(resp);
})
app.post("/login", async (req, res) => {
    const user = req.body;
    console.log("login user:", user);
    const resp = await login(user.username, user.password);
    if (resp.status === 1) {
        ssn = req.session;
        ssn.user = resp.user;
    }
    res.send(resp);
})
//app.use("/api", apiRouter);
const expressServer = app.listen(port, () => {
    console.log("listening on port:", port);
})
const UsersState = {
    users: [],
    setUsers: function (newUsersArray) {
        this.users = newUsersArray
    }
}

const io = new Server(expressServer, {
    cors: {
        origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:5500", "http://127.0.0.1:5500"]
    }
})
io.on('connection', socket => {
    console.log(`User ${socket.id} connected`)

    // Upon connection - only to user 
    socket.emit('message', buildMsg(ADMIN, "Welcome to Chat App!"))

    socket.on('enterRoom', ({ name, room }) => {

        // leave previous room 
        const prevRoom = getUser(socket.id)?.room

        if (prevRoom) {
            socket.leave(prevRoom)
            io.to(prevRoom).emit('message', buildMsg(ADMIN, `${name} has left the room`))
        }

        const user = activateUser(socket.id, name, room)

        // Cannot update previous room users list until after the state update in activate user 
        if (prevRoom) {
            io.to(prevRoom).emit('userList', {
                users: getUsersInRoom(prevRoom)
            })
        }

        // join room 
        socket.join(user.room)

        // To user who joined 
        socket.emit('message', buildMsg(ADMIN, `You have joined the ${user.room} chat room`))

        // To everyone else 
        socket.broadcast.to(user.room).emit('message', buildMsg(ADMIN, `${user.name} has joined the room`))

        // Update user list for room 
        io.to(user.room).emit('userList', {
            users: getUsersInRoom(user.room)
        })

        // Update rooms list for everyone 
        io.emit('roomList', {
            rooms: getAllActiveRooms()
        })
    })

    // When user disconnects - to all others 
    socket.on('disconnect', () => {
        const user = getUser(socket.id)
        userLeavesApp(socket.id)

        if (user) {
            io.to(user.room).emit('message', buildMsg(ADMIN, `${user.name} has left the room`))

            io.to(user.room).emit('userList', {
                users: getUsersInRoom(user.room)
            })

            io.emit('roomList', {
                rooms: getAllActiveRooms()
            })
        }

        console.log(`User ${socket.id} disconnected`)
    })

    // Listening for a message event 
    socket.on('message', ({ name, userId, text, forumnId }) => {
        const room = getUser(socket.id)?.room
        if (room) {
            io.to(room).emit('message', buildMsg(name, text))
            if (forumnId > 0) {
                saveForumnMessage(userId, text, forumnId);
            }
        }
    })

    // Listen for activity 
    socket.on('activity', (name) => {
        const room = getUser(socket.id)?.room
        if (room) {
            socket.broadcast.to(room).emit('activity', name)
        }
    })
})

function buildMsg(name, text) {
    return {
        name,
        text,
        time: new Intl.DateTimeFormat('default', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        }).format(new Date())
    }
}
// User functions 
function activateUser(id, name, room) {
    const user = { id, name, room }
    UsersState.setUsers([
        ...UsersState.users.filter(user => user.id !== id),
        user
    ])
    return user
}

function userLeavesApp(id) {
    UsersState.setUsers(
        UsersState.users.filter(user => user.id !== id)
    )
}

function getUser(id) {
    return UsersState.users.find(user => user.id === id)
}

function getUsersInRoom(room) {
    return UsersState.users.filter(user => user.room === room)
}

function getAllActiveRooms() {
    return Array.from(new Set(UsersState.users.map(user => user.room)))
}