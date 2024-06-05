const userService =require("../services/useService")
const Cartitem=require("../models/cartitem")

async function updateCartitem(userId,cartItemId,cartItemData){
  console.log(userId,cartItemData,cartItemId);
    try{

      const item=await findCartItemById(cartItemId);
      if(!item){
      return console.log("cart item not found",cartItemId);

      }
      const user=await userService.findUserById(item.user);
      if(!user){
        return console.log("user not found",userId);
              
      }
      console.log(user,"userrrrr");
      if(user._id.toString()===userId.toString()){
        item.quantity=cartItemData.quantity;
        if(item.product && typeof item.product.price === "number" && typeof item.product.discountedPrice === "number"){
        item.price=item.quantity*item.product.price;
        item.discountedPrice=item.quantity*item.product.discountedPrice;
        const updateCartitem=await item.save();
        return updateCartitem
        }
        else {
          console.log("Invalid product price or discounted price:", item.product);
          return;
      }
     } else{
        console.log("you cant updatee this cart");
      }

    }catch(error){
          throw error;
    }
  }

async function removeCartItem(userId, cartItemId) {
  try {
      const cartItem = await findCartItemById(cartItemId);
      const user = await userService.findUserById('665d8e8f091160682bfe82cf');
console.log(cartItemId);
      if ( (user && user._id && cartItem && cartItem.user && user._id.toString() === cartItem.user.toString())) {
          await Cartitem.findByIdAndDelete(cartItemId);
          console.log("Item removed successfully");
          return;
      } else {
          console.log("You can't remove this item");
      }
  } catch (error) {
      console.error("An error occurred:", error);
      throw error;
  }
}
async function findCartItemById(cartItemId){
    const cartItem=await Cartitem.findById(cartItemId)
    if(cartItem){
      console.log(cartItem,"checking");
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