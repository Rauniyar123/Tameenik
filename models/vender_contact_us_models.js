// creat vender model schema
const mongoose=require('mongoose');
const VenderContactUsSchema = new mongoose.Schema({
name:{
	type:String,
	required:true,
},
phone_no:{
	type:String,
	required:true,
},
whatsapp_no:{
	type:String,
	required:true,
},
email:{
	type:String,
	required:true,
},
contact_us_status:{
	type:String,
	required:false,
	default:0,
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
module.exports = VenderContactUsModel= mongoose.model("vender_contact_us",VenderContactUsSchema);