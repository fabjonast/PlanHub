const express = require("express")
const router = express.Router()
const Schedule = require("../models/schedule")

router
.get('/getAllSchedules', async (req, res) => {
    try {
        const schedules = await Schedule.getAllSchedules()
        res.send(schedules)
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

.get('/getScheduleById/:scheduleId', async (req, res) => {
    try {
        const schedule = await Schedule.getScheduleById()
        res.send(schedule)
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

.post('/createSchedule', async (req, res) => {
    try {
        const {type, title, calendarId} = req.body
        const scheduleId = await Schedule.createSchedule(type, title, calendarId)
        res.send({message: "Schedule created successfully!", scheduleId})
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

.put('/updateSchedule/:scheduleId', async (req, res) => {
    try {
        const affectedRows = await Schedule.updateSchedule(req.scheduleId, req.body)
        res.send({message: "Schedule updated successfully!", affectedRows})
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

.delete('/deleteSchedule/:scheduleId', async (req, res) => {
    try {
        const affectedRows = await Schedule.deleteSchedule(req.scheduleId)
        res.send({message: "Schedule deleted successfully!", affectedRows})
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

module.exports = router