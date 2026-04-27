const con = require("./db_connect")

async function createGoalTable() {
    let sql = `
    CREATE TABLE IF NOT EXISTS Goal(
        goalId INT AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        categoryId INT,
        title VARCHAR(100) NOT NULL,
        status ENUM('active', 'completed', 'abandoned') NOT NULL DEFAULT'active',
        startDate DATE NOT NULL,
        targetDate DATE NOT NULL,
        created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES User(userId),
        FOREIGN KEY (categoryId) REFERENCES Category(categoryId)
    );`

    await con.query(sql)
}

createGoalTable()

async function getAllGoals() {
    let sql = `SELECT * FROM Goal;`

    return await con.query(sql)
}

module.exports = { getAllGoals }