// creat vender model schema
const mongoose=require('mongoose');
const faqySchema = new mongoose.Schema({
title:{
	type:String,
	required:true,
},
description:{
	type:String,
	required:true,
},

},{timestamps:true});
module.exports = PrivacyPolicyModel= mongoose.model("faq",faqySchema);