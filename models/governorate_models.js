const mongoose=require('mongoose');
const GovernorateSchema = new mongoose.Schema({
governorate:{
	type:String,
	required:true,
},
governorate_status:{
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
module.exports = GovernorateModel= mongoose.model("governorate",GovernorateSchema);