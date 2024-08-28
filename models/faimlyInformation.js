//important dependancies
const mongoose =require("mongoose");
const faimlyInformationSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    
    firstName:{
        type:String
    },
    secondName:{
        type:String
    },
    lastName:{
        type:String
    },
    civilId:{
        type:String
        
    },
    dob:{
        type:String
    },
    passportFullName:{
        type:String
    },
    passport_no:{
        type:String
    },
    passport_ex_date:{
        type:String
    }

    

},{timestamps:true});
module.exports=mongoose.model("faimlyInformation",faimlyInformationSchema);