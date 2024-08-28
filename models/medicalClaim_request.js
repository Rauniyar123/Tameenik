const mongoose =require('mongoose');
const medicalSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    insuranceId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"buymedicalInsurance"
    },
    treatment_expenses_details:{
    illnessType:{
            type:String
        },
        date:{
        type:String
    },
    time:{
        type:String
    },
    hospitalization_expenses:{
        type:Number
    },
    
    ambulance_charge:{
        type:Number
    },
    pre_hospitalization_expenses:{
        type:Number
    },
    post_hospitalization_expenses:{
        type:Number
    },
    critical_illness_benefit:{
        type:Number
    },
    lump_sum_benefit:{
        type:Number
    },
    health_checkup_expense:{
        type:Number
    },
    
    
},
   

  billing_details:[ { 
    bill_no:{
        type:String
    },
    billing_date:{
        type:String
    },
    amount:{
        type:Number
    },
    issued_by:{
        type:String
    },
   
},
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


    hospital_details:{
        hospital_name: String,
        hospital_registration_no: String,
        bedType: String,
        type_of_hospital: String,
        treating_doctor_name: String,
        treating_doctor_qualification: String,

    },
    receipt_image:{
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
 module.exports = mongoose.model("medical_claim_request",medicalSchema);