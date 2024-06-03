const express=require('express');
const routes=express.Router();
const authenticate=require('../MiddleWare/authenticate')

const cartController=require('../controller/cartController')



routes.get('/',authenticate,cartController.findUserCart);
routes.put('/add',authenticate,cartController.addtemCart);

module.exports=routes;

