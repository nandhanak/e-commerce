const mongoose=require ('mongoose')


const cardItemShema=new mongoose.Schema({
    cart:{
        type:mongoose.Schema .Types.ObjectId,
        ref:"carts",
        required:true
      },
      product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product",
        required:true
      },
      size: {
        type: String,
        required: true,
     
      },
      quantity: {
        type: Number,
        required: true,
        default:1
     
      },
      price: {
        type: Number,
        required: true,
       
     
      },
      discountedPrice: {
        type: Number,
        required: true,
      },
      user: {
        type:mongoose.Schema .Types.ObjectId,
       ref:'User',
       required:true
     
      },
});

const CardItem=mongoose.model("cardItems",cardItemShema)

module.exports=CardItem;