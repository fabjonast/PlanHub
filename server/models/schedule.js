const con = require("./db_connect")

async function createScheduleTable() {
    let sql = `
    CREATE TABLE IF NOT EXISTS Schedule(
        scheduleId INT AUTO_INCREMENT PRIMARY KEY,
        type ENUM('daily', 'weekly', 'monthly', 'yearly'),
        title VARCHAR(100) NOT NULL,
        calendarId INT NOT NULL,
        FOREIGN KEY(calendarId) REFERENCES Calendar(calendarId)
    );`

    await con.query(sql)
}

createScheduleTable()

async function getAllSchedules() {
    let sql = `SELECT * FROM Schedule;`

    return await con.query(sql)
}

module.exports = { getAllSchedules }