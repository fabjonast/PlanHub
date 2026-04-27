const express = require("express")
const router = express.Router()
const Reminder = require("../models/reminder")

router.get('/getAllReminders', async (req, res) => {
    try{
        const reminders = await Reminder.getAllReminders()
        res.send(reminders)
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

module.exports = router