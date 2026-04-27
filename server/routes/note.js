const express = require("express")
const router = express.Router()
const Note = require("../models/note")

router.get('/getAllNotes', async (req, res) => {
    try {
        const notes = await Note.getAllNotes()
        res.send(notes)
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

module.exports = router