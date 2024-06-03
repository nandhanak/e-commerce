const mongoose=require ('mongoose')


const orderShema=new mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
            ref:"User"
       
      },
      orderitems: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"orderItems"
       
      }],
      orderDate: {
        type: String,
        required: true,
     
      },
     deliveryDate: {
        type: Date,

       
     
      },
      shippingAddress: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"address"
     
      },
      paymentDetails: {
       paymentMethod:{
        type:String,
       },
       transactionId:{
        type:String,

       },
       paymentId:{
        type:String,

       },
       paymentStatus:{
         type:String,
       }
     
      },
      
      totalPrice:{
        type:String,
        required:true
      },
      totalDicountPrice:{
        type:Number,
        required:true
      },
      dicounte:{
        type:String,
        required:true
      },
      orderStatus:{
        type:String,
        required:true,
        default:'PENDING'
      },
      totalItem:{
        type:Number,
        required:true
      },
      createAd:{
        type:Date,
        required:Date.now,
      },



})

const order=mongoose.model("order",orderShema)

module.exports=order;