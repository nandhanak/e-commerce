const mongoose=require ('mongoose')


const productShema=new mongoose.Schema({
    title: {
        type: String,
        required: true,
       
      },
      discription: {
        type: String,
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
      discountPersentage: {
        type: Number,
       required:true,
       
     
      },
      quantity: {
        type: Number,
        required: true,
     
      },
      brand:
        {
            type: String,
           
        }
    ,
     color:
        {
            type: String, 
        }
      ,sizes:[
        {
        name:{type:String},
        quantity:{type:Number}
    }
      ],
     
      imageUrl:
        {
            type: String,
        },
        ratings: [{
            type:mongoose.Schema.Types.ObjectId,
            ref:"ratings",
           
          }],

          reviews: [{
            type:mongoose.Schema.Types.ObjectId,
            ref:"reviews"
           
          }],
          numratings: {
            type: Number,
           default:0,
         
          },
          category: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"category"
           
          },
          createAt:
          {
              type: Date,
              default:Date.now
          }
      ,
})

const product=mongoose.model("product",productShema)

module.exports=product;