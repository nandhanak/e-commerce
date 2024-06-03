const mongoose=require ('mongoose')


const cardShema=new mongoose.Schema({

   
      cardItem:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"cardItems",
        required:true
      }],
      totalPrice: {
        type: Number,
        required: true,
        default:0
     
      },
      totalItem: {
        type: Number,
        required: true,
        default:0
     
      },
      totalDiscountPrice: {
        type: Number,
        required: true,
       default:0
     
      },
      discounte: {
        type: Number,
        required: true,
        default:0
     
      },
      user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
     
   
});

const Card=mongoose.model("carts",cardShema)

module.exports=Card;