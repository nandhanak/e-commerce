const express=require('express');
const routes=express.Router();
const authenticate=require('../MiddleWare/authenticate')

const productControll=require('../controller/productControll');


routes.get('/',authenticate,productControll.getAllProduct);
routes.get('/id:id',authenticate,productControll.findProductByid);

module.exports=routes;