const con = require("./db_connect")

async function createNoteTable() {
    let sql = `
    CREATE TABLE IF NOT EXISTS Note(
        noteId INT AUTO_INCREMENT PRIMARY KEY,
        content TEXT NOT NULL,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated DATETIME,
        taskId INT NOT NULL,
        goalId INT NOT NULL,
        reminderId INT NOT NULL,
        FOREIGN KEY (taskId) REFERENCES Task(taskId),
        FOREIGN KEY (goalId) REFERENCES Goal(goalId),
        FOREIGN KEY (reminderId) REFERENCES Reminder(reminderId)
    );`

    await con.query(sql)
}

async function getAllNotes() {
    let sql = `SELECT * FROM Note;`

    return await con.query(sql)
}

module.exports = { getAllNotes }