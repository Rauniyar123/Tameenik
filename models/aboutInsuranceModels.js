// creat admin model schema
const mongoose=require('mongoose');
const aboutInsuranceSchema = new mongoose.Schema({
title:{
	type:String,
	required:true,
},
text:{
	type:String,
	required:true,
}, 
icon:{
    type:String,
    required:false,
},
insuranceType:{
	type:String,
	required:false,
},
insuranceSubType:{
	type:String,
	required:false,
},
about_insurance_status:{
	type:String,
	required:true,
	default:0,
},

},{timestamps:true});
module.exports =  mongoose.model("about_insurance",aboutInsuranceSchema);