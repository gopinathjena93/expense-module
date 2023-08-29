// app/controllers/expenseDetailController.js
const ExpenseDetail = require('../models/ExpenseDetail');
const Category = require('../models/category');
const logger = require('../logger'); // Update the path accordingly
const db = require('../database');

const expenseDetailController = {
   getAllExpenseDetails: async (req, res) => {
      try {
         const expenseDetails = await ExpenseDetail.findAll();
         if(expenseDetails.length > 0 ) {
            res.status(200).json(expenseDetails);    
         } else {
            res.status(404).json({error : "Data not found fdgfdgdfg"});
         }         
      } catch (err) {
         logger.error({ message: err.message, pageName: req.pageName });
         res.status(500).json({ error: 'Server error' });
      }
   },

   createExpenseDetail: async (req, res) => {
      const t = await db.transaction();
      const { amount, description, date,categoryId } = req.body;
      try {
         const newExpenseDetail = await ExpenseDetail.create({ amount, description, date, categoryId }, { transaction: t });
         await t.commit();      
         res.status(201).json(newExpenseDetail);
      } catch (err) {         
         await t.rollback();
         logger.error({ message: err.message, pageName: req.pageName });
         res.status(500).json({ error: `Server error ${err}` });
      }
      
   },

   updateExpenseDetail: async (req, res) => {     
      const t = await db.transaction();
      const id = req.params.id;
      const { amount, description, date,categoryId } = req.body;      
      try {
         await ExpenseDetail.update(
            { amount, description,categoryId,date},
            { where: { id }}
         );       
         await t.commit();    
         res.status(200).json({message: "Updated Succcessfully"});
      } catch (err) {
         await t.rollback();
         logger.error({ message: err.message, pageName: req.pageName });
         res.status(500).json({ "message":  err.message });
      }
   },

   deleteExpenseDetail: async (req, res) => {
      const id = req.params.id;
      try {
         await ExpenseDetail.destroy({ where: { id } });
         res.json({ message: 'Expense detail deleted successfully' });
      } catch (err) {
         logger.error({ message: err.message, pageName: req.pageName });
         res.status(500).json({ error: 'Server error' });
      }
   },

   getExpenseDetailById: async (req, res) => {
      const id = req.params.id;
      try {
         const expenseDetail = await ExpenseDetail.findByPk(id);
         if (expenseDetail) {
            res.json(expenseDetail);
         } else {
            logger.error({ message: err.message, pageName: req.pageName });
            res.status(404).json({ error: 'Expense detail not found' });
         }
      } catch (err) {
         logger.error({ message: err.message, pageName: req.pageName });
         res.status(500).json({ error: 'Server error' });
      }
   },
};

module.exports = expenseDetailController;
