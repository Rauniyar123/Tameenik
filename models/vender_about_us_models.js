// creat vender model schema
const mongoose=require('mongoose');
const VenderAboutUsSchema = new mongoose.Schema({
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
module.exports = VenderAboutUsModel= mongoose.model("vender_about_us",VenderAboutUsSchema);