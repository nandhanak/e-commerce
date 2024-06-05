require ("dotenv").config();
const express=require('express');
const routes=express.Router();
const { sellerController,signin, logout}=require('../services/sellerService')

routes.post('/signup',sellerController);
routes.post('/signin',signin);
routes.post('/logout',logout)

module.exports= routes;