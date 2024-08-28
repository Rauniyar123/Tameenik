const mongoose =require('mongoose');
const property_claimSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    insuranceId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"buypropertyInsurance"
    },
    property_inforamtion:{
        date:{
        type:String
    },
    time:{
        type:String
    },
    
    reason_for_loss:{
        type:String
    },
    third_party_blame_or_loss:{
        type:String
    },
    
},
   
name:{
    type:String
},
report_details:{
    report_description:String,
    policy_station_name:String,
    policy_station_name:String,
    report_no:String,
    date:String,


   
},
action_for_recover_loss_details:{
    type:String
},

    witnessdetails:{
        name_of_persion:String,
        address: String,
        city: String,
        area: String,
        landmark: String,
        mobile: String,
        email: String,
    },
    
    damage_item_details:[
        {
            item_name: String,
            issued_by: String,
            age_of_item: Number,
            amount: Number,
            orginal_cost: Number,
            repair_and_replacement_value:Number,
            claimed_amount: Number,
           
          
        }
    ],

    bankDetails:{
        accName:{
        type:String
    },
    accNumber:{
        type:String
    },
    ifsc_code:{
        type:String
    },
    landmarks:{
        type:String
    },
    },
    images:Array,
    status:{
        type:String,
        default:"Selected"
    },
    claim_status:{
        type:String,
        default:"Selected"
    },
       

   

},{timestamps:true});
 module.exports = mongoose.model("property_claim_request",property_claimSchema);