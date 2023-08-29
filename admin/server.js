
const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const cron = require('node-cron');
const moment = require('moment-timezone');
const ejs = require('ejs');
const path = require('path'); // Import the 'path' module
const db = require('./database');

const expenseDetailRoutes = require('./routes/expenseDetailRoutes');
const categotyRoutes = require('./routes/category');
const authRoutes = require('./routes/auth');
const pdfRoutes = require('./routes/pdf');
const verifyToken = require('./middleware/verifyToken');
const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Middleware
app.use(bodyParser.json());
app.use(cors());

// Middleware to add page name to request object
app.use((req, res, next) => {
	req.pageName = req.path; // You can customize this based on your route structure
	next();
});

// Error handler middleware
app.use((err, req, res, next) => {
	logger.error({ message: err.message, pageName: req.pageName });
});


// Routes
app.use('/expenseDetail', verifyToken, expenseDetailRoutes);
app.use('/category', verifyToken, categotyRoutes);
app.use('/auth', authRoutes);
app.use('/pdf', verifyToken, pdfRoutes);

// We'll create this later

// Import your models
// const job = cron.schedule('* * * * * *', () => {
//   console.log('This job runs every minute');
//   // Place your task logic here
// });


// Create the tables in the database
db.sync({ force: false }) // set 'force' to 'true' if you want to drop existing tables and re-create them
.then(() => {
	const port = process.env.PORT || 3000;
	app.listen(port, () => {
		console.log(`Server started on port ${port}`);
	});
})
.catch((err) => {
	console.error('Error syncing database:', err);
});

// Start the server
