const validator=require("validator"),
mongoose=require("mongoose");

//creating  User Schema
const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        trim:true
    }
    ,

    userEmail:{
        type:String,
        required:true,
        unique:true,
        trim:true,

        validate(value)
        {
            if(!validator.isEmail(value)) throw new Error("Invalid emails")
        }
        
    },
    userPassword:{
        type:String,
        required:true,
        trim:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
    ,
    postLiked:[{
      
          type:String
      }
    ]

   
})

//exporting the module
module.exports =mongoose.model("Users",userSchema)
