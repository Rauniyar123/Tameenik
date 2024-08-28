const mongoose =require('mongoose');
const motorSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    insuranceType:{
        type:String
    },
    insurance_subType:{
        type:String
    },
    plate_no:{
        type:String
    },
    chassis_no:{
        type:String
    },
    type:{
        type:String
    },
    shape:{
        type:String
    },
    seating_capacity:{
        type:String
    },
    model_year:{
        type:String
    },
   
    policy_period:{
        type:String
    },
    usage:{
        type:String
    },
    manufacturer:{
        type:String
    },
    model:{
        type:String
    },
    policy_start_date:{
        type:String
    },
    policy_exp_date:{
        type:String
    },
    fuelType:{
        type:String
    },
    primary_color:{
        type:String
    },
    secondary_color:{
        type:String
    },

    start_date:{
        type:String
    },
    policy_end_date:{
        type:String
    },
    
    planId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"vender_policy"
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

    policy_number:{
        type:Number
    },
    status:{
        type:String,
        default:"Selected"
    },

},{timestamps:true});
 module.exports = mongoose.model("motor_insurance",motorSchema);