const express=require('express');
const routes=express.Router();
const authenticate=require('../MiddleWare/authenticate')

const ordercontroller=require('../controller/OrderCOntroller')

routes.post('/',authenticate,ordercontroller.createOrder);
routes.get('/user',authenticate,ordercontroller.OrderHistory);
routes.get('/:id',authenticate,ordercontroller.findOrderById);


module.exports=routes;
