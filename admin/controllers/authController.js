// app/controllers/userController.js
const User = require('../models/User');
const logger = require('../logger'); // Update the path accordingly
const db = require('../database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../service/sendEmail'); 

const authController = {};

authController.register = async (req, res) => {
	const t = await db.transaction();
	try {
		const { username, fullName, mobileNumber, emailAddress, password } = req.body;
		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await User.create({
			username,
			fullName,
			mobileNumber,
			emailAddress,
			password: hashedPassword,
		}, {transaction : t});
		const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
		sendEmail("gopinathjena93@gmail.com","Registration Successfully","your username : gopinath and passwrod is : 123456");
		await t.commit();
		res.status(201).json({ message: 'User registered successfully', token });
	} catch (error) {
		logger.error({ message: error.message, pageName: req.pageName });
		await t.rollback();
		res.status(500).json({ error: error.message });
	}
},

authController.login = async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await User.findOne({ where: { username } });
		const hashedPassword = await bcrypt.hash(password, 10);
		if (!user) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}
		// Compare hashed password
		const passwordMatch = await bcrypt.compare(password, user.password);
			if (!passwordMatch) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}
		// Create a JWT token
		const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
		res.json({ token });
	} catch (error) {
		logger.error({ message: error.message, pageName: req.pageName });
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}
}


module.exports = authController;