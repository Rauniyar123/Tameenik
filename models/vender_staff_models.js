// creat vender model schema
const mongoose=require('mongoose');
const VenderStaffSchema = new mongoose.Schema({
name:{
	type:String,
	required:true,
},
email:{
	type:String,
	required:false,
},
password:{
	type:String,
	required:false,
},
staff_image:{
	type:String,
	required:false,
},
designation:{
	type:String,
	required:false,
},
description:{
	type:String,
	required:false,
},
staff_status:{
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
module.exports = VenderStaffModel= mongoose.model("vender_staff",VenderStaffSchema);