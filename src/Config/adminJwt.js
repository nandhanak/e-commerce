const jwt = require('jsonwebtoken');
const Secretkey=process.env.ADMIN_TOKEN
require ("dotenv").config();



const generateToken = (adminId) => {
    const token = jwt.sign({ adminId }, Secretkey, { expiresIn: '1h' });
    return token;
};
module.exports=generateToken;