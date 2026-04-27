const con = require("./db_connect")

async function createCategoryTable() {
    let sql = `
    CREATE TABLE IF NOT EXISTS Category(
        categoryId INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        color VARCHAR(20),
        icon VARCHAR(50),
        userId INT NOT NULL,
        FOREIGN KEY (userId) REFERENCES User(userId),
        UNIQUE(userId, name)
    );`

    await con.query(sql)
}

createCategoryTable()

async function getAllCategories() {
    let sql = `SELECT * FROM Category;`

    return await con.query(sql)
}

module.exports = { getAllCategories }