const express = require("express")
const router = express.Router()
const Task = require("../models/task")

router.get('/getAllTasks', async (req, res) => {
    try {
        const tasks = await Task.getAllTasks()
        res.send(tasks)
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

module.exports = router