const mongoose= require("mongoose");

const PremiumSchema=new mongoose.Schema({
	premium_type:{
        type:String
	},
    sub_premium_type:{
        type:String,
        required: false,
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
    premium_status:{
	    type:String,
	    required:true,
	    default:0,
    },

},{timestamps:true});
module.exports=PremiumModel=mongoose.model("premium",PremiumSchema);