// models/ExpenseDetail.js
const Category = require('./Category'); // Import the Category model
const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Correctly import Sequelize instance
const ExpenseDetail = sequelize.define('expense_detail', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	description: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	amount: {
		type: DataTypes.DECIMAL(10, 2), // Example: 1234.56
		allowNull: false,
	},
	date: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	categoryId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	// categoryId: {
	// 	type: DataTypes.INTEGER, // Using UUID for foreign key
	// 	references: {
	// 	  model: Category,
	// 	  key: 'categoryId',
	// 	},
	//  },
});

// Set up the foreign key relationship
ExpenseDetail.belongsTo(Category, { foreignKey: 'categoryId' });
module.exports = ExpenseDetail;
