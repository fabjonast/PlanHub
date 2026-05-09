const con = require("./db_connect")

async function createNoteTable() {
    let sql = `
    CREATE TABLE IF NOT EXISTS Note(
        noteId INT AUTO_INCREMENT PRIMARY KEY,
        content TEXT NOT NULL,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated DATETIME,
        taskId INT,
        goalId INT,
        reminderId INT,
        FOREIGN KEY (taskId) REFERENCES Task(taskId),
        FOREIGN KEY (goalId) REFERENCES Goal(goalId),
        FOREIGN KEY (reminderId) REFERENCES Reminder(reminderId)
    );`

    await con.query(sql)
}

createNoteTable()

//create
async function createNote(content, createdAt, updated, taskId, goalId, reminderId) {
    let sql = `
        INSERT INTO Note(content, createdAt, updated, taskId, goalId, reminderId)
        VALUES(?, ?, ?, ?, ?, ?);
    `
    const[rows] = await con.query(sql, [content, createdAt, updated, taskId, goalId, reminderId])
    return rows.insertId
}

//read one note
async function getNoteById(noteId) {
    let sql = `
        SELECT * FROM Note
        WHERE noteId=?;
    `
}

//read all notes
async function getAllNotes() {
    let sql = `SELECT * FROM Note;`

    return await con.query(sql)
}

//update
async function updateNote(noteId, fields) {
    const allowed = ['content', 'createdAt', 'updated', 'taskId', 'goalId', 'reminderId']
    const updates = Object.keys(fields).filter(k => allowed.includes(k))

    if(updates.length === 0) throw new Error("No valid fields to update")

    const setClause = updates.map(k => `${k} = ?`).join(', ')
    const values = updates.map(k => fields[k])

    let sql = `
        UPDATE Note SET ${setClause}
        WHERE noteId=?;
    `
    const [result] = await con.query(sql, [...values, noteId])
    return result.affectedRows
}

//delete
async function deleteNote(noteId) {
    let sql = `
        DELETE FROM Note
        WHERE noteId=?;
    `
    return await con.query(sql, [noteId])
}

module.exports = { createNote, getNoteById, getAllNotes, updateNote, deleteNote }