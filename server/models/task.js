const con = require("./db_connect")

async function createTaskTable() {
    let sql = `
    CREATE TABLE IF NOT EXISTS Task(
        taskId INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        priority ENUM('low', 'medium', 'high') NOT NULL DEFAULT'low',
        status ENUM('pending', 'in-progress', 'completed') NOT NULL DEFAULT'in-progress',
        startDate DATETIME,
        endDate DATETIME,
        isAllDay BOOLEAN NOT NULL DEFAULT FALSE,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        userId INT NOT NULL,
        scheduleId INT NOT NULL,
        categoryId INT NOT NULL,
        FOREIGN KEY (userId) REFERENCES User(userId),
        FOREIGN KEY (scheduleId) REFERENCES Schedule(scheduleId),
        FOREIGN KEY (categoryId) REFERENCES Category(categoryId)
    );`

    await con.query(sql)
}

createTaskTable()

async function getAllTasks() {
    let sql = `SELECT * FROM Task;`

    return await con.query(sql)
}

module.exports = { getAllTasks }