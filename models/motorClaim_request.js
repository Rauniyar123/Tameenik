const mongoose =require('mongoose');
const motorSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    insuranceId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"motor_insurance"
    },
    date:{
        type:String
    },
    time:{
        type:String
    },
    eventType:{
        type:String
    },
    address:{
        type:String
    },
    city:{
        type:String
    },
    area:{
        type:String
    },
    landmark:{
        type:String
    },
    description:{
        type:String
    },
   
    accName:{
        type:String
    },
    accNumber:{
        type:String
    },
    ifsc_code:{
        type:String
    },
    images:{
        type:Array
    },
    status:{
        type:String,
        default:"Selected"
    },
    claim_status:{
        type:String,
        default:"Selected"
    },
       
    

},{timestamps:true});
 module.exports = mongoose.model("motor_claim_request",motorSchema);