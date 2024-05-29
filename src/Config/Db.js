const mongoose=require('mongoose');




const connetDB=async()=>{
    
    try{

   await mongoose.connect("mongodb+srv://nandhanababu508:deepa2002@cluster0.xudtabr.mongodb.net/db2")
   
  console.log("mongoose connected");
      }
     catch(error){
        console.log("error in db",error);

     }
    }
module.exports=connetDB;