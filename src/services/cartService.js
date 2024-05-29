 const Card = require("../models/CardModel");
const Cart=require("../models/CardModel")
 const Cartitem=require("../models/cartitem")
 const Products=require("../models/productModel")
 

 async function CreateCart(user){

try{
    
        const cart=new Cart({user})
        const createdCart=await cart.save();
        return createdCart
}
catch(error){
    res.send("error", error);
    console.log(error);
  }
}




async function findUserCart(userId){
  try{
    let cart=await Cart.findOne({user:user});
    const cartItem =await Cartitem.find({cart:cart._id}).populate("products");
    cart.cartItem=cartItem;

    let totalPrice=0;
    let totalDiscountPrice=0;
    let totalItem=0;

    for(let cartItem of cart.cartItem){
      totalPrice+=cartItem.price;
      totalDiscountPrice+=cartItem.discountedPeice;
      totalItem+=cartItem.quatity;

    }
    cart.totalPrice=totalPrice;
    cart.totalItem=totalItem;
    cart.discounte=totalPrice-totalDiscountPrice;

    return cart;
  }
  catch(error){
  res.error(error.message)
  }

}

async function addCartItem(userId,req){
  try{
   const cart=await Card.findOne({user:userId});
   const product=await  Products.findById(req.productId);

   const isPresent= await Cartitem.findOne({cart:cart._id,product:product._id,userId})

   if(!isPresent){
    const cartItem=new Cartitem({
    product:product._id,
    cart:cart._id,
    quatity:1,
    userId,
    price:product.discountedPrice,
    size:req.size,
    discountedPrice:product.discountedPrice,

  })
   const createdCart=await cartItem.save();
   cart.cartItem.push(createdCart);
   await cart.save();
   return "Item added to cart"


}

  }
    catch(error){
      res.error(error.message)

    }
  }


module.exports={findUserCart,addCartItem,CreateCart};