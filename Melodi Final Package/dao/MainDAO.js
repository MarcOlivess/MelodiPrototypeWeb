const { Sequelize, DataTypes, QueryTypes } = require("sequelize");
/*
let sequelize = new Sequelize(
    "steri_melody", "root", "Jedi2023",
    {
        host: "localhost",
        dialect: "mysql"
    }
)
*/
let sequelize = new Sequelize(
    "melody", "admin", "Limerick36",
    {
        host: "database-1.czwemuuyibvi.us-east-1.rds.amazonaws.com",
        port: 3306,
        dialect: "mysql"
    }
)

const query = async (query, values) => {
    try {
        const results = await sequelize.query(query,
            {
                replacements: values,
                type: QueryTypes.SELECT
            });
        console.log(results);
        return results;
    } catch (ex) {
        console.log(ex);
        return { status: -1, message: "error", ex: ex };
    }
}
const execute = async (query, values) => {
    try {
        const results = await sequelize.query(query,
            {
                replacements: values,

            });
        console.log(results);
        return results;
    } catch (ex) {
        console.log(ex);
        return { status: -1, message: "error", ex: ex };
    }
}
const createUser = async (user) => {
    try {
        const insert =
            "INSERT INTO `profiles`(`name`,`goals`,`gamesWon`, `highestRank`,`image`,`username`,`password`,`email`,`role_id`, `status`)"
            + "VALUES(?,?,0,0,'',?,?,?,2,1)";
        //const insert = "INSERT INTO `dev`.`users` (`username`,  `password`,`role_id`, `status`, `created`) VALUES (?,?,2,1,SYSDATE())";
        values = [user.yourname, user.goals, user.username, user.password, user.email]

        const results = await sequelize.query(insert,
            {
                replacements: values,

            });
        console.log(results);
        return { status: 1, message: "user created" };
    } catch (ex) {
        console.log(ex);
        return { status: -1, message: "error", ex: ex };
    }
}
const saveForumnMessage = async (userId, msg, forumnId) => {
    try {
        const insert =
            "INSERT INTO `forumn_messages`(user_id,message,forumn_id,stamp)"
            + "VALUES(?,?,?,SYSDATE())";
        //const insert = "INSERT INTO `dev`.`users` (`username`,  `password`,`role_id`, `status`, `created`) VALUES (?,?,2,1,SYSDATE())";
        values = [userId, msg, forumnId];

        const results = await sequelize.query(insert,
            {
                replacements: values,

            });
        console.log(results);
        return { status: 1, message: "user created" };
    } catch (ex) {
        console.log(ex);
        return { status: -1, message: "error", ex: ex };
    }
}
const updateScore = async (user) => {
    try {
        const update =
            "UPDATE profiles SET match_score=?, quiz_score=?, highestRank=? WHERE id=?";

        let highestRank = user.matchScore[0];
        for (let val of user.quizScore) {
            highestRank += val;
        }
        console.log("updateScore:", user);
        values = [user.matchScore[0], JSON.stringify(user.quizScore), highestRank, user.id];
        console.log("values:", values);
        const results = await sequelize.query(update,
            {
                replacements: values,

            });
        console.log(results);
        return { status: 1, message: "user created" };
    } catch (ex) {
        console.log(ex);
        return { status: -1, message: "error", ex: ex };
    }
}
const getForumnMessages = async (id) => {
    try {
        const query = "SELECT * FROM view_forumn_messages WHERE forumn_id=? ORDER BY stamp ASC";
        const values = [id];
        const results = await sequelize.query(query,
            {
                replacements: values,
                type: QueryTypes.SELECT
            });
        if (results.length > 0) {
            return results;
        } else {
            return { status: -1, message: "no message found." }
        }

    } catch (ex) {
        console.log(ex);
        return { status: -1, message: "error loggin in", ex: ex };
    }
}
const login = async (username, password) => {
    try {
        const query = "SELECT * FROM profiles WHERE username=? AND password=?";
        const values = [username, password];
        const results = await sequelize.query(query,
            {
                replacements: values,
                type: QueryTypes.SELECT
            });
        if (results.length > 0) {
            const user = results[0];
            user['quizScore'] = JSON.parse(user.quiz_score);
            user['matchScore'] = [user.match_score];
            user.password = "********";
            console.log("user logged in:", user);
            return { status: 1, message: "user logged", user: user }
        } else {
            return { status: -1, message: "invalid username/password", username: username }
        }

    } catch (ex) {
        console.log(ex);
        return { status: -1, message: "error loggin in", ex: ex };
    }
}
const getTopRank = async (rank) => {
    try {
        const query = "SELECT * FROM profiles ORDER BY highestRank DESC LIMIT " + rank;
        const results = await sequelize.query(query,
            {
                replacements: [],
                type: QueryTypes.SELECT
            });
        return results;
    } catch (ex) {
        console.log(ex);
        return { status: -1, message: "error loggin in", ex: ex };
    }
}
module.exports = { query, execute, createUser, login, saveForumnMessage, getForumnMessages, getTopRank, updateScore }