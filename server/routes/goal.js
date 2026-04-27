const express = require("express")
const router = express.Router()
const Goal = require("../models/goal")

router.get('/getAllGoals', async (req, res) => {
    try {
        const goals = await Goal.getAllGoals()
        res.send(goals)
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

module.exports = router