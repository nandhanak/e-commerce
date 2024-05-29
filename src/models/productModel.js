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
        type: String,
        required: true,
     
      },
      discountPrice: {
        type: String,
        required: true,
     
      },
      discountPersentage: {
        type: String,
        required: true,
       
     
      },
      quantity: {
        type: String,
        required: true,
     
      },
      brand:
        {
            type: String,
            required: true,
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
            ref:"categorys"
           
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