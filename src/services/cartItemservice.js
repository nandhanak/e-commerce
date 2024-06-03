const userService =require("../services/useService")
const Cartitem=require("../models/cartitem")

async function updateCartitem(userId,cartItemId,cartItemData){
    try{

      const item=await findCartItemById(cartItemId);
      if(!item){
      return console.log("cart item not found",cartItemId);

      }
      const user=userService.findUserById(item.userId);
      if(!user){
        return console.log("user not found",userId);
              
      }
      if(user._id.toString()===userId.toString()){
        item.quantity=cartItemData.quantity;
        item.price=item.quantity*item.product.price;
        item.discounterdPrice=item.quantity*item.product.discounterdPrice;
        const updateCartitem=await item.save();
        return updateCartitem
      }
      else{
        console.log("you cant updatee this cart");
      }

    }catch(error){

    }
}
async function removeCartItem(userId,cartItemId){
    const cartItem=await findCartItemById(cartItemId);
    const user=await userService.findUserById(userId);


    if(user._id.toString()===cartItem.userId.toString()){
        await Cartitem.findByIdAndDelete(cartItemId)

    }
    return console.log("you cant remove");

}
async function findCartItemById(cartItemId){
    const cartItem=await findCartItemById(cartItemId);
    if(cartItem){
        return cartItem
    }
    else{
        return console.log("cartitem not found with id",cartItemId);
    }
}
module.exports={
    updateCartitem,
    removeCartItem,
    findCartItemById
}