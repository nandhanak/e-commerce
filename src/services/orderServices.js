const cartService=require("../services/cartService")
const Address=require("../models/AddressModel");
const product = require("../models/productModel");
const Order=require("../models/ordermodel");
const OrderItem=require('../models/orderitem')





async function createorder(user, shippingAddress) {
    try {
        let address;
        if (shippingAddress._id) {
            let isExist = await Address.findById(shippingAddress._id);
            address = isExist;
        } else {
            address = new Address(shippingAddress);
            address.user = user;
            await address.save();
            console.log("user.address", user.address);
            user.address.push(address);
            await user.save();
            console.log(user);
        }

//const cart = await cartService.findUserCart(user._id);
        console.log(cart);
        const orderItems = [];

        for (const item of cart.cartItems) {
            const orderItem = new OrderItem({
                price: item.price,
                product: item.product,
                quantity: item.quantity,
                size: item.size,
                userId: item.userId,
                discountedPrice: item.discountedPrice,
            });
            const createOrderItem = await orderItem.save();
            orderItems.push(createOrderItem);
        }

        const createOrder = new Order({
            user,
            orderItems,
            totalPrice: cart.totalPrice,
            totalDiscountedPrice: cart.totalDiscountPrice,
            discounte: cart.discounte,
            totalItem: cart.totalItem,
            shippAddress: address,
        });

        const saveOrder = await createOrder.save();
        return saveOrder;
    } catch (error) {
        throw error;
    }
}


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
    
    confiremeOrder,
    shipOrder,
    deliveryOrder,
    CanceldOrder,
    findOrderById,
    userOrderHistory,
    getAllOrders,
    deleteOrders
}