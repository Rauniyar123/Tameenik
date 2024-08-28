// creat vender model schema
const mongoose=require('mongoose');
const AboutUsSchema = new mongoose.Schema({
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
module.exports = AboutUsModel= mongoose.model("about_us",AboutUsSchema);