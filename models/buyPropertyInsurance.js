const mongoose=require("mongoose");

const  buypropertyInsuranceSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    planId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"vender_policy"
    },
    insuranceType:{
        type:String
    },
    ownershipStatus:{
        type:String
    },
    buldingValue:{
        type:String
    },
    contentValue:{
        type:String
    },
    mortgage:{
        type:String
    },
    specificBank:{
        type:String
    },
    policy_start_date:{
        type:String
    },

    policy_duration: String,
    policy_ex_date: String,
    policy_fee: String,
    policy_submission_fee: String,
    policy_premium_total: String,
    homeType: String,
    no_of_floor: Number,
    no_of_occupants: Number,
    building_age: Number,
    no_of_bedroom: Number,
    policy_number: Number,
    
    governorate: String,
    area: String,
    street: String,
    jadda_building: String,
    paci_no: String,
    po_box_no: String,
    building_no: String,
    buildingName: String,
    qery: String,
    
    addcontent_value:[{
        descriptionOfItem:{
            type:String,
        },
        value:{
            type:String,
        },
    }],
    status:{
        type:String,
        default:"Selected"
    },

    

},{timestamps:true});

module.exports=mongoose.model("buypropertyInsurance",buypropertyInsuranceSchema);