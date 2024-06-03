const express=require('express');
const routes=express.Router();
const authenticate=require('../MiddleWare/authenticate')

const CartItemController=require('../controller/cartItemController');

routes.put('./:id',authenticate,CartItemController.updateCartitem);
routes.delete('/:id',authenticate,CartItemController.removeCartitem);


module.exports=routes;