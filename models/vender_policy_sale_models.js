// creat vender model schema
const mongoose=require('mongoose');
const VenderPolicySaleSchema = new mongoose.Schema({
userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
},
policyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'vender_policy',
    required: true
},    	
policy_name:{
	type:String,
	required:false,
},
policy_type:{
	type:String,
	required:false,
},
ammount:{
	type:String,
	required:false,
},
start_date:{
	type:String,
	required:false,
},
policy_duration:{
	type:String,
	required:false,
},
nominee_name:{
	type:String,
	required:false,
},
description:{
	type:String,
	required:false,
},
policy_sale_status:{
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
module.exports = VenderPolicySaleModel= mongoose.model("vender_policy_sale",VenderPolicySaleSchema);