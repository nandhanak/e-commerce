const jwt = require("jsonwebtoken");
const jwtProvider = require("../Config/jwtProvider");
const userService = require('../services/useService');
const bcrypt = require('bcrypt');
const carService = require("../services/cartService");

const register = async (req, res) => {
    try {
        const user = await userService.createUse(req.body);
        console.log(req.body);
        const jwt = jwtProvider.genereteToken(user._id); // Use user._id instead of user.id
        await carService.createCart(user);
        return res.send({ jwt, message: "register success" });
    } catch (error) {
        console.log(error);
    }
}


const login = async (req, res) => {
    const { password, email } = req.body;
    try {
        const user = await userService.getUserByEmail(email);
        if (!user) {
            return res.status(404).send({ message: "user not found email" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: "invalid password" });
        }
        const jwt = jwtProvider.generateToken(user._id);
        return res.send({ jwt, message: "login success" }).status(200);
    } catch (error) {
        res.send(error, "error occurred").status(500);
    }
}

module.exports = { register, login };
