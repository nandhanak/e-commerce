
require ("dotenv").config();
const generateToken=require('../Config/adminJwt')
const bcrypt=require('bcrypt')
const adminModel = require("../models/adminMdel");


async function CreateSeller(sellers){

    try{
        
            const admin= new adminModel({sellers});
            console.log(admin);
           const createdseller=await admin.save();
        console.log("createdseller",createdseller);
          return  createdseller;
           
    }
    catch(error){
      throw error;
      }
    }


const adminSignIn = async (req, res) => {
    const adminEmail = process.env.ADMIN_EMAIL;
    try {
        const { email, password } = req.body;
        console.log(req.body);
        if (!email || !password) {
            res.send(400).json({message:"email and password required"})
        }

        let admin = await adminModel.findOne({email: adminEmail});
        if (email != admin.email) {
            return res.status(401).json({ message: 'Admin not found..' });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }


        if (isPasswordValid && admin) {
            const token = generateToken(admin._id);
            res.cookie("access_token", token, { httpOnly: true });
    
            res.status(200).json({ message: 'Login successful' });
        }
      
    } catch (error) {
        console.error("Error", error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = adminSignIn;






const adminSignUpController = async (req, res) => {
    try {
    
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;
const { email, password ,name} = req.body;
console.log(req.body);
        // Check if the admin already exists
        const existingAdmin = await adminModel.findOne({ email: adminEmail });

        if (existingAdmin) {
            throw new Error("Admin already exists");
        }


        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        // Create the admin
        const adminData = new adminModel({
            name: 'Nandhana',
            email:adminEmail,
            password: hashedPassword,
            role: 'Admin'
            
        });
        const saveAdmin = await adminData.save();

        // Generate token
        const token = jwt.sign({ id: saveAdmin._id }, process.env.TOKEN_SECRET_KEY, { expiresIn: '1h' });

        // Set token in cookie
        res.cookie('token', token, { httpOnly: true });

        res.status(200).json({
            data: saveAdmin,
            success: true,
            error: false,
            message: "Admin Created Successfully"
        });
    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

const adminLogout = (req, res) => {
    res.clearCookie("access_token");
    res.status(200).json({ message: 'Logout successful' });
};




module.exports = {adminSignUpController,adminSignIn,adminLogout,CreateSeller};