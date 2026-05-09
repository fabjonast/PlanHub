const con = require("./db_connect")

async function createGoalTable() {
    let sql = `
    CREATE TABLE IF NOT EXISTS Goal(
        goalId INT AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        categoryId INT,
        title VARCHAR(100) NOT NULL,
        status ENUM('active', 'completed', 'abandoned') NOT NULL DEFAULT'active',
        startDate DATE NOT NULL,
        targetDate DATE NOT NULL,
        created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES User(userId),
        FOREIGN KEY (categoryId) REFERENCES Category(categoryId)
    );`

    await con.query(sql)
}

createGoalTable()

//create
async function createGoal(userId, categoryId, title, status, startDate, targetDate, created, updated) {
    let sql = `
        INSERT INTO Goal(userId, categoryId, title, status, startDate, targetDate, created, updated)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?);
    `
    const[rows] = await con.query(sql, [userId, categoryId, title, status, startDate, targetDate, created, updated])
    return rows.insertId
}

//read one goal
async function getGoalById(goalId) {
    let sql = `
        SELECT * FROM Goal
        WHERE goalId=?;
    `
    let goal = await con.query(sql, [goalId])
    return goal[0]
}

//read all goals
async function getAllGoals() {
    let sql = `SELECT * FROM Goal;`

    return await con.query(sql)
}

//update
async function updateGoal(goalId, fields) {
    const allowed = ['userId', 'categoryId', 'title', 'status', 'startDate', 'targetDate', 'created', 'updated']
    const updates = Object.keys(fields).filter(k => allowed.includes(k))

    if(updates.length === 0) throw new Error("No valid fields to update")

    const setClause = updates.map(k => `${k} = ?`).join(', ')
    const values = updates.map(k => fields[k])

    let sql = `
        UPDATE Goal SET ${setClause}
        WHERE goalId=?;
    `
    const [result] = await con.query(sql, [...values, goalId])
    return result.affectedRows
}

//delete
async function deleteGoal(goalId) {
    let sql = `
        DELETE FROM Goal
        WHERE goalId=?
    `
    return await con.query(sql, [goalId])
}

module.exports = { createGoal, getGoalById, getAllGoals, updateGoal, deleteGoal }