const express = require("express")
const router = express.Router()
const Deadline = require("../models/deadline")

router
.get('/getAllDeadlines', async (req, res) => {
    try {
        const deadlines = await Deadline.getAllDeadlines()
        res.send(deadlines)
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

.get('/getDeadlineById/:deadlineId', async (req, res) => {
    try {
        const deadline = await Deadline.getDeadlineById()
        res.send(deadline)
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

.post('/createDeadline', async (req, res) => {
    try {
        const {title, dueDate, dueTime, isCompleted, taskId, goalId} = req.body
        const deadlineId = await Deadline.createDeadline(title, dueDate, dueTime, isCompleted, taskId, goalId)
        res.send({message: "Deadline is created successfully!", deadlineId})
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

.put('/updateDeadline/:deadlineId', async (req, res) => {
    try {
        const affectedRows = await Deadline.updateDeadline(req.deadlineId, req.body)
        res.send({message: "Calendar updated successfully!", affectedRows})
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

.delete('/deleteDeadline/:deadlineId', async (req, res) => {
    try {
        const affectedRows = await Deadline.deleteDeadline(req.deadlineId)
        res.send({message: "Calendar deleted successfully!", affectedRows})
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

module.exports = router