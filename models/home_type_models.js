const mongoose=require('mongoose');
const HomeTypeSchema = new mongoose.Schema({
home_type:{
	type:String,
	required:true,
},
home_type_status:{
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
module.exports = HomeTypeModel= mongoose.model("home_type",HomeTypeSchema);