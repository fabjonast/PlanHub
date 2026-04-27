const express = require("express")
const router = express.Router()
const Calendar = require("../models/calendar")

router.get('/getAllCalendar', async (req, res) => {
    try {
        const calendar = await Calendar.getAllCalendar()
        res.send(calendar)
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

module.exports = router