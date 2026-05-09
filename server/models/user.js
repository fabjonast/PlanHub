const con = require("./db_connect")
const bcrypt = require("bcrypt")

async function createUserTable() {
    let sql = `
    CREATE TABLE IF NOT EXISTS User(
        userId INT AUTO_INCREMENT PRIMARY KEY,
        firstName VARCHAR(50) NOT NULL,
        lastName VARCHAR(50) NOT NULL,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`

    await con.query(sql)
}

createUserTable()

async function login(user) {
    let cUser = await getUserByUsername(user.username)
    if(!cUser) throw Error("Username not found!")

    let match = await bcrypt.compare(user.password, cUser.password)
    if(!match) throw Error("Password Incorrect!")

    return cUser
}

async function getUserByUsername(username) {
    let sql = `
        SELECT * FROM User 
        WHERE username=?;
    `
    let cUser = await con.query(sql, [username])
    return cUser[0]
}

async function getAllUsers() {
    let sql = `
        SELECT * FROM User;
    `
    return await con.query(sql)
}

async function register(user) {
    let cUser = await getUserByUsername(user.username)
    if(cUser) throw Error("Username not available!")

    let hashedPassword = await bcrypt.hash(user.password, 10)

    let sql = `
        INSERT INTO User(firstName, lastName, password, username)
        VALUES(?, ?, ?, ?);
    `

    await con.query(sql, [user.firstName, user.lastName, hashedPassword, user.username])
    return await login(user)
}

async function deleteUser(userId) {
    let sql = `
        DELETE FROM User
        WHERE userId=?
    `
    return await con.query(sql, [userId])
}

module.exports = { login, getAllUsers, register, deleteUser }