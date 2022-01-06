const Category = require('../models/category.model')

const categoryController = {
    getCategory: async (req, res) => {
        try {
            const categories = await Category.find()
            res.json(categories)
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    createCategory: async (req, res) => {
        try {
            const { name } = req.body
            const category = await Category.findOne({ name })
            if(category) return res.status(400).json({ msg: 'Category already exists'})

            const newCategory = new Category({ name })
            await newCategory.save()
            res.json({ msg: 'Create success category'})
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    deleteCategory: async (req, res) => {
        try {
            await Category.findOneAndDelete(req.params.id)
            res.json({ msg: 'Delete success'})
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    updateCategory: async (req, res) => {
        try {
            const { name }= req.body
            await Category.findOneAndUpdate({ _id: req.params.id }, { name })
            res.json({ msg: 'Update success' })
        } catch (error) {
            
        }
    }
}

module.exports = categoryController