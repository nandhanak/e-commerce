const mongoose=require ('mongoose')


const orderItemShema=new mongoose.Schema({
  
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"products",
        require:true
      },
      size: {
        type: Number,
      
     
      },
      quantity: {
        type: Number,
        required: true,
      
     
      },
      price: {
        type: Number,
        required: true,
       
     
      },
      discountedPrice: {
        type: Number,
        required: true,
      
     
      },
      userId: {
        type:mongoose.Schema .Types.ObjectId,
       ref:'users',
       required:true
     
      },
     
     
     
      
})

const OrderItem=mongoose.model("Orderitem",orderItemShema)

model.exports=OrderItem;