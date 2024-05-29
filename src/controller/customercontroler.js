const orderServices=require("../services/orderServices")


const createorder=async(req,res)=>{
    try{
        let createOrders=await orderServices.createorder(user,req.body);
        return res.status(201).send(createOrders);
    }
    catch(error){
        return res.status(500).send({error:error.message});
    }
}
const findOrderById=async(req,res)=>{
    try{
        let createOrders=await orderServices.findOrderById(req.params.id);
        return res.status(201).send(createOrders);
    }
    catch(error){
        return res.status(500).send({error:error.message});
    }
}

const userOrderHistory=async(req,res)=>{
    try{
        let createOrders=await orderServices.findOrderById(user._id);
        return res.status(201).send(createOrders);
    }
    catch(error){
        return res.status(500).send({error:error.message});
    }
}
module.exports={
    createorder,
    findOrderById,
    userOrderHistory
}