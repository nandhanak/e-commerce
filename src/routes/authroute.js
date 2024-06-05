const express=require('express');
const routes=express.Router();
const {signup,signin}=require('../services/useService')


routes.post("/signup",signup);
routes.post("/signin",signin);


module.exports=routes;
