const mongoose =require('mongoose');
const lifeInsurance_claimSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    insuranceId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"motor_insurance"
    },
    details_of_life_assured:{
        date:{
        type:String
    },
    time:{
        type:String
    },
    name:String,
    father_name:String,
    dob:String,
    place_of_death:String,
    city:String,
    area:String,
    landmark:String,
    faimly_doctor_name:String,
    registration_no:String,
    landmark:String,
    contact_no:Number,
    
    
},
employer_details:{ 
name_of_the_company:String,
name_of_contact_person:String,
contact_no:Number,
nature_of_death:String,

},
nature_of_illness_and_habits:{ 
    type:Array,
    
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
   



details_of_claimant_name:{
    claimant_name:String,
    dob:String,
    address:String,
    pincode:String,
    contact_no:String,
    emaiol:String,
    relationship:String,
    claimants_title:String,

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
 module.exports = mongoose.model("lifeInsurance_claim_request",lifeInsurance_claimSchema);