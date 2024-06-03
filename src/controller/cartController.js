const cartService=require("../services/cartService")

const findUserCart=async(req,res)=>{
    let userId=req.user;
    console.log(userId,"userId");
    try{
        const cart=await cartService.findUserCart(userId.userId);
        console.log("cart2",cart);
        return res.status(200).send(cart);
    }
    catch(error){
        return res.status(500).send({error:error.message});
    }
}

const addtemCart=async(req,res)=>{
    const userId=req.query.user;
    console.log(userId);
    try{
        const cartItem=await cartService.addCartItem(userId, req.body)
        return res.status(200).send(cartItem);
    }
    catch(error){
        return res.status(500).send({error:error.message});
    }
}
module.exports={
    findUserCart,
    addtemCart
}