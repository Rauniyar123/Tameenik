//important dependancies
const mongoose =require("mongoose");
const tameenikSchema=new mongoose.Schema({

    image:{
        type:String
    },
    headline:{
        type:String
    },
    date:{
        type:String
    },
    description:{
        type:String
        
    },
    
    status:{
        type:String
    }


},{timestamps:true});
module.exports=mongoose.model("tameenikNews",tameenikSchema);