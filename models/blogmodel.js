var mongoose=require("mongoose");
const blogSchema=new mongoose.Schema({
    title:{
        required:true,
        type:String
    },
    category:{
        type:String 
    },
    content:{
        required:true,
        type:String
    },
    likes:{
        type:Number,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("Myblogs",blogSchema)