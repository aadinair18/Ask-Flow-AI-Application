const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const middlewareChecks = (req, res, next) => {
    try {
        // Ensure the Authorization header exists
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).send({ message: 'Authorization header is missing or invalid' });
        }

        // Extract the token
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).send({ message: 'Token not found' });
        }

        // Verify the token
        const decoded = jwt.verify(token, "shhh");
        console.log('this is our decoded half -> ', decoded);
        req.user = decoded; // Attach user info to the request object
        next();
    } catch (error) {
        res.status(403).send({ message: 'Invalid or expired token', error: error.message });
    }
};

module.exports = middlewareChecks;
