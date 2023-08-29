// routes/category.js

const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');

// Route to get all categorys
router.get('/', CategoryController.getAllCategory);

// Route to create a new category
router.post('/', CategoryController.createCategory);

// // Route to get a specific category by ID
router.get('/:id', CategoryController.getCategoryById);

// Route to update a category
router.put('/:id', CategoryController.updatCategory);

// Route to delete a category
router.delete('/:id', CategoryController.deleteCategory);

module.exports = router;