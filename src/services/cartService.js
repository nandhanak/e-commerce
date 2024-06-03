
const Cart=require("../models/CardModel")
 const Cartitem=require("../models/cartitem")
 const Products=require("../models/productModel");

const User=require("../models/user");
 
 

async function CreateCart(user){

try{
    
        const cart= new Cart({ user});
       const createdCart=await cart.save();
    console.log("createdCart",createdCart);
      return createdCart;
       
}
catch(error){
  throw error;
  }
}


async function findUserCart(userId) {
 
  try {
    console.log(userId);
  let cart = await Cart.findOne({user:userId});

  console.log("cart1",cart);
      if (!cart) {

          throw new Error("Cart not found");

      }
      return cart

      
    }    


  catch (error) {
      throw error;
  }
  
}

async function addCartItem(userId, req) {
  try {
    console.log(userId);
    const cart = await Cart.findOne({ user:userId });
    const product = await Products.findById(req.productId);
if(!cart){
  throw error
}
console.log("success");
    if (!product) {
      throw new Error("Product not found");
    }

    const isPresent = await Cartitem.findOne({ cart: cart._id, product: product._id, user });

    if (!isPresent) {
      const cartItem = new Cartitem({
        product: product._id,
        cart: cart._id,
        quantity: 1,
        user,
        price: product.price, // Assuming discountedPrice is the actual price     
        size: req.size,
        discountedPrice: product.discountedPrice,
      });
     
      
      

      const createdCartItem = await cartItem.save();
      cart.cartItems.push(createdCartItem); // Assuming the array name is cartItems, update it accordingly if different
      await cart.save();
      return "Item added to cart";
    } else {
      return "Item is already in the cart";
    }
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to be caught by the caller
  }
}


module.exports={findUserCart,addCartItem,CreateCart};