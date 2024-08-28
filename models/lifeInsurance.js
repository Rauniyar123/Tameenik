const mongoose =require("mongoose");
const lifeInsuranceSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    insuranceType:{
        type:String
    },
    subType:{
        type:String
    },
    firstName:{
        type:String
    },
    middleName:{
        type:String
    },
    lastName:{
        type:String
    },
    mobile:{
        type:String
    },
    email:{
        type:String
    },
    occupation:{
        type:String
    },
    pulicy_number:{
        type:Number
    },
    images:Array,
    gender:String,
    dob:String,
    sociel_securityId:String,
    address:String,
    city:String,
    area:String,
    work_address:String,
    
    status:{
        type:String,
        default:"Selected"
    },
    planId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"vender_policy"
    },
    policy_start_date:{
        type:String
    },
    policy_number:{
        type:Number
    },

    policy_duration: String,
    policy_ex_date: String,
    policy_fee: String,
    policy_submission_fee: String,
    policy_premium_total: String,
   

},{timestamps:true});
module.exports=mongoose.model("lifeInsurance",lifeInsuranceSchema);