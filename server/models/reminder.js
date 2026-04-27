const con = require("./db_connect")

async function createReminderTable() {
    let sql = `
    CREATE TABLE IF NOT EXISTS Reminder(
        reminderId INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        date DATETIME,
        userId INT NOT NULL,
        goalId INT NOT NULL,
        scheduleId INT NOT NULL,
        taskId INT NOT NULL,
        FOREIGN KEY (userId) REFERENCES User(userId),
        FOREIGN KEY (goalId) REFERENCES Goal(goalId),
        FOREIGN KEY (scheduleId) REFERENCES Schedule (scheduleId),
        FOREIGN KEY (taskId) REFERENCES Task(taskId)
    );`

    await con.query(sql)
}

createReminderTable()

async function getAllReminders() {
    let sql = `SELECT * FROM Reminder;`

    return await con.query(sql)
}

module.exports = { getAllReminders }