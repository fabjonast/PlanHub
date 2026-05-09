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
        userId INT,
        scheduleId INT,
        categoryId INT,
        FOREIGN KEY (userId) REFERENCES User(userId),
        FOREIGN KEY (scheduleId) REFERENCES Schedule(scheduleId),
        FOREIGN KEY (categoryId) REFERENCES Category(categoryId)
    );`

    await con.query(sql)
}

createTaskTable() 

//create
async function createTask(title, priority, status, startDate, endDate, isAllDay, createdAt, userId, scheduleId, categoryId) {
    let sql = `
        INSERT INTO Task(title, priority, status, startDate, endDate, isAllDay, createdAt, userId, scheduleId, categoryId)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `
    const[rows] = await con.query(sql, [title, priority, status, startDate, endDate, isAllDay, createdAt, userId, scheduleId, categoryId])
    return rows.insertId
}

//read one task
async function getTaskById(taskId) {
    let sql = `
        SELECT * FROM Task
        WHERE taskId=?;
    `
    let task = await con.query(sql, [taskId])
    return task[0]
}

//read all tasks
async function getAllTasks() {
    let sql = `SELECT * FROM Task;`

    return await con.query(sql)
}

//update
async function updateTask(taskId, fields) {
    const allowed = ['title', 'priority', 'status', 'startDate', 'endDate', 'isAllDay', 'createdAt', 'userId', 'scheduleId', 'categoryId']
    const updates = Object.keys(fields).filter(k => allowed.includes(k))

    if(updates.length === 0) throw new Error("No valid fields to update")

    const setClause = updates.map(k => `${k} = ?`).join(', ')
    const values = updates.map(k => fields[k])

    let sql = `
        UPDATE Task SET ${setClause}
        WHERE taskId=?;
    `
    const [result] = await con.query(sql, [...values, taskId])
    return result.affectedRows
}

//delete
async function deleteTask(taskId) {
    let sql = `
        DELETE FROM Task
        WHERE taskId=?
    `
    return await con.query(sql, [taskId])
}

module.exports = { createTask, getTaskById, getAllTasks, updateTask, deleteTask }