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

//create
async function createSchedule(type, title, calendarId) {
    let sql = `
        INSERT INTO Schedule(type, title, calendarId)
        VALUES(?, ?, ?);
    `
    const[rows] = await con.query(sql, [type, title, calendarId])
    return rows.insertId
}

//read one schedule
async function getScheduleById(scheduleId) {
    let sql = `
        SELECT * FROM Schedule 
        WHERE scheduleId=?;
    `
    let schedule = await con.query(sql, [scheduleId])
    return schedule[0]
}

//read all schedules
async function getAllSchedules() {
    let sql = `
        SELECT * FROM Schedule;
    `
    return await con.query(sql)
}

//update
async function updateSchedule(scheduleId, fields) {
    const allowed = ['type', 'title', 'calendarId']
    const updates = Object.keys(fields).filter(k => allowed.includes(k))

    if(updates.length === 0) throw new Error("No valid fields to update")

    const setClause = updates.map(k => `${k} = ?`).join(', ')
    const values = updates.map(k => fields[k])

    let sql = `
        UPDATE Schedule SET ${setClause}
        WHERE scheduleId=?;
    `
    const [result] = await con.query(sql, [...values, scheduleId])
    return result.affectedRows
}

//delete
async function deleteSchedule(scheduleId) {
    let sql = `
        DELETE FROM Schedule
        WHERE scheduleId=?;
    `
    return await con.query(sql, [scheduleId])
}

module.exports = { createSchedule, getScheduleById, getAllSchedules, updateSchedule, deleteSchedule }