const con = require("./db_connect")

async function createUserTable() {
    let sql = `
    CREATE TABLE IF NOT EXISTS User(
        userId INT AUTO_INCREMENT PRIMARY KEY,
        firstName VARCHAR(50) NOT NULL,
        lastName VARCHAR(50) NOT NULL,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(20) NOT NULL,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`

    await con.query(sql)
}

createUserTable()

async function getAllUsers() {
    let sql = ` SELECT * FROM User;`

    return await con.query(sql)
}

module.exports = { getAllUsers }