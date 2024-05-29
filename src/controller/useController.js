const userService = require("../services/useService");
const bcrypt = require("bcrypt");
const User=require("../models/user")
const {genereteToken,getUserIdFromToken}=require('../Config/jwtProvider');

const getUserProfile = async (req, res) => {
    const Token = req.headers.authorization?.split(" ")[1];
    console.log("req", Token);
    try {
        if (!Token) {
            return res.status(400).send("no Token");
        }
        // Decode the JWT token to get the user ID
        const userId = getUserIdFromToken(Token);

        // Retrieve the user profile using the user ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        return res.status(200).send(user);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error occurred");
    }
};

const getAllusers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).send(users);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error occurred");
    }
};

module.exports = { getAllusers, getUserProfile }