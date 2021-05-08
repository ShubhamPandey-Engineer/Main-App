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
        default:0
        
    },
    likedBy:{
        id:{
        type:String,
        required:false
    }
}
    ,
    createdAt:{
        type:Date,
        default:Date.now
    },
    createdBy:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("Myblogs",blogSchema)