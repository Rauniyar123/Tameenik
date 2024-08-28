// creat vender model schema
const mongoose=require('mongoose');
const PrivacyPolicySchema = new mongoose.Schema({
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
module.exports = PrivacyPolicyModel= mongoose.model("privacy_policy",PrivacyPolicySchema);