// creat vender model schema
const mongoose=require('mongoose');
const VenderPolicySchema = new mongoose.Schema({
vendorId:{
	type:mongoose.Schema.Types.ObjectId,
	ref:"vender"
},
policy_name:{
	type:String,
	required:false,
},
category_type:{
	type:String,
	required:false,
},
ammount:{
	type:String,
	required:false,
},
idu_ammount:{
	type:String,
	required:false,
},
policy_duration:{
	type:String,
	required:false,
},
policy_logo:{
	type:String,
	required:false,
},
description:{
	type:String,
	required:false,
},
policy_status:{
	type:String,
	required:false,
	default:0
},
createdBy:{
	type:String,
	required:false,
},
updatedBy:{
	type:String,
	required:false,
},

},{timestamps:true});
module.exports = VenderPolicyModel= mongoose.model("vender_policy",VenderPolicySchema);