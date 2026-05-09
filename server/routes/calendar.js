const express = require("express")
const router = express.Router()
const Calendar = require("../models/calendar")

router
.get('/getAllCalendars', async (req, res) => {
    try {
        const calendars = await Calendar.getAllCalendars()
        res.send(calendars)
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

.get('/getCalendarById/:calendarId', async (req, res) => {
    try {
        const calendar = await Calendar.getCalendarById
        res.send(calendar)
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

.post('/createCalendar', async (req, res) => {
    try {
        const {name, userId} = req.body
        const calendarId = await Calendar.createCalendar(name, userId)
        res.send({message: "Calendar created successfully!", calendarId})
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

.put('/updateCalendar/:calendarId', async (req, res) => {
    try {
        const affectedRows = await Calendar.updateCalendar(req.calendarId, req.body)
        res.send({message: "Calendar updated successfully!", affectedRows})
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

.delete('/deleteCalendar/:calendarId', async (req, res) => {
    try {
        const affectedRows = await Calendar.deleteCalendar(req.calendarId)
        res.send({message: "Calendar deleted successfully!", affectedRows})
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

module.exports = router