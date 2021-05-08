var mongoose=require("mongoose");

let connectDB=(()=>{
const url="mongodb+srv://root:root@cluster0.qcptk.mongodb.net/Demo?retryWrites=true&w=majority"

let connect=mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true})
.then(res=>{
    console.log("connected to mongoDB")
})
.catch(err=>{
console.log("DB not connected")
})
})

module.exports=connectDB