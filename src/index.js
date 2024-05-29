const express=require("express")
const authroutes=require("../src/routes/authroute")
const userRoutes=require("../src/routes/userRoutes")
const cookieParser=require("cookie-parser")
const cors=require('cors');
const app=express();

app.use(express.json());
app.use (cookieParser());
app.use(cors());

app.get("/",(req,res)=>{
    return res.status(200).send({message:"welcome Api"})
})
app.use("/auth",authroutes)
app.use("/api/user",userRoutes)

module.exports=app