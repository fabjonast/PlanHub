const con = require("./db_connect")

async function createCategoryTable() {
    let sql = `
    CREATE TABLE IF NOT EXISTS Category(
        categoryId INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        color VARCHAR(20),
        icon VARCHAR(50),
        userId INT NOT NULL,
        FOREIGN KEY (userId) REFERENCES User(userId),
        UNIQUE(userId, name)
    );`

    await con.query(sql)
}

createCategoryTable()

//create
async function createCategory(name, color, icon, userId) {
    let sql = `
        INSERT INTO Category(name, color, icon, userId)
        VALUES(?, ?, ?, ?);
    `
    const[rows] = await con.query(sql, [name, color, icon, userId])
    return rows.insertId
}

//read one category
async function getCategoryById(categoryId) {
    let sql = `
        SELECT * FROM Category
        WHERE categoryId=?;
    `
    let category = await con.query(sql, [categoryId])
    return category[0]
}

//read all categories
async function getAllCategories() {
    let sql = `SELECT * FROM Category;`

    return await con.query(sql)
}

//update
async function updateCategory(categoryId, fields) {
    const allowed = ['name', 'color', 'icon', 'userId']
    const updates = Object.keys(fields).filter(k => allowed.includes(k))

    if(updates.length === 0) throw new Error("No valid fields to update")

    const setClause = updates.map(k => `${k} = ?`).join(', ')
    const values = updates.map(k => fields[k])

    let sql = `
        UPDATE Category SET ${setClause}
        WHERE categoryId=?;
    `
    const [result] = await con.query(sql, [...values, categoryId])
    return result.affectedRows
}

//delete
async function deleteCategory(categoryId) {
    let sql = `
        DELETE FROM Category
        WHERE categoryId=?
    `
    return await con.query(sql, [categoryId])
}

module.exports = { createCategory, getCategoryById, getAllCategories, updateCategory, deleteCategory }