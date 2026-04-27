const con = require("./db_connect")

async function createDeadlineTable() {
    let sql = `
    CREATE TABLE IF NOT EXISTS Deadline(
        deadlineId INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        dueDate DATE NOT NULL,
        dueTime TIME,
        isCompleted BOOLEAN NOT NULL DEFAULT FALSE,
        taskId INT NOT NULL,
        goalId INT NOT NULL,
        FOREIGN KEY (taskId) REFERENCES Task(taskId),
        FOREIGN KEY (goalId) REFERENCES Goal(goalId),
    );`

    await con.query(sql)
}

createDeadlineTable()

async function getAllDeadlines(){
    let sql = `SELECT * FROM Deadline;`

    return await con.query(sql)
}

module.exports = { getAllDeadlines }