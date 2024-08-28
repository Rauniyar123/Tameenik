const mongoose=require("mongoose");

const  buymedicalInsuranceSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    medicalInsuranceType:{
        type:String
    },
    insuranceType:{
        type:String
    },
    civilId:{
        type:String
    },
    gender:{
        type:String
    },
    dependent:[{
        civilId:{
            type:String
        },
        relationship:{
            type:String
        },
        gender:{
            type:String
        },
    }],

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

   
    firstName:String,
    secondName:String,
    lastName:String,
    firstName_arebi:String,
    secondName_arebi:String,
    lastName_arebi:String,
    dob:String,
    civilId1:String,
    passportFullName:String,
    passport_no:String,
    passport_ex_date:String,
    status:{
        type:String,
        default:"Selected"
    },



},{timestamps:true});

module.exports=mongoose.model("buymedicalInsurance",buymedicalInsuranceSchema);