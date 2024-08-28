// import dependacies
const mongoose=require('mongoose');
const rewardSchema=new mongoose.Schema({
    
    name: { type: String},
    points: { type: Number},
    description: { type: String },
    status:{type:Number,default:0},
    act_status:{type:Number,default:0},
    expire_date:{type:String,},
    image:{type:String},

},{timestamps:true});
module.exports=rewardModel=mongoose.model("reward",rewardSchema);