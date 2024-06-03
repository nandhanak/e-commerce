
const bcrypt = require("bcrypt");
const {genereteToken}= require ("../Config/jwtProvider");
const User = require("../models/user");
const {CreateCart} = require("../services/cartService");



const signup = async (req, res) => {
  try {
      const { email, password, firstName, lastName } = req.body;

      const userExist = await User.findOne({ email });

      if (userExist) {
        console.log("user already exit",userExist);

          return res.status(400).send("User already exists");
          
      }
      else {
          const saltRounds = 10;
          const hashPassword = await bcrypt.hash(password, saltRounds);

          const newUser =  new User({
              email,
              firstName,
              lastName,
              hashPassword,
          });
       
       const newcreated=await newUser.save();
    //  console.log(newcreated);

   
     
          const newUserCreated = await  CreateCart( newcreated._id);
          console.log("cart",newUserCreated);

          const token = genereteToken( newcreated ._id);
          res.cookie("token", token);
         // console.log(token);

          res.status(201).send("Signed up successfully!");
      }
  } catch (error) {
      console.error(error, "Something wrong");
      res.status(500).send("Internal Server Error");
  }
};

const signin = async (req, res) => {

  try {
      const { email, password } = req.body;
      console.log(req.body);

      const user = await User.findOne({ email })//("address");

      if (!user) {
          return res.status(404).send("User not found");
      }

      const matchPassword = await bcrypt.compare(password, user.hashPassword);

      if (!matchPassword) {
          return res.status(400).send("Password is incorrect");
      }

      const token = genereteToken(user);
      res.cookie("token", token);
      console.log(token);
      res.status(200).send("Logged in!");

  } catch (error) {
      console.error(error, "Something wrong");
      res.status(500).send("Internal Server Error");
  }
};

const findUserById=async(user)=>{
    try {
        const userId=await User.findById(user)
        if(!user){
    throw new Error("user not found",userId);
    
        }
        return user;
    } catch (error) {
        throw new Error(error);
    }
}
    

module.exports = { signup, signin ,findUserById};