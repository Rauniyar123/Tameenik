//important dependancies
const mongoose =require("mongoose");
const contactSchema=new mongoose.Schema({
    clientName:{
        type:String
    },
    email:{
        type:String
    },
    mobile_no:{
        type:String
    },
    whatsapp:{
        type:String
        
    },
    

},{timestamps:true});
module.exports=mongoose.model("contactUs",contactSchema);