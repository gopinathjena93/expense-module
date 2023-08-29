// controllers/categoeyController.js

const db = require('../database'); // Correctly import Sequelize instance

const Category = require('../models/category');


const categoeyController = {};

// Get all Category
categoeyController.getAllCategory = async (req, res) => {
    try {
        const category = await Category.findAll();
        if(category.length > 0 ) {
            res.status(200).json({result: category});    
        } else {
            res.status(404).json({error : "Data not foun cvbcbvcbvcb ertretretretert fdgfdgdfgfdgfdg"});
        }  
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

// Create a new Category
categoeyController.createCategory = async (req, res) => {
    const { name } = req.body;
    try {        
        const newCategory = await Category.create({ name });
        res.status(201).json(newCategory);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

// Get a specific Category by ID
categoeyController.getCategoryById = async (req, res) => {
    const id = req.params.id;
    try {
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(category);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

// Update a Category
categoeyController.updatCategory = async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    try {
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        await category.update({ name });
        res.json({ message: 'Category updated successfully' });
    } catch (err) {
        res.status(500).json({ error: `Error updating category ${err}` });
    }
};

// // Delete a Category
categoeyController.deleteCategory = async (req, res) => {
    const id = req.params.id;
    try {
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        await category.destroy();
        res.json({ message: 'Category deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: `Error deleting Category ${err}` });
    }
};

module.exports = categoeyController;