const express = require("express")
const router = express.Router()
const Schedule = require("../models/schedule")

router.get('/getAllSchedules', async (req, res) => {
    try {
        const schedules = await Schedule.getAllSchedules()
        res.send(schedules)
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

module.exports = router