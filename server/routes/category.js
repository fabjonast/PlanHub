const express = require("express")
const router = express.Router()
const Category = require("../models/category")

router.get('/getAllCategories', async (req, res) => {
    try {
        const categories = await Category.getAllCategories()
        res.send(categories)
    } catch (err) {
        res.statusMessage(401).send({message: err.message})
    }
})

module.exports = router