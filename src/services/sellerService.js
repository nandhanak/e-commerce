const bcrypt = require('bcrypt');
const {CreateSeller}=require('../services/adminService')

const Seller = require('../models/sellerModel'); 
const {generateToken}=require('../Config/sellerJwt')

// Signup route
const sellerController= async (req, res) => {
    try {
       
        const { name, email, password, address, phoneNumber } = req.body;
        console.log(req.body);
        // Check if the email already exists
        const existingSeller = await Seller.findOne({ email });
        if (existingSeller) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new seller
        const newSeller = new Seller({
            name,
            email,
            password: hashedPassword,
           address,
           phoneNumber
        });

       
        await newSeller.save();
        console.log(newSeller,"seleeee");
      //  const CreatenewSeller = await CreateSeller(newSeller._id);
        //console.log("Seller",CreatenewSeller);

        const token = generateToken( newSeller ._id);
        res.cookie("token", token);
        console.log(token);



        res.status(201).json({ message: 'Seller created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const signin= async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the seller exists
        const seller = await Seller.findOne({ email });
        if (!seller) {
            return res.status(404).json({ error: 'Seller not found' });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, seller.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = generateToken(seller._id);
        res.cookie("token", token);
        console.log(token);

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const logout=( res) => {
    res.clearCookie('token').send({ message: 'Logout successful' });
};

module.exports={sellerController,signin,logout};