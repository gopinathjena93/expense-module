const jwt = require('jsonwebtoken');
const logger = require('../logger'); // Update the path accordingly

const  verifyToken = (req, res, next) =>  {
   const token = req.header('Authorization');  
   if (!token) {
      return res.status(401).json({ message: 'Access denied. Token missing.' });
   }

   try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);    
      req.user = decoded;
      next();
   } catch (error) { 
      logger.error({ message: error.message, pageName: req.pageName });
      res.status(401).json({ message: 'Access denied. Invalid token.' });
   }
}

module.exports = verifyToken;