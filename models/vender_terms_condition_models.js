// creat vender model schema
const mongoose=require('mongoose');
const VenderTermsConditionSchema = new mongoose.Schema({
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
module.exports = VenderTermsAndConditionModel= mongoose.model("vender_terms_condition",VenderTermsConditionSchema);