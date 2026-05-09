const con = require("./db_connect")

async function createDeadlineTable() {
    let sql = `
    CREATE TABLE IF NOT EXISTS Deadline(
        deadlineId INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        dueDate DATE NOT NULL,
        dueTime TIME,
        isCompleted BOOLEAN NOT NULL DEFAULT FALSE,
        taskId INT,
        goalId INT,
        FOREIGN KEY (taskId) REFERENCES Task(taskId),
        FOREIGN KEY (goalId) REFERENCES Goal(goalId),
    );`

    await con.query(sql)
}

createDeadlineTable()

//create
async function createDeadline(title, dueDate, dueTime, isCompleted, taskId, goalId) {
    let sql = `
        INSERT INTO Deadline(title, dueDate, dueTime, isCompleted, taskId, goalId)
        Values(?, ?, ?, ?, ?, ?);
    `
    const[rows] = await con.query(sql, [title, dueDate, dueTime, isCompleted, taskId, goalId])
    return rows.insertId
}

//read one deadline
async function getDeadlineById(deadlineId) {
    let sql = `
        SELECT * FROM Deadline
        WHERE deadlineId=?;
    `
    let deadline = await con.query(sql, [deadlineId])
    return deadline[0]
}

//read all deadlines
async function getAllDeadlines(){
    let sql = `SELECT * FROM Deadline;`

    return await con.query(sql)
}

//update
async function updateDeadline(deadlineId, fields) {
    const allowed = ['title', 'dueDate', 'dueTime', 'isCompleted', 'taskId', 'goalId']
    const updates = Object.keys(fields).filter(k => allowed.includes(k))

    if(updates.length === 0) throw new Error("No valid fields to update")

    const setClause = updates.map( k => `${k} = ?`).join(', ')
    const values = updates.map(k => fields[k])

    let sql = `
        UPDATE Deadline SET ${setClause}
        Where deadlineId=?;
    `
    const [result] = await con.query(sql, [...values, deadlineId])
    return result.affectedRows
}

//delete
async function deleteDeadline(deadlineId) {
    let sql = `
        DELETE FROM Deadline
        WHERE deadlineId=?
    `
    return await con.query(sql, [deadlineId])
}

module.exports = { createDeadline, getDeadlineById, getAllDeadlines, updateDeadline, deleteDeadline }