// app/routes/expenseDetailRoutes.js
const express = require('express');
const router = express.Router();
const expenseDetailController = require('../controllers/expenseController');

router.get('/', expenseDetailController.getAllExpenseDetails);
router.post('/', expenseDetailController.createExpenseDetail);
router.put('/:id', expenseDetailController.updateExpenseDetail);
router.delete('/:id', expenseDetailController.deleteExpenseDetail);
router.get('/:id', expenseDetailController.getExpenseDetailById);

module.exports = router;



