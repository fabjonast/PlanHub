const con = require("./db_connect")

async function createReminderTable() {
    let sql = `
    CREATE TABLE IF NOT EXISTS Reminder(
        reminderId INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        date DATETIME,
        userId INT,
        goalId INT,
        scheduleId INT,
        taskId INT,
        FOREIGN KEY (userId) REFERENCES User(userId),
        FOREIGN KEY (goalId) REFERENCES Goal(goalId),
        FOREIGN KEY (scheduleId) REFERENCES Schedule (scheduleId),
        FOREIGN KEY (taskId) REFERENCES Task(taskId)
    );`

    await con.query(sql)
}

createReminderTable()

//create
async function createReminder(title, date, userId, goalId, scheduleId, taskId) {
    let sql = `
        INSERT INTO Reminder(title, date, userId, goalId, scheduleId, taskId)
        VALUES(?, ?, ?, ?, ?, ?);
    `
    const[rows] = await con.query(sql, [title, date, userId, goalId, scheduleId, taskId])
    return rows.insertId
}

//read one reminder
async function getReminderById(reminderId) {
    let sql = `
        SELECT * FROM Reminder
        WHERE reminderId=?;
    `
    let reminder = await con.query(sql, [reminderId])
    return reminder[0]
}

//read all reminders
async function getAllReminders() {
    let sql = `
        SELECT * FROM Reminder;
    `
    return await con.query(sql)
}

//update
async function updateReminder(reminderId, fields) {
    const allowed = ['title', 'date', 'userId', 'goalId', 'scheduleId', 'taskId']
    const updates = Object.keys(fields).filter(k => allowed.includes(k))

    if(updates.length === 0) throw new Error("No valid fields to update")
    
    const setClause = updates.map(k => `${k} = ?`).join(', ')
    const values = updates.map(k => fields[k])

    let sql= `
        UPDATE Reminder SET ${setClause}
        WHERE reminderId=?;
    `
    const[result] = await con.query(sql, [...values, reminderId])
    return result.affectedRows
}

//delete
async function deleteReminder(reminderId) {
    let sql = `
        DELETE FROM Reminder
        WHERE reminderId=?;
    `
    return await con.query(sql, [reminderId])
}

module.exports = { createReminder, getReminderById, getAllReminders, updateReminder, deleteReminder }