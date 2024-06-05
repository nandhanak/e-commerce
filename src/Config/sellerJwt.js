const jwt = require('jsonwebtoken');


// Function to generate JWT token
const generateToken = (sellerId) => {
    return jwt.sign({ id: sellerId }, 'your_seller_key', { expiresIn: '1h' }); // Change 'your_secret_key' to a secret key
};

// Middleware to verify JWT token
const SellerAuthorisation= (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: 'Access denied. Token is required' });
    }

    try {
        const decoded = jwt.verify(token, 'your_seller_key'); // Change 'your_secret_key' to your secret key
        req.seller = decoded;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
};

module.exports = { generateToken, SellerAuthorisation};
