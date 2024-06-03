const express=require("express")
const authroutes=require("../src/routes/authroute")
const userRoutes=require("../src/routes/userRoutes")
const productRoutes=require("./routes/CustomerProductRoutes");
const AdminProductRoutes=require("./routes/adminProductRoutes")
const cartRoutes=require('./routes/CartrutesRoutes')
const CartitemRoutes=require('./routes/CartItemroute');
const orderRoutes=require('./routes/orderROutes')
const reviewRoutes=require('./routes/reviewRoutes');
const ratingRoutes=require('./routes/ratingRoutes')
const AdminOrderRoutes=require('./routes/adminOrderRoutes');






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
app.use("/api/products",productRoutes);
app.use('/api/admin/products',AdminProductRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/crt_items',CartitemRoutes);
app.use('/api/orders',orderRoutes);
app.use("/api/review",reviewRoutes);
app.use("/api/ratings",ratingRoutes);
app.use('/api/admin',AdminOrderRoutes);




module.exports=app