const jwt=require("jsonwebtoken")
require ("dotenv").config();
const Secretkey="dbcFJHBVBVN56789";


const genereteToken=(userId)=>{
    return jwt.sign({userId},Secretkey,{expiresIn:"1d"});
};



const getUserIdFromToken = (Token) => {
  
        // Verify the JWT token
        const decoded = jwt.verify(Token, Secretkey);

        // Extract the user ID from the decoded token
        const userId = decoded.userId;

        return userId;
   
};
  module.exports={genereteToken,getUserIdFromToken};