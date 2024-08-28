//important dependancies
const mongoose =require("mongoose");
const travelInformationSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    planId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"vender_policy"
    },
    policy_start_date:{
        type:String
    },
    policy_exp_date:{
        type:String
    },
    duration:{
        type:Number
    },
    policy_fee:{
        type:Number
    },
    submission_fee:{
        type:Number
    },
    policyPremium_total:{
        type:Number
    },
    
    end_date:{
        type:String
    },

    start_date:{
        type:String
    },
    insuranceType:{
        type:String
    },
   
    end_date:{
        type:String
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
    },
    status:{
        type:String,
        default:"Selected"
    },
    passengerType:{
        type:String
    },
    policy_number:{
        type:Number,
        
    },
    dependent:[{
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
        },
        status:{
            type:Number
        },
        
    }],

    

},{timestamps:true});
module.exports=mongoose.model("travelInformation",travelInformationSchema);