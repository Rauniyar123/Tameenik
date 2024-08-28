const mongoose = require('mongoose')
const mongooseSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: false
    },
    email: { 
        type: String,
        required: true
    }, 
    password: {
        type: String,
        required: true
    },
    role_type: {
        type: String,
        required: true
    },
    mobile_no: {
        type: String,
        required: false
    },
    employee_no: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    id_proof_no: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    admin_status:{
        type:String,
        required:true,
        default:0
    },
    createdBy:{
        type:String,
        required:false,
    },
    updatedBy: {
        type:String,
        required:false,
    },
}, { timestamps: true })
const adminModel = mongoose.model('admin', mongooseSchema)
module.exports = adminModel