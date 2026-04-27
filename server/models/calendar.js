const con = require("./db_connect")

async function createCalendarTable() {
    let sql = `
    CREATE TABLE IF NOT EXISTS Calendar(
        calendarId INT AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        FOREIGN KEY (userId) REFERENCES User(userId)
    );`

    await con.query(sql)
}

createCalendarTable()

async function getAllCalendar() {
    let sql = `SELECT * FROM Calendar;`

    return await con.query(sql)
}

module.exports = { getAllCalendar }