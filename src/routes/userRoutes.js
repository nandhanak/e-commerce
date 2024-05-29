const express=require('express');
const routes=express.Router();

const userController=require("../controller/useController")


routes.get("/profile",userController.getUserProfile);
routes.get("/",userController.getAllusers);

module.exports=routes