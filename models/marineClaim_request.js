const mongoose =require('mongoose');
const marineSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    insuranceId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"marine_insurance"
    },
    accident_details:{
        date:{
        type:String
    },
    time:{
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
},
   

  availablePersion_on_spot: { 
    Name:{
        type:String
    },
    mobile:{
        type:String
    },
    relationWith_insured:{
        type:String
    },
    emailId:{
        type:String
    },
},
description:{
    type:String
},
estimatedLoss:{
    type:String
},
eventType:{
    type:String
},


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
    witnessdetails:{
        name_of_persion:String,
        address: String,
        city: String,
        area: String,
        landmark: String,
        mobile: String,
        email: String,
    },
    
    authority_details:{
        authority_type: String,
        authority_name: String,
        address:String,
        city: String,
        area: String,
        landmark: String,
        mobile: String,
        email: String,
        date: String,
    },
    affected_item_details:[
        {
            damagedType: String,
            name_of_packages: String,
            package_quantity: String,
          
        }
    ],

    voyage_details:{
        from_date:String,
        to_date:String,
    },
    destination:[
        {
            destination_name: String,
            arrival_date: String,
            clearence_date: String,
            delay_reason:String
          
        }
    ],
    
    custom_duty:{
        custom_examination_date:String,
        custom_clearance_date:String,
        amount_of_duties_paid:String,
        amount_of_duties_basic_duty_and_cvd:String,
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
 module.exports = mongoose.model("marine_claim_request",marineSchema);