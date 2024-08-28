//import dependancies
const mongoose=require("mongoose");
const addressSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"

    },
    governorate:{
        type:String
    },
    area:{
        type:String
    },
    jada_building:{
        type:String
    },
    street:{
        type:String
    },
    paci_no:{
        type:String
    },
    po_box_no:{
        type:String
    },
    building_no:{
        type:String
    },
    adress:{
        type:String,
        default:0
    },
    address_status:{
        type:String,
        default:0
    },
   


},{timestamps:true});
module.exports=addressModel=mongoose.model("address",addressSchema);