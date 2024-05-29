const cartService=require("../services/cartService")
const Address=require("../models/AddressModel");
const product = require("../models/productModel");
const Order=require("../models/ordermodel");
const { populate } = require("../models/user");


async function createorder(user,shippAddress){
    let address;
    if(shippAddress._id){
        let isExist=await Address.findById(shippAddress._id);
        address=existAddress;

    
    }
    else{
        address=new Address(shippAddress);
        address.user=user;
        await address.save()


        user.addresses.pus(address);
        await user.save();

    }
   const cart=await cartService.findUserCart(user._id);
   const orderItems=[];

   for(const item of cart.cartItems){
    const orderItems=new orderItems({
        price:item.price,
        product:item.product,
        quantity:item.quantity,
        size:item.size,
        userId:item.userId,
        discountedPrice:item.discountedPrice,

    })
    const createorderItem=await orderItems.save();
    orderItems.push(createorderItem);


   }
   const createorder=new  Order({
    user,
    orderItems,
    totalPrice:cart.totalPrice,
    totalDiscountedPrice:cart.totalDiscountPrice,
    discounte:cart.discounte,
    totalItem:cart.totalItem,
    shippAddress:address,

   })
   const saveOrder=await createorder.save();

   return saveOrder;

}

async function placeOrder(orderId){
    const order=await findOrderById(orderId);

    order.orderStatus="PLACED";
    order.paymentDetails.status="PLACED";
    
    return await order.save()

    
}

    `   `


async function confiremeOrder(orderId){
    const order =await findOrderById(orderId);
  
    order.orderStatus="CONFIRMED";
   
    return await order.save();
    `   `
}

async function shipOrder(orderId){
    const order =await findOrderById(orderId);
    
    order.orderStatus="SHIPPED";
   
    return await order.save();
    `   `
}

async function deliveryOrder(orderId){
    const order =await findOrderById(orderId);
    
    order.orderStatus="DELIVERED";
   
    return await order.save();
    `   `
}
async function CanceldOrder(orderId){
    const order =await findOrderById(orderId);
    
    order.orderStatus="CANCELLED";
   
    return await order.save()
}

async function findOrderById(orderId){

    const order=await Order.findById(orderId)
    .populate("user")
    .populate({path:"orderItem",populate:{path:"product"}})
    .populate("shippingAddress")
    
    return order

}

async function userOrderHistory(orderId){
    try{
        const orders=await Order.find({user:userId,orderStatus:"PLACED"})
        .populate({path:"orderItem",populate:{path:"product"}}).lean()
         
    return orders;
    }
    catch(error){
return console.log(error);
    }
}

async function getAllOrders(){
    return await Order.find()
    .populate({path:"orderItem",populate:{path:"product"}}).lean()
}
async function deleteOrders(orderId){
    const order=await findOrderById(orderId);
    await Order.findByIdAndDelete(order._id);
}

module.exports={
    createorder,
    placeOrder,
    confiremeOrder,
    shipOrder,
    deliveryOrder,
    CanceldOrder,
    findOrderById,
    userOrderHistory,
    getAllOrders,
    deleteOrders
}