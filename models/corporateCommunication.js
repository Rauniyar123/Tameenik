//important dependancies
const mongoose =require("mongoose");
const communicationSchema=new mongoose.Schema({
    userId:{
     type:mongoose.Schema.Types.ObjectId
    },
    purpose:{
        type:String
    },
    email:{
        type:String
    },
    mobile_no:{
        type:String
    },
    message:{
        type:String
        
    },
    

},{timestamps:true});
module.exports=mongoose.model("corporateCommunication",communicationSchema);