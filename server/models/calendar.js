const con = require("./db_connect")

async function createCalendarTable() {
    let sql = `
    CREATE TABLE IF NOT EXISTS Calendar(
        calendarId INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        userId INT NOT NULL,
        FOREIGN KEY (userId) REFERENCES User(userId)
    );`

    await con.query(sql)
}

createCalendarTable()

//create
async function createCalendar(name, userId) {
    let sql = `
        INSERT INTO Calendar(name, userId)
        VALUES(?, ?);
    `
    const[rows] = await con.query(sql, [name, userId])
    return rows.insertId
}

//read one calendar
async function getCalendarById(calendarId) {
    let sql = `
        SELECT * FROM Calendar
        WHERE calendarId=?;
    `
    let calendar = await con.query(sql, [calendarId])
    return calendar[0]
}

// read all calendars
async function getAllCalendars() {
    let sql = `SELECT * FROM Calendar;`

    return await con.query(sql)
}

//update
async function updateCalendar(calendarId, fields) {
    const allowed = ['name', 'userId']
    const updates = Object.keys(fields).filter(k => allowed.includes(k))

    if(updates.length === 0) throw new Error("No valid fields to update")

    const setClause = updates.map(k => `${k} = ?`).join(', ')
    const values = updates.map(k => fields[k])

    let sql = `
        UPDATE Calendar SET ${setClause}
        WHERE calendarId=?;
    `
    const [result] = await con.query(sql, [...values, calendarId])
    return result.affectedRows
}

//delete
async function deleteCalendar(calendarId) {
    let sql = `
        DELETE FROM Calendar
        WHERE calendarId=?
    `
    return await con.query(sql, [calendarId])
}

module.exports = { createCalendar, getCalendarById, getAllCalendars, updateCalendar, deleteCalendar }