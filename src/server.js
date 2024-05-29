const app = require(".");
const connectDB=require('../src/Config/Db')
const Port=5400;

app.listen(Port, async()=>{
    await connectDB();
    console.log("First checking",Port)
})