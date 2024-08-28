// creat vender model schema
const mongoose=require('mongoose');
const PolicyCategorySchema = new mongoose.Schema({ 
category_name:{
	type:String,
	required:true,
},
category_image:{
	type:String,
	required:false,
},
description:{
	type:String,
	required:false,
},
category_status:{
    type:String,
    required:true,
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
module.exports = PolicyCategoryModel= mongoose.model("policy_category",PolicyCategorySchema);