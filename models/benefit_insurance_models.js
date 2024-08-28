// creat vender model schema
const mongoose=require('mongoose');
const benefitsOfSchema = new mongoose.Schema({
title:{
	type:String,
	required:true,
},
text:{
	type:String,
	required:true,
},
insuranceType:{
	type:String,
	required:false,
},
insuranceSubType:{
	type:String,
	required:false,
},
benefit_insurance_status:{
	type:String,
	required:true,
	default:0,
},

},{timestamps:true});
module.exports =  mongoose.model("benefit_insurance",benefitsOfSchema);