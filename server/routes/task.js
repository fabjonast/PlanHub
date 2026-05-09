const express = require("express")
const router = express.Router()
const Task = require("../models/task")

router
.get('/getAllTasks', async (req, res) => {
    try {
        const tasks = await Task.getAllTasks()
        res.send(tasks)
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

.get('/getTaskById/:taskId', async (req, res) => {
    try {
        const task = await Task.getTaskById()
        res.send(task)
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

.post('/createTask', async (req, res) => {
    try {
        const {title, priority, status, startDate, endDate, isAllDay, createdAt, userId, scheduleId, categoryId} = req.body
        const taskId = await Task.createTask(title, priority, status, startDate, endDate, isAllDay, createdAt, userId, scheduleId, categoryId)
        res.send({message: "Task created successfully!", taskId})
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

.put('/updateTask/:taskId', async (req, res) => {
    try {
        const affectedRows = await Task.updateTask(req.taskId, req.body)
        res.send({message: "Task updated successfully!", affectedRows})
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

.delete('/deleteTask/:taskId', async (req, res) => {
    try {
        const affectedRows = await Task.deleteTask(req.taskId)
        res.send({message: "Task deleted successfully!", affectedRows})
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

module.exports = router