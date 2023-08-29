const express = require('express');
const router = express.Router();
const Controller = require('../controllers/pdfController');

router.post('/generate', Controller.generate);

module.exports = router;