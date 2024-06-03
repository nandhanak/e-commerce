const express=require('express');
const routes=express.Router();

const OrderController=require('../controller/adminorderControll');
const authenticate=require('../MiddleWare/authenticate')



routes.get('/',authenticate,OrderController.getAllOrders);
routes.put("/:orderId/confired",authenticate,OrderController.conformorder);
routes.put("/:orderId/ship",authenticate,OrderController.shipporder);
routes.put("/:orderId/deliver",authenticate,OrderController.deliverorder);
routes.put("/:orderId/cancel",authenticate,OrderController.cancelledorder);
routes.put("/:orderId/delete",authenticate,OrderController.deleteorder);


module.exports=routes;
