const mongoose=require('mongoose')

const AddressShema=new mongoose.Schema({


    firstName: {
        type: String,
        required: true,
       
      },
      lastName: {
        type: String,
        required: true,
       
      },
      streetAddress: {
        type: String,
        required: true,
       
      },
      city: {
        type: String,
        required: true,
       
      },
      state: {
        type: String,
        required: true,
       
      },
     
       
      zipCode: {
        type: String,
        required: true,
       
      },
      
      user:[{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
      }],
      phone: {
        type: String,
        required: true,
       
      },
})
const Address=mongoose.model("address",AddressShema);

module.exports=Address;