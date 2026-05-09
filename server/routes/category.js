const express = require("express")
const router = express.Router()
const Category = require("../models/category")

router
.get('/getAllCategories', async (req, res) => {
    try {
        const categories = await Category.getAllCategories()
        res.send(categories)
    } catch (err) {
        res.statusMessage(401).send({message: err.message})
    }
})

.get('/getCategoryById/:categoryId', async (req, res) => {
    try {
        const category = await Category.getCategoryById()
        res.send(category)
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

.post('/createCategory', async (req, res) => {
    try {
        const {name, color, icon, userId} = req.body
        const categoryId = await Category.createCategory(name, color, icon, userId)
        res.send({message: "Category created successfully!", categoryId})
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

.put('/updateCategory/:categoryId', async (req, res) => {
    try {
        const affectedRows = await Category.updateCategory(req.categoryId, req.body)
        res.send({message: "Category updated successfully!", affectedRows})
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

.delete('/deleteCategory/:categoryId', async (req, res) => {
    try {
        const affectedRows = await Category.deleteCategory(req.categoryId)
        res.send({message: "Category deleted successfully!", affectedRows})
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

module.exports = router