const Cartitemservice=require("../services/cartItemservice")



const updateCartitem=async(req,res)=>{
const user='665d8e8f091160682bfe82cf';
    //const user=req.user
    try{
   const updatedCartitem=await Cartitemservice.updateCartitem(user,req.params.id,req.body);
   return res.status(200).send(updatedCartitem);

    }catch(error){
        return res.status(500).send({error:error.message});


    }
}

const removeCartitem=async(req,res)=>{

    const userId=req.user
    console.log(userId);

    try{
   await Cartitemservice.removeCartItem(userId.userId,req.params.id);
   return res.status(200).send({message:"cart removed"});

    }catch(error){
        return res.status(500).send({error:error.message});


    }
}
module.exports={removeCartitem,updateCartitem}
