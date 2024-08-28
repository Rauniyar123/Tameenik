const mongoose =require('mongoose');
const travel_claimSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    insuranceId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"travelInformation"
    },
    details_of_policy_holder:{
        date:{
        type:String
    },
    time:{
        type:String
    },
    name:String,
    dob:String,
    civilId:String,
    passportFull_name:String,
    passportExpire_date:String,
    
    
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
   
cause_of_incident:{
    type:String
},

medical_information:{
    medical_status:String,
    date:String,
    time:String,
    place:String,
    city:String,
    address:String,

},



    consulting_physician:{
        name:String,
        address: String,
        city: String,
        place:String,
        mobile: String,
        
    },
    
    before_treatment_details:[
        {
            name:String,
            address: String,
            city: String,
            place:String,
            mobile: String,
          
        }
    ],

    
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
 module.exports = mongoose.model("travel_claim_request",travel_claimSchema);