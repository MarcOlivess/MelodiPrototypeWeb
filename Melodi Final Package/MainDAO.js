const { Sequelize, DataTypes, QueryTypes } = require("sequelize");

let sequelize = new Sequelize(
    "steri_melody", "root", "PASSWORD",
    {
        host: "localhost",
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
            "INSERT INTO `steri_melody`.`profiles`(`name`,`goals`,`gamesWon`, `highestRank`,`image`,`username`,`password`,`email`,`role_id`, `status`)"
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
            user.password = "********";
            return { status: 1, message: "user logged", user: user }
        } else {
            return { status: -1, message: "invalid username/password", username: username }
        }

    } catch (ex) {
        console.log(ex);
        return { status: -1, message: "error loggin in", ex: ex };
    }
}
module.exports = { query, execute, createUser, login }