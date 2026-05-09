const express = require("express")
const router = express.Router()
const Reminder = require("../models/reminder")

router
.get('/getAllReminders', async (req, res) => {
    try{
        const reminders = await Reminder.getAllReminders()
        res.send(reminders)
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

.get('/getReminderById/:reminderId', async (req, res) => {
    try {
        const reminder = await Reminder.getReminderById()
        res.send(reminder)
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

.post('/createReminder', async (req, res) => {
    try {
        const {title, date, userId, goalId, scheduleId, taskId} = req.body
        const reminderId = await Reminder.createReminder(title, date, userId, goalId, scheduleId, taskId)
        res.send({message: "Reminder created successfully!", reminderId})
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

.put('/updateReminder/:reminderId', async (req, res) => {
    try {
        const affectedRows = await Reminder.updateReminder(req.reminderId, req.body)
        res.send({message: "Reminder updated successfully!", affectedRows})
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

.delete('/deleteReminder/:reminderId', async (req, res) => {
    try {
        const affectedRows = await Reminder.deleteReminder(req.reminderId)
        res.send({message: "Reminder deleted successfully!", affectedRows})
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

module.exports = router