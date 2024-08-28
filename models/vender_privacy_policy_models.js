// creat vender model schema
const mongoose=require('mongoose');
const VenderPrivacyPolicySchema = new mongoose.Schema({
title:{
	type:String,
	required:true,
},
description:{
	type:String,
	required:true,
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
module.exports = VenderPrivacyPolicyModel= mongoose.model("vender_privacy_policy",VenderPrivacyPolicySchema);