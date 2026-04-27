const express = require("express")
const router = express.Router()
const Deadline = require("../models/deadline")

router.get('/getAllDeadlines', async (req, res) => {
    try {
        const deadlines = await Deadline.getAllDeadlines()
        res.send(deadlines)
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

module.exports = router