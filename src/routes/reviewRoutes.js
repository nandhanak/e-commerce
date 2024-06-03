const express=require('express');
const routes=express.Router();
const authenticate=require('../MiddleWare/authenticate')
const reviwController=require('../controller/reviewController')

routes.post('/create',authenticate,reviwController.createReview);
routes.get('/product/:productId',authenticate,reviwController.getAllReview);

module.exports=routes;