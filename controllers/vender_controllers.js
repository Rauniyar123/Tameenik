//vender controllers 
const venderModel = require("../models/vender_models"); 
const venderBannerModel = require("../models/vender_banner_models");
const userModel = require('../models/user_models');
const venderStaffModel = require('../models/vender_staff_models');
const venderPolicyModel = require('../models/vender_policy_models');
const venderPolicySaleModel = require('../models/vender_policy_sale_models');
const venderPrivacyPolicyModel = require('../models/vender_privacy_policy_models');
const venderTermsConditionModel = require('../models/vender_terms_condition_models');
const venderAboutUsModel = require('../models/vender_about_us_models');
const venderContactUsModel = require('../models/vender_contact_us_models');
const travelInformationModel=require("../models/travelInformation");
const lifeInsurance=require("../models/lifeInsurance");
const buyProperty=require("../models/buyPropertyInsurance");
const buyMedicalInsurance=require("../models/buyMedicalInsurance");
const marineInsuranceModel=require("../models/marineInsurance_models");
const motorInsuranceModel=require("../models/motorInsurance_models");
const motorClaimRequestModel=require("../models/motorClaim_request");
const marineClaimRequestModel=require("../models/marineClaim_request");
const medicalClaimRequestModel=require("../models/medicalClaim_request");
const propertyClaimRequestModel=require("../models/propertyClaim_request");
const travelClaimRequestModel=require("../models/travelClaim_request");
const lifeInsuranceClaimRequestModel=require("../models/lifeInsuranceClaim_request");



const login = async (req, res) => {   
    try {
        res.render('vender_login.ejs',{msg:''})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}
 
const venderLogin=async(req,res)=>{
    try {
        const {email,password}=req.body
        const data= await venderModel.findOne({email:email,password:password})
        if(data){
            req.session.user_id = data._id;
            req.session.email = data.email;
            req.session.updatedAt = data.updatedAt;
            req.session.role_type = data.category_type;
            req.session.user_name = data.user_name;

            res.redirect('/vender/index')
            await venderModel.findByIdAndUpdate({ _id: data._id }, { $set: { 'updatedAt':req.session.updatedAt } }, { new: true })
        }else{
            res.render('vender_login.ejs',{msg:'Invalid Email or Password'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({result:"false",msg:"Internel Server Error"})
    }
}


const index = async (req, res) => {  
    try {

        const totalVendor = await venderPolicyModel.countDocuments();
        const totalUser = await userModel.countDocuments();
        const totalSalePolicy = await venderPolicySaleModel.countDocuments();

        const email=req.session.email;
        const updatedAt=req.session.updatedAt;
        const role_type = req.session.role_type;
        console.log(role_type)
        const module_name = req.session.module_name;
        const sub_module_data = req.session.sub_module_data;
        const user_name = req.session.user_name; 
        res.render('vender_index.ejs',{totalVendor,totalUser,totalSalePolicy,email,updatedAt,role_type,module_name,sub_module_data,user_name})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
} 

const logout=async(req,res) => {
    try {
        req.session.destroy();
        res.render('vender_login.ejs',{msg:''});
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
};

const venderBannerList = async (req, res) => {
    try {
        const data = await venderBannerModel.find({});
        res.render('vender_banner_list.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,sub_module_data:req.session.sub_module_data,user_name:req.session.user_name })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const createVenderBanner = async (req, res) => {
    try {
        res.render('create_vender_banner.ejs', { email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,sub_module_data:req.session.sub_module_data,user_name:req.session.user_name })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const addVenderBanner = async (req, res) => {
    try {
        const { title,description } = req.body;

        const bannerData = new venderBannerModel({
            title,
            description,
            banner_image:req.file.filename,
            createdBy : req.session.email
        });

        const data = await bannerData.save();
        res.status(200).redirect('/vender/vender_banner_list');
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: "false", msg: "Internal Server Error" });
    }
};

const editVenderBanner = async (req, res) => {
    try {
        const Id = req.params.id
        const data = await venderBannerModel.findById({ _id: Id });
         res.render('edit_vender_banner.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,user_name:req.session.user_name,msg:''})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const updateVenderBanner = async (req, res) => {
    try {
        const { title,description } = req.body
        const Id = req.params.id
        if (req.file) {
            const categoryData = await venderBannerModel.findByIdAndUpdate({ _id: Id }, { $set: { name, description, banner_image: req.file.filename,updatedBy : req.session.email } }, { new: true })
        } else {
            const categoryData = await venderBannerModel.findByIdAndUpdate({ _id: Id }, { name: name,description:description,updatedBy : req.session.email }, { new: true })
        }

        res.status(200).redirect('/vender/vender_banner_list')

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const venderBannerStatus=async(req,res)=>{
    try{
        const Id=req.params.id;
        const data=await venderBannerModel.findById({_id:Id});
        if(data.banner_status=='0'){
            const update_data=await venderBannerModel.findByIdAndUpdate({"_id":Id},{banner_status:'1',updatedBy : req.session.email},{new:true});
            res.status(200).redirect("/vender/vender_banner_list");
        }else{
            const update_data=await venderBannerModel.findByIdAndUpdate({"_id":Id},{banner_status:'0',updatedBy : req.session.email},{new:true});
            res.status(200).redirect("/vender/vender_banner_list");
        }
    }catch(err){
        console.log(err.message);
        res.status(400).json({"result":"false","message":err.message});
    }
};

const deleteVenderBanner = async (req, res) => {
    try {
        const Id = req.params.id
        const bannerData = await venderBannerModel.findByIdAndDelete({ _id: Id })
        res.status(200).redirect('/vender/vender_banner_list')
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const userList = async (req, res) => {
    try {
        const data = await userModel.find({})
        res.render('user_list.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,user_name:req.session.user_name })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const userStatus=async(req,res)=>{
    try{
        const Id=req.params.id;
        const data=await userModel.findById({_id:Id});
        if(data.user_status=='0'){
            const update_data=await userModel.findByIdAndUpdate({"_id":Id},{user_status:'1',updatedBy : req.session.email},{new:true});
            res.status(200).redirect("/vender/user_list");
        }else{
            const update_data=await userModel.findByIdAndUpdate({"_id":Id},{user_status:'0',updatedBy : req.session.email},{new:true});
            res.status(200).redirect("/vender/user_list");
        }
    }catch(err){
        console.log(err.message);
        res.status(400).json({"result":"false","message":err.message});
    }
};

const userViewDetails = async (req, res) => {
    try {
        const Id = req.params.id
        const data = await userModel.findById({ _id: Id });
         res.render('vender_user_view_details.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,user_name:req.session.user_name,msg:''})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const deleteUser = async (req, res) => {
    try {
        const Id = req.params.id
        const policyData = await userModel.findByIdAndDelete({ _id: Id })
        res.status(200).redirect('/vender/user_list')
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const venderStaffList = async (req, res) => {
    try {
        const data = await venderStaffModel.find({});
        res.render('vender_staff_list.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,sub_module_data:req.session.sub_module_data,user_name:req.session.user_name })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const createVenderStaff = async (req, res) => {
    try {
        res.render('create_vender_staff.ejs', { email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,sub_module_data:req.session.sub_module_data,user_name:req.session.user_name,msg:'' })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const addVenderStaff = async (req, res) => {
    try {
        const { name,email,password,designation,description } = req.body;
        const venderData = await venderStaffModel.findOne({email:email});
        if(venderData){
            res.render('create_vender_staff.ejs', {email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,user_name:req.session.user_name,msg:'email already exist,please enter new email..' });
        }
        const staffData = new venderStaffModel({
            name,
            email,
            password,
            designation,
            description,
            staff_image:req.file.filename,
            createdBy : req.session.email
        });

        const data = await staffData.save();
        res.status(200).redirect('/vender/vender_staff_list');
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: "false", msg: "Internal Server Error" });
    }
};

const editVenderStaff = async (req, res) => {
    try {
        const Id = req.params.id
        const data = await venderStaffModel.findById({ _id: Id });
         res.render('edit_vender_staff.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,user_name:req.session.user_name,msg:''})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}


const updateVenderStaff = async (req, res) => {
    try {
        const { name,password,designation,description } = req.body
        const Id = req.params.id
        if (req.file) {
            const categoryData = await venderStaffModel.findByIdAndUpdate({ _id: Id }, { $set: { name,password, designation, description, staff_image: req.file.filename,updatedBy : req.session.email } }, { new: true })
        } else {
            const categoryData = await venderStaffModel.findByIdAndUpdate({ _id: Id }, { name,password,designation,description,updatedBy : req.session.email }, { new: true })
        }

        res.status(200).redirect('/vender/vender_staff_list')

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const venderStaffStatus=async(req,res)=>{
    try{
        const Id=req.params.id;
        const data=await venderStaffModel.findById({_id:Id});
        if(data.staff_status=='0'){
            const update_data=await venderStaffModel.findByIdAndUpdate({"_id":Id},{staff_status:'1',updatedBy : req.session.email},{new:true});
            res.status(200).redirect("/vender/vender_staff_list");
        }else{
            const update_data=await venderStaffModel.findByIdAndUpdate({"_id":Id},{staff_status:'0',updatedBy : req.session.email},{new:true});
            res.status(200).redirect("/vender/vender_staff_list");
        }
    }catch(err){
        console.log(err.message);
        res.status(400).json({"result":"false","message":err.message});
    }
};

const deleteVenderStaff = async (req, res) => {
    try {
        const Id = req.params.id
        const staffData = await venderStaffModel.findByIdAndDelete({ _id: Id })
        res.status(200).redirect('/vender/vender_staff_list')
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const venderPolicyList = async (req, res) => {
    try {
        const data = await venderPolicyModel.find({});
        res.render('vender_policy_list.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,sub_module_data:req.session.sub_module_data,user_name:req.session.user_name })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}


const createVenderPolicy = async (req, res) => {
    try {
        console.log(req.session.role_type)
        res.render('create_vender_policy.ejs', {vendorId:req.session._id, email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,sub_module_data:req.session.sub_module_data,user_name:req.session.user_name })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const addVenderPolicy = async (req, res) => {
    try {
        const { policy_name,category_type,ammount,idu_ammount,policy_duration,description } = req.body;

        const policyData = new venderPolicyModel({
            vendorId:req.session._id,
            policy_name,
            category_type,
            ammount,
            idu_ammount,
            policy_duration,
            policy_logo:req.file.filename,
            description,
            createdBy : req.session.email
        });

        const data = await policyData.save();
        res.status(200).redirect('/vender/vender_policy_list');
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: "false", msg: "Internal Server Error" });
    }
};

const editVenderPolicy = async (req, res) => {
    try {
        const Id = req.params.id
        const data = await venderPolicyModel.findById({ _id: Id });
         res.render('edit_vender_policy.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,user_name:req.session.user_name,msg:''})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const updateVenderPolicy = async (req, res) => {
    try {
        const { policy_name,category_type,ammount,idu_ammount,policy_duration,designation,description } = req.body
        const Id = req.params.id
        if(req.file){
           const policyData = await venderPolicyModel.findByIdAndUpdate({ _id: Id }, { $set: { policy_name,category_type,ammount,idu_ammount,policy_duration,designation,description,policy_logo:req.file.policy_logo,updatedBy : req.session.email } }, { new: true });
        }else{
            const policyData = await venderPolicyModel.findByIdAndUpdate({ _id: Id }, { $set: { policy_name,category_type,ammount,idu_ammount,policy_duration,designation,description,updatedBy : req.session.email } }, { new: true });
        }
        res.status(200).redirect('/vender/vender_policy_list')
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const venderPolicyStatus=async(req,res)=>{
    try{
        const Id=req.params.id;
        const data=await venderPolicyModel.findById({_id:Id});
        if(data.policy_status=='0'){
            const update_data=await venderPolicyModel.findByIdAndUpdate({"_id":Id},{policy_status:'1',updatedBy : req.session.email},{new:true});
            res.status(200).redirect("/vender/vender_policy_list");
        }else{
            const update_data=await venderPolicyModel.findByIdAndUpdate({"_id":Id},{policy_status:'0',updatedBy : req.session.email},{new:true});
            res.status(200).redirect("/vender/vender_policy_list");
        }
    }catch(err){
        console.log(err.message);
        res.status(400).json({"result":"false","message":err.message});
    }
};

const deleteVenderPolicy = async (req, res) => {
    try {
        const Id = req.params.id
        const policyData = await venderPolicyModel.findByIdAndDelete({ _id: Id })
        res.status(200).redirect('/vender/vender_policy_list')
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const venderPolicySaleList = async (req, res) => {
    try {
        const data = await venderPolicySaleModel.find({});
        res.render('vender_policy_sale_list.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,sub_module_data:req.session.sub_module_data,user_name:req.session.user_name })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const venderTrasationList = async (req, res) => {
    try {
        const data = await venderPolicySaleModel.find({});
        res.render('vender_transation_list.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,sub_module_data:req.session.sub_module_data,user_name:req.session.user_name })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const venderPrivacyPolicy = async (req, res) => {
    try {
        const data = await venderPrivacyPolicyModel.find({});
        res.render('vender_privacy_policy.ejs',{data:data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,sub_module_data:req.session.sub_module_data,user_name:req.session.user_name})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const editVenderPrivacyPolicy = async (req, res) => {
    try {
        const policyId = req.params.id
        const data = await venderPrivacyPolicyModel.findById({ _id: policyId });
         res.render('edit_vender_privacy_policy.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,user_name:req.session.user_name})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const updateVenderPrivacyPolicy = async (req, res) => {
    try {
        const { title,description } = req.body
        const id = req.params.id

        let updateFields = {}
       

        if (title) {
            updateFields.title = title;
        }
        
        if (description) {
            updateFields.description = description;
        }

        const updatedPrivacyPolicy = await venderPrivacyPolicyModel.findByIdAndUpdate(
            { _id: id },
            { $set: updateFields,updatedBy : req.session.email },
            { new: true }
        );

        res.status(200).redirect('/vender/vender_privacy_policy')

    } catch (error) {
        console.log(error)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const venderTermsCondition = async (req, res) => {
    try {
        const data = await venderTermsConditionModel.find({});
        res.render('vender_terms_and_condition.ejs',{data:data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,sub_module_data:req.session.sub_module_data,user_name:req.session.user_name})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const editVenderTermsCondition = async (req, res) => {
    try {
        const policyId = req.params.id
        const data = await venderTermsConditionModel.findById({ _id: policyId });
         res.render('edit_vender_terms_and_condition.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,user_name:req.session.user_name})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const updateVenderTermsCondition = async (req, res) => {
    try {
        const { title,description } = req.body
        const id = req.params.id

        let updateFields = {}
       

        if (title) {
            updateFields.title = title;
        }
        
        if (description) {
            updateFields.description = description;
        }

        const updatedPrivacyPolicy = await venderTermsConditionModel.findByIdAndUpdate(
            { _id: id },
            { $set: updateFields,updatedBy : req.session.email },
            { new: true }
        );

        res.status(200).redirect('/vender/vender_terms_condition')

    } catch (error) {
        console.log(error)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const venderAboutUs = async (req, res) => {
    try {
        const data = await venderAboutUsModel.find({});
        res.render('vender_about_us.ejs',{data:data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,sub_module_data:req.session.sub_module_data,user_name:req.session.user_name})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const editVenderAboutUs = async (req, res) => {
    try {
        const policyId = req.params.id
        const data = await venderAboutUsModel.findById({ _id: policyId });
         res.render('edit_vender_about_us.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,user_name:req.session.user_name})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const updateVenderAboutUs = async (req, res) => {
    try {
        const { title,description } = req.body
        const id = req.params.id

        let updateFields = {}
       

        if (title) {
            updateFields.title = title;
        }
        
        if (description) {
            updateFields.description = description;
        }

        const updatedPrivacyPolicy = await venderAboutUsModel.findByIdAndUpdate(
            { _id: id },
            { $set: updateFields,updatedBy : req.session.email },
            { new: true }
        );

        res.status(200).redirect('/vender/vender_about_us')

    } catch (error) {
        console.log(error)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const venderContactUs = async (req, res) => {
    try {
        const data = await venderContactUsModel.find({});
        res.render('vender_contact_us.ejs',{data:data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,sub_module_data:req.session.sub_module_data,user_name:req.session.user_name})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const editVenderContactUs = async (req, res) => {
    try {
        const Id = req.params.id
        const data = await venderContactUsModel.findById({ _id: Id });
        res.render('edit_vender_contact_us.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,user_name:req.session.user_name,msg:''})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const updateVenderContactUs = async (req, res) => {
    try {
        const { name,phone_no,whatsapp_no,email} = req.body
        const Id = req.params.id
        const data = await venderContactUsModel.findByIdAndUpdate({ _id: Id }, { name,phone_no,whatsapp_no,email, updatedBy : req.session.email }, { new: true });
        //res.status(200).redirect('/admin/product_order_list')
        res.render('edit_vender_contact_us.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,user_name:req.session.user_name,msg:'data updated successfully..'})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}


// sales primum  list

const motor_premium_sales_list= async (req, res) => {
    try {
        const datas = await motorInsuranceModel.find({}).populate('userId planId').sort({_id:-1});
        const data= await datas.map(item=>({
            _id:item._id,
            civilId:item.userId.civilId,
            firstName:item.userId.first_name,
            mobile:item.userId.mobile_no,
            image:item.userId.user_image,
            policy_number:item.policy_number,
            policy_name:item.planId.policy_name,
            duration:item.planId.policy_duration,
            amount:item.planId.ammount,
            createdAt:item.createdAt,
            status:item.status,

        }));
        
        res.render('vender_motor_premium_sale_list.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,sub_module_data:req.session.sub_module_data,user_name:req.session.user_name })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}



const motor_premium_sales_details= async (req, res) => {
    try {
        const id=req.params.id;
        const data = await motorInsuranceModel.findById({_id:id}).populate('userId planId');
        
        console.log(data)
        res.render('vender_motor_premium_sale_details.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,sub_module_data:req.session.sub_module_data,user_name:req.session.user_name })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg:error.message})
    }
}





const travel_premium_sales_list= async (req, res) => {
    try {
        const datas = await travelInformationModel.find({}).populate('userId planId').sort({_id:-1});
        const data= await datas.map(item=>({
            _id:item._id,
            civilId:item.userId.civilId,
            firstName:item.firstName,
            mobile:item.userId.mobile_no,
            image:item.userId.user_image,
            policy_number:item.policy_number,
            policy_name:item.planId.policy_name,
            duration:item.planId.policy_duration,
            amount:item.planId.ammount,
            createdAt:item.createdAt,
            status:item.status,


        }));
        res.render('vender_travel_premium_sale_list.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,sub_module_data:req.session.sub_module_data,user_name:req.session.user_name })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg:error.message})
    }
}


const travel_premium_sales_details= async (req, res) => {
    try {
        const id=req.params.id;
        const data = await travelInformationModel.findById({_id:id}).populate('userId planId');
        console.log(data)
        res.render('vender_travel_premium_sale_details.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,sub_module_data:req.session.sub_module_data,user_name:req.session.user_name })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg:error.message})
    }
}


const marine_premium_sales_list= async (req, res) => {
    try {
        const datas = await marineInsuranceModel.find({}).populate('userId planId').sort({_id:-1});
        const data= await datas.map(item=>({
            _id:item._id,
            civilId:item.userId.civilId,
            firstName:item.firstName,
            mobile:item.userId.mobile_no,
            image:item.userId.user_image,
            policy_number:item.policy_number,
            policy_name:item.planId.policy_name,
            duration:item.planId.policy_duration,
            amount:item.planId.ammount,
            createdAt:item.createdAt,
            status:item.status,

        }));
        res.render('vender_marine_premium_sale_list.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,sub_module_data:req.session.sub_module_data,user_name:req.session.user_name })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}



const medical_premium_sales_list= async (req, res) => {
    try {
        const datas = await buyMedicalInsurance.find({}).populate('userId planId').sort({_id:-1});
        const data= await datas.map(item=>({
            _id:item._id,
            civilId:item.userId.civilId,
            firstName:item.firstName,
            mobile:item.userId.mobile_no,
            image:item.userId.user_image,
            policy_number:item.policy_number,
            policy_name:item.planId.policy_name,
            duration:item.planId.policy_duration,
            amount:item.planId.ammount,
            createdAt:item.createdAt,
            status:item.status,

        }));
        res.render('vender_medical_premium_sale_list.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,sub_module_data:req.session.sub_module_data,user_name:req.session.user_name })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}



const property_premium_sales_list= async (req, res) => {
    try {
        const data = await buyProperty.find({}).populate('userId planId').sort({_id:-1});
        console.log(data)
        res.render('vender_property_premium_sale_list.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,sub_module_data:req.session.sub_module_data,user_name:req.session.user_name })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg:error.message })
    }
}



const life_premium_sales_list= async (req, res) => {
    try {
        const datas = await lifeInsurance.find({}).populate('userId planId').sort({_id: -1});
        const data= await datas.map(item=>({
            _id:item._id,
            civilId:item.userId.civilId,
            firstName:item.firstName,
            mobile:item.mobile,
            image:item.userId.user_image,
            policy_number:item.policy_number,
            policy_name:item.planId.policy_name,
            duration:item.planId.policy_duration,
            amount:item.planId.ammount,
            createdAt:item.createdAt,
            status:item.status,

        }));
        
        res.render('vender_life_premium_sale_list.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,sub_module_data:req.session.sub_module_data,user_name:req.session.user_name })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: error.message })
    }
}


const life_premium_sales_details= async (req, res) => {
    try {
        const id=req.params.id;
        const datas = await lifeInsurance.findById({_id:id}).populate('userId planId');
        const data=({
            _id:datas._id,
            civilId:datas.userId.civilId,
            userId:datas.userId._id,
            family_name:datas.userId.family_name,
            firstName:datas.userId.firstName,
            second_name:datas.userId.second_name,
            email:datas.userId.email,
            mobile_no:datas.userId.mobile_no,
            user_image:datas.userId.user_image,
            user_couple:datas.userId.user_couple,
            passport:datas.userId.passport,
            gender:datas.userId.gender,

            insuranceType:datas.insuranceType,
            subType:datas.subType,
            firstName:datas.firstName,
            middleName:datas.middleName,
            lastName:datas.lastName,
            mobile:datas.mobile,
            email:datas.email,
            occupation:datas.occupation,
            images:datas.images,
            dob:datas.dob,
            gender:datas.gender,
            city:datas.city,
            area:datas.area,
            address:datas.address,
            work_address:datas.work_address,
            status:datas.status,
            policy_number:datas.policy_number,
            policy_start_date:datas.policy_start_date,
            policy_ex_date:datas.policy_ex_date,
            policy_fee:datas.policy_fee,
            createdAt:datas.createdAt,

            policy_logo:datas.planId.policy_logo,
            planId:datas.planId._id,
            policy_name:datas.planId.policy_name ,
            ammount:datas.planId.ammount,
            idu_ammount:datas.planId.idu_ammount,
            duration:datas.planId.policy_duration,
            description:datas.planId.description,
            

        });
        console.log(data)
        res.render('vender_life_premium_sale_details.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,sub_module_data:req.session.sub_module_data,user_name:req.session.user_name })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: error.message })
    }
}



const marine_premium_sales_details= async (req, res) => {
    try {
        const id=req.params.id;
        const data = await marineInsuranceModel.findById({_id:id}).populate('userId planId');
        console.log(data)
        res.render('vender_marine_premium_sale_details.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,sub_module_data:req.session.sub_module_data,user_name:req.session.user_name })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: error.message })
    }
}



const medical_premium_sales_details= async (req, res) => {
    try {
        const id=req.params.id;
        const data = await buyMedicalInsurance.findById({_id:id}).populate('userId planId');
        console.log(data)
        res.render('vender_medical_premium_sale_details.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,sub_module_data:req.session.sub_module_data,user_name:req.session.user_name })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: error.message })
    }
}



const property_premium_sales_details= async (req, res) => {
    try {
        const id=req.params.id;
        const data = await buyProperty.findById({_id:id}).populate('userId planId');
        console.log(data)
        res.render('vender_property_premium_sale_details.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,sub_module_data:req.session.sub_module_data,user_name:req.session.user_name })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: error.message })
    }
}



// claim settle primum  list
const motor_premium_claim_list= async (req, res) => {
    try {
        const datas = await motorClaimRequestModel.find({}).populate('userId insuranceId').sort({_id:-1});
        console.log(datas)
        const data=await datas.map(item=>({
            _id:item._id,
            req_user_name:item.userId.first_name,
            req_civilId:item.userId.civilId,
            req_mobile_no:item.userId.mobile_no,
           insuranceType:item.insuranceId.insuranceType,
           insurance_subType:item.insuranceId.insurance_subType,
            policy_number:item.insuranceId.policy_number,
            createdAt:item.createdAt,
            status:item.status,

        }));
        console.log(data)
        res.render('vender_motor_premium_claim_list.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,sub_module_data:req.session.sub_module_data,user_name:req.session.user_name })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg:error.message})
    }
}


const travel_premium_claim_list= async (req, res) => {
    try {
        const datas = await travelClaimRequestModel.find({}).populate('userId insuranceId').sort({_id:-1});
        console.log(datas)
        const data=await datas.map(item=>({
            _id:item._id,
            req_user_name:item.userId.first_name,
            req_civilId:item.userId.civilId,
            req_mobile_no:item.userId.mobile_no,
            policy_number:item.insuranceId.policy_number,
            insuranceType:item.insuranceId.insuranceType,
            policy_duration:item.insuranceId.policy_duration,
            createdAt:item.createdAt,
            status:item.status,

        }));
        console.log(data)
        res.render('vender_travel_premium_claim_list.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,sub_module_data:req.session.sub_module_data,user_name:req.session.user_name })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg:error.message})
    }
}



const marine_premium_claim_list= async (req, res) => {
    try {
      
        const datas = await marineClaimRequestModel.find({}).populate('userId insuranceId').sort({_id:-1});
        console.log(datas)
        const data=await datas.map(item=>({
            _id:item._id,
            req_user_name:item.userId.first_name,
            req_civilId:item.userId.civilId,
            req_mobile_no:item.userId.mobile_no,
            insuranceType:item.insuranceId.insuranceType,
            policy_number:item.insuranceId.policy_number,
            registration_no:item.insuranceId.registration_no,
            policy_duration:item.insuranceId.duration,
            createdAt:item.createdAt,
            status:item.status,

        }));
        console.log(data)
        
        res.render('vender_marine_premium_claim_list.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,sub_module_data:req.session.sub_module_data,user_name:req.session.user_name })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg:error.message })
    }
}



const medical_premium_claim_list= async (req, res) => {
    try {
        const datas = await medicalClaimRequestModel.find({}).populate('userId insuranceId').sort({_id:-1});
        console.log(datas)
        const data=await datas.map(item=>({
            _id:item._id,
            req_user_name:item.userId.first_name,
            req_civilId:item.userId.civilId,
            req_mobile_no:item.userId.mobile_no,
            policy_number:item.insuranceId.policy_number,
            insuranceType:item.insuranceId.insuranceType,
            policy_duration:item.insuranceId.policy_duration,
            createdAt:item.createdAt,
            status:item.status,

        }));
        console.log(data)
        res.render('vender_medical_premium_claim_list.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,sub_module_data:req.session.sub_module_data,user_name:req.session.user_name })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg:error.message })
    }
}



const property_premium_claim_list= async (req, res) => {
    try {
        const datas = await propertyClaimRequestModel.find({}).populate('userId').sort({_id:-1});
        console.log(datas)
        const data=await datas.map(item=>({
            _id:item._id,
            req_user_name:item.userId.first_name,
            req_civilId:item.userId.civilId,
            req_mobile_no:item.userId.mobile_no,
           // client_name:item.details_of_life_assured.name,
            policy_number:132143242,
           // client_fathers_name:item.details_of_life_assured.father_name,
            createdAt:item.createdAt,
            status:item.status,

        }));
        console.log(data)
        res.render('vender_property_premium_claim_list.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,sub_module_data:req.session.sub_module_data,user_name:req.session.user_name })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg:error.message})
    }
}


const life_premium_claim_list= async (req, res) => {
    try {
        const datas = await lifeInsuranceClaimRequestModel.find({}).populate('userId').sort({_id:-1});
        console.log(datas)
        const data=await datas.map(item=>({
            _id:item._id,
            req_user_name:item.userId.first_name,
            req_civilId:item.userId.civilId,
            req_mobile_no:item.userId.mobile_no,
            client_name:item.details_of_life_assured.name,
            policy_number:132143242,
            client_fathers_name:item.details_of_life_assured.father_name,
            createdAt:item.createdAt,
            status:item.status,

        }));
        console.log(data)
        res.render('vender_life_premium_claim_list.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,sub_module_data:req.session.sub_module_data,user_name:req.session.user_name })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg:error.message})
    }
}



const motor_premium_claim_details= async (req, res) => {
    try {
        const id=req.params.id;
        const datas = await motorClaimRequestModel.findById({_id:id}).populate('userId insuranceId');
        const data=({
            _id:datas._id,
            civilId:datas.userId.civilId,
            userId:datas.userId._id,
            family_name:datas.userId.family_name,
            firstName:datas.userId.first_name,
            second_name:datas.userId.second_name,
            email:datas.userId.email,
            mobile_no:datas.userId.mobile_no,
            user_image:datas.userId.user_image,
            user_couple:datas.userId.user_couple,
            passport:datas.userId.passport,
            gender:datas.userId.gender,
            bod:datas.userId.date_of_birth,
            nationality:datas.userId.nationality,

            insuranceType:datas.insuranceId.insuranceType,
            subType:datas.insuranceId.insurance_subType,
            plate_no:datas.insuranceId.plate_no,
            chassis_no:datas.insuranceId.chassis_no,
            type:datas.insuranceId.type,
            shape:datas.insuranceId.shape,
            seating_capacity:datas.insuranceId.seating_capacity,
            model_year:datas.insuranceId.model_year,
            policy_period:datas.insuranceId.policy_period,
            usage:datas.insuranceId.usage,
            manufacturer:datas.insuranceId.manufacturer,
            model:datas.insuranceId.model,
            fuelType:datas.insuranceId.fuelType,
            primary_color:datas.insuranceId.primary_color,
            secondary_color:datas.insuranceId.secondary_color,
            policy_number:datas.insuranceId.policy_number,
            policy_start_date:datas.insuranceId.policy_start_date,
            policy_ex_date:datas.insuranceId.policy_ex_date,
            policy_fee:datas.insuranceId.policy_fee,
            fuelType:datas.insuranceId.fuelType,
            primary_color:datas.insuranceId.primary_color,
            secondary_color:datas.insuranceId.secondary_color,
            start_date:datas.insuranceId.start_date,
            duration:datas.insuranceId.duration,
            submission_fee:datas.insuranceId.submission_fee,
            policyPremium_total:datas.insuranceId.policyPremium_total,
            date:datas.date,
            time:datas.time,
            eventType:datas.eventType,
            city:datas.city,
            area:datas.area,
            landmark:datas.landmark,
            description:datas.description,
            accName:datas.accName,
            accNumber:datas.accNumber,
            ifsc_code:datas.ifsc_code,
            images:datas.images,
            createdAt:datas.createdAt,

        });
        console.log(data)
        res.render('vender_motor_premium_claim_details.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,sub_module_data:req.session.sub_module_data,user_name:req.session.user_name })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: error.message })
    }
}




const marine_premium_claim_details= async (req, res) => {
    try {
        const id=req.params.id;
        const data = await marineClaimRequestModel.findById({_id:id}).populate('userId insuranceId');
        console.log(data)
        res.render('vender_marine_premium_claim_details.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,sub_module_data:req.session.sub_module_data,user_name:req.session.user_name })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: error.message })
    }
}




const life_premium_claim_details= async (req, res) => {
    try {
        const id=req.params.id;
        const data = await lifeInsuranceClaimRequestModel.findById({_id:id}).populate('userId');
        console.log(data)
        res.render('vender_life_premium_claim_details.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,sub_module_data:req.session.sub_module_data,user_name:req.session.user_name })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: error.message })
    }
}




const property_premium_claim_details= async (req, res) => {
    try {
        const id=req.params.id;
        const data = await propertyClaimRequestModel.findById({_id:id}).populate('userId insuranceId');
        console.log(data)
        res.render('vender_property_premium_claim_details.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,sub_module_data:req.session.sub_module_data,user_name:req.session.user_name })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: error.message })
    }
}




const travel_premium_claim_details= async (req, res) => {
    try {
        const id=req.params.id;
        const data = await travelClaimRequestModel.findById({_id:id}).populate('userId insuranceId');
        console.log(data)
        res.render('vender_travel_premium_claim_details.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,sub_module_data:req.session.sub_module_data,user_name:req.session.user_name })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: error.message })
    }
}




const medical_premium_claim_details= async (req, res) => {
    try {
        const id=req.params.id;
        const data = await medicalClaimRequestModel.findById({_id:id}).populate('userId insuranceId');
        console.log(data)
        res.render('vender_medical_premium_claim_details.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,sub_module_data:req.session.sub_module_data,user_name:req.session.user_name })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: error.message })
    }
}




const update_lifeInsurance_premium_sale_status= async (req, res) => {
    try {
        const id=req.params._id;
        const status=req.body.status;
        const data = await lifeInsurance.findByIdAndUpdate({_id:id},{status},{new:true});
        res.redirect('/vender/life_premium_sales_list')//, { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,sub_module_data:req.session.sub_module_data,user_name:req.session.user_name })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: error.message })
    }
}


const update_marine_premium_sale_status= async (req, res) => {
    try {
        const id=req.params._id;
        const status=req.body.status;
        console.log("sdfksfksfklj",status,id)
        const data = await marineInsuranceModel.findByIdAndUpdate({_id:id},{status},{new:true});
        res.redirect('/vender/marine_premium_sales_list');
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: error.message })
    }
}



const update_motor_premium_sale_status= async (req, res) => {
    try {
        const id=req.params._id;
        const status=req.body.status;
        console.log("sdfksfksfklj",status,id)
        const data = await motorInsuranceModel.findByIdAndUpdate({_id:id},{status},{new:true});
        res.redirect('/vender/motor_premium_sales_list');
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: error.message })
    }
}


const update_travel_premium_sale_status= async (req, res) => {
    try {
        const id=req.params._id;
        const status=req.body.status;
        console.log("sdfksfksfklj",status,id)
        const data = await travelInformationModel.findByIdAndUpdate({_id:id},{status},{new:true});
        res.redirect('/vender/travel_premium_sales_list');
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: error.message })
    }
}



const update_medical_premium_sale_status= async (req, res) => {
    try {
        const id=req.params._id;
        const status=req.body.status;
        console.log("sdfksfksfklj",status,id)
        const data = await buyMedicalInsurance.findByIdAndUpdate({_id:id},{status},{new:true});
        res.redirect('/vender/medical_premium_sales_list');
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: error.message })
    }
}



const update_property_premium_sale_status= async (req, res) => {
    try {
        const id=req.params._id;
        const status=req.body.status;
        console.log("sdfksfksfklj",status,id)
        const data = await buyProperty.findByIdAndUpdate({_id:id},{status},{new:true});
        res.redirect('/vender/property_premium_sales_list');
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: error.message })
    }
}



const update_motor_premium_claim_status= async (req, res) => {
    try {
        const id=req.params._id;
        const status=req.body.status;
        console.log("sdfksfksfklj",status,id)
        const data = await motorClaimRequestModel.findByIdAndUpdate({_id:id},{status},{new:true});
        res.redirect('/vender/motor_premium_claim_list');
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: error.message })
    }
}



const update_life_premium_claim_status= async (req, res) => {
    try {
        const id=req.params._id;
        const status=req.body.status;
        console.log("sdfksfksfklj",status,id)
        const data = await lifeInsuranceClaimRequestModel.findByIdAndUpdate({_id:id},{status},{new:true});
        res.redirect('/vender/life_premium_claim_list');
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: error.message })
    }
}




const update_travel_premium_claim_status= async (req, res) => {
    try {
        const id=req.params._id;
        const status=req.body.status;
        console.log("sdfksfksfklj",status,id)
        const data = await travelClaimRequestModel.findByIdAndUpdate({_id:id},{status},{new:true});
        res.redirect('/vender/travel_premium_claim_list');
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: error.message })
    }
}



const update_marine_premium_claim_status= async (req, res) => {
    try {
        const id=req.params._id;
        const status=req.body.status;
        console.log("sdfksfksfklj",status,id)
        const data = await marineClaimRequestModel.findByIdAndUpdate({_id:id},{status},{new:true});
        res.redirect('/vender/marine_premium_claim_list');
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: error.message })
    }
}




const update_medical_premium_claim_status= async (req, res) => {
    try {
        const id=req.params._id;
        const status=req.body.status;
        console.log("sdfksfksfklj",status,id)
        const data = await medicalClaimRequestModel.findByIdAndUpdate({_id:id},{status},{new:true});
        res.redirect('/vender/medical_premium_claim_list');
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: error.message })
    }
}



const update_property_premium_claim_status= async (req, res) => {
    try {
        const id=req.params._id;
        const status=req.body.status;
        console.log("sdfksfksfklj",status,id)
        const data = await propertyClaimRequestModel.findByIdAndUpdate({_id:id},{status},{new:true});
        res.redirect('/vender/property_premium_claim_list');
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: error.message })
    }
}







module.exports = {
	login,
    venderLogin,
    index,
    logout,
    venderBannerList,
    createVenderBanner,
    addVenderBanner,
    editVenderBanner,
    updateVenderBanner,
    venderBannerStatus,
    deleteVenderBanner,
    userList,
    userStatus,
    userViewDetails,
    deleteUser,
    venderStaffList,
    createVenderStaff,
    addVenderStaff,
    editVenderStaff,
    updateVenderStaff,
    venderStaffStatus,
    deleteVenderStaff,
    venderPolicyList,
    createVenderPolicy,
    addVenderPolicy,
    editVenderPolicy,
    updateVenderPolicy,
    venderPolicyStatus,
    deleteVenderPolicy,
    venderPolicySaleList,
    venderTrasationList,
    venderPrivacyPolicy,
    editVenderPrivacyPolicy,
    updateVenderPrivacyPolicy,
    venderTermsCondition,
    editVenderTermsCondition,
    updateVenderTermsCondition,
    venderAboutUs,
    editVenderAboutUs,
    updateVenderAboutUs,
    venderContactUs,
    editVenderContactUs,
    updateVenderContactUs,

    motor_premium_sales_list,
    travel_premium_sales_list,
    marine_premium_sales_list,
    medical_premium_sales_list,
    property_premium_sales_list,
    life_premium_sales_list,
    motor_premium_claim_list,
    travel_premium_claim_list,
    marine_premium_claim_list,
    medical_premium_claim_list,
    property_premium_claim_list,
    life_premium_claim_list,
    life_premium_sales_details,
    travel_premium_sales_details,
    motor_premium_sales_details,
    marine_premium_sales_details,
    medical_premium_sales_details,
    property_premium_sales_details,
    life_premium_claim_details,
    travel_premium_claim_details,
    motor_premium_claim_details,
    marine_premium_claim_details,
    medical_premium_claim_details,
    property_premium_claim_details,
    update_lifeInsurance_premium_sale_status,
    update_marine_premium_sale_status,
    update_motor_premium_sale_status,
    update_travel_premium_sale_status,
    update_medical_premium_sale_status,
    update_property_premium_sale_status,
    update_motor_premium_claim_status,
    update_life_premium_claim_status,
    update_travel_premium_claim_status,
    update_marine_premium_claim_status,
    update_medical_premium_claim_status,
    update_property_premium_claim_status,
   
    

}