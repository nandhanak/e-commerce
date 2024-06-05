

const express=require('express');
const adminRouter=express.Router();
const adminService=require('../services/adminService')
const adminToken=require('../MiddleWare/adminToken')


adminRouter.post("/signup",adminService.adminSignUpController)
adminRouter.post("/signin", adminService.adminSignIn)
adminRouter.post("/logout", adminService.adminLogout)

module.exports=adminRouter;