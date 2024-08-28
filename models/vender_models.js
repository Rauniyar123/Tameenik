const mongoose = require('mongoose')
const mongooseSchema = new mongoose.Schema({
    // roleId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'role',
    //     required: true
    // },
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
    category_type: {
        type: Array,
        required: false
    },
    mobile_no: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    id_proof_no: {
        type: String,
        required: true
    }, 
    company_logo: {
        type: String,
        required:false
    },
    description: {
        type: String,
        required: false
    },
    vendor_status:{
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
const venderModel = mongoose.model('vender', mongooseSchema)
module.exports = venderModel