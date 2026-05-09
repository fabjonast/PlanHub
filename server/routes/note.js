const express = require("express")
const router = express.Router()
const Note = require("../models/note")

router
.get('/getAllNotes', async (req, res) => {
    try {
        const notes = await Note.getAllNotes()
        res.send(notes)
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

.get('/getNoteById/:noteId', async (req, res) => {
    try {
        const note = await Note.getNoteById()
        res.send(note)
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

.post('/createNote', async (req, res) => {
    try {
        const {content, createdAt, updated, taskId, goalId, reminderId} = req.body
        const noteId = await Note.createNote(content, createdAt, updated, taskId, goalId, reminderId)
        res.send({message: "Note created successfully!", noteId})
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

.put('/updateNote/:noteId', async (req, res) => {
    try {
        const affectedRows = await Note.updateNote(req.noteId, req.body)
        res.send({message: "Note updated successfully!", affectedRows})
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

.delete('/deleteNote/:noteId', async (req, res) => {
    try {
        const affectedRows = await Note.deleteNote(req.noteId)
        res.send({message: "Note deleted successfully!", affectedRows})
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

module.exports = router