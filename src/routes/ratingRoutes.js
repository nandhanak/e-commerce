const express=require('express');
const routes=express.Router();
const authenticate=require('../MiddleWare/authenticate')
const Ratingcontroller=require('../controller/ratingController')

routes.post('/create',authenticate,Ratingcontroller.createRating);
routes.put('/product:productId',authenticate,Ratingcontroller.getAllRating);

module.exports=routes;