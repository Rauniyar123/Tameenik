// creat vender model schema
const mongoose=require('mongoose');
const VenderBannerSchema = new mongoose.Schema({
title:{
	type:String,
	required:true,
},
banner_image:{
	type:String,
	required:false,
},
description:{
	type:String,
	required:false,
},
banner_status:{
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
module.exports = VenderBannerModel= mongoose.model("vender_banner",VenderBannerSchema);