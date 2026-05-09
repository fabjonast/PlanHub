const express = require("express")
const router = express.Router()
const Goal = require("../models/goal")

router
.get('/getAllGoals', async (req, res) => {
    try {
        const goals = await Goal.getAllGoals()
        res.send(goals)
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

.get('getGoalById/:goalId', async (req, res) => {
    try {
        const goal = await Goal.getGoalById()
        res.send(goal)
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

.post('/createGoal', async (req, res) => {
    try {
        const {userId, categoryId, title, status, startDate, targetDate, created, updated} = req.body
        const goalId = await Goal.createGoal(userId, categoryId, title, status, startDate, targetDate, created, updated)
        res.send({message: "Goal created successfully!", goalId})
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

.put('updateGoal/:goalId', async (req, res) => {
    try {
        const affectedRows = await Goal.updateGoal(req.goalId, req.body)
        res.send({message: "Goal updated successfully!", affectedRows})
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

.delete('/deleteGoal/:goalId', async (req, res) => {
    try {
        const affectedRows = await Goal.deleteGoal(req.goalId)
        res.send({message: "Goal deleted successfully!", affectedRows})
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

module.exports = router