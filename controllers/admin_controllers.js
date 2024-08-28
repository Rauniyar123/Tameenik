//admin controllers  
const adminModel = require("../models/admin_login_models");
const venderModel = require("../models/vender_models"); 
const userModel = require('../models/user_models');  
const privacyPolicyModel = require('../models/privacy_policy_models');
const termsConditionModel = require('../models/terms_condition_models');
const aboutUsModel = require('../models/about_us_models');
const contactUsModel = require('../models/contact_us_models');
const policyCategoryModel = require('../models/policy_category_models');
const tameenikNewModel=require("../models/tameenikNews");
const rewardModel=require("../models/reward");
const homeTypeModel=require("../models/home_type_models");
const governorateModel=require("../models/governorate_models"); 
const premiumModel=require("../models/premium_models");
const benefitInsuranceModel=require("../models/benefit_insurance_models");
const aboutInsuranceModel=require("../models/aboutInsuranceModels");
const faqModel=require("../models/faq_models");

const login = async (req, res) => {  
    try {  
        res.render('admin_login.ejs',{msg:''})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}


const adminLogin=async(req,res)=>{
    try {
        const {email,password}=req.body
        const data= await adminModel.findOne({email:email,password:password})
        if(data){
            req.session.user_id = data._id;
            req.session.email = data.email;
            req.session.updatedAt = data.updatedAt;
            req.session.role_type = data.role_type;
            req.session.user_name = data.user_name; 
    
            res.redirect('/admin/index')
            await adminModel.findByIdAndUpdate({ _id: data._id }, { $set: { 'updatedAt':req.session.updatedAt } }, { new: true })
        }else{
            res.render('admin_login.ejs',{msg:'Invalid Email or Password'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({result:"false",msg:"Internel Server Error"})
    }
}

const logout=async(req,res) => {
    try {
        req.session.destroy();
        res.render('admin_login.ejs',{msg:''});
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
};

const index = async (req, res) => {  
    try {

        const totalUser = await userModel.countDocuments();
        const totalVendor = await venderModel.countDocuments();

        const email=req.session.email;
        const updatedAt=req.session.updatedAt;
        const role_type = req.session.role_type;
        const module_name = req.session.module_name;
        const sub_module_data = req.session.sub_module_data;
        const user_name = req.session.user_name; 
        res.render('admin_index.ejs',{totalUser,totalVendor,email,updatedAt,role_type,module_name,sub_module_data,user_name})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
} 

const roleList = async (req, res) => {
    try {
        const data = await adminModel.find({role_type:"staff"});
        console.log(data)
        res.render('role_list.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,sub_module_data:req.session.sub_module_data,user_name:req.session.user_name })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg:error.messages })
    }
}

const createRole = async (req, res) => {
    try {
        res.render('create_role.ejs', {email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,user_name:req.session.user_name,msg:'' })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const addRole = async (req, res) => {
    try {
        const { user_name,email,password,role_type,mobile_no,employee_no,address,id_proof_no,description } = req.body;
        const adminData = await adminModel.findOne({email:email});
        if(adminData){
            res.render('create_role.ejs', {email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,user_name:req.session.user_name,msg:'email already exist,please enter new email..' });
        }
        const roleData = new adminModel({
            user_name,
            email,
            password,
            role_type,
            mobile_no,
            employee_no,
            address,
            id_proof_no,
            description,
            image:req.file.filename,
            createdBy : req.session.email
        });

        const data = await roleData.save();
        //res.render('create_role.ejs', {email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,user_name:req.session.user_name,msg:'admin staff add successfully..' })
        res.status(200).redirect('/admin/role_list');
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: "false", msg: "Internal Server Error" });
    }
};

const editRole = async (req, res) => {
    try {
        const roleId = req.params.id
        const data = await adminModel.findById({ _id: roleId });
         res.render('edit_role.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,user_name:req.session.user_name})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}


const updateRole = async (req, res) => {
    try {
        const { user_name,password,role_type,mobile_no,employee_no,address,id_proof_no,description } = req.body
        const Id = req.params.id

        if (req.file) {
            const adminData = await adminModel.findByIdAndUpdate({ _id: Id }, { $set: { user_name,password,role_type,mobile_no,employee_no,address,id_proof_no,description,image:req.file.filename,updatedBy : req.session.email } }, { new: true })
        } else {
            const adminData = await adminModel.findByIdAndUpdate({ _id: Id }, { $set: { user_name,password,role_type,mobile_no,employee_no,address,id_proof_no,description,updatedBy : req.session.email }}, { new: true })
        }

        res.status(200).redirect('/admin/role_list')
    } catch (error) {
        console.log(error)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const roleStatus=async(req,res)=>{
    try{
        const Id=req.params.id;
        const data=await adminModel.findById({_id:Id});
        if(data.admin_status=='0'){
            const update_data=await adminModel.findByIdAndUpdate({"_id":Id},{admin_status:'1',updatedBy : req.session.email},{new:true});
            res.status(200).redirect("/admin/role_list");
        }else{
            const update_data=await adminModel.findByIdAndUpdate({"_id":Id},{admin_status:'0',updatedBy : req.session.email},{new:true});
            res.status(200).redirect("/admin/role_list");
        }
    }catch(err){
        console.log(err.message);
        res.status(400).json({"result":"false","message":err.message});
    }
};

const deleteRole = async (req, res) => {
    try {
        const Id = req.params.id
        const venderData = await adminModel.findByIdAndDelete({ _id: Id })

        res.status(200).redirect('/admin/role_list')

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}


const vendorList = async (req, res) => {
    try {
        const data = await venderModel.find({});
        
        res.render('vendor_list.ejs',{data: data, email: req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,user_name:req.session.user_name })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}
 
const createVendor = async (req, res) => {
    try {
        res.render('create_vendor.ejs', {email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,user_name:req.session.user_name,msg:'' })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const addVendor = async (req, res) => {
    try {
        const { user_name,email,password,category_type,mobile_no,address,id_proof_no,description } = req.body;
        //const company_log = req.file;
       
        const vender_data = await venderModel.findOne({'email':email});
        if(!vender_data){
            const venderData = new venderModel({user_name,email,password,category_type,mobile_no,address,id_proof_no,description,company_logo:req.file.filename,createdBy : req.session.email });
            const data = await venderData.save();
            res.status(200).redirect('/admin/vendor_list')
            //res.render('create_vender_user.ejs', {data:data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,user_name:req.session.user_name,msg:'vendor user add successfully..' })
        }else{
          res.render('create_vendor.ejs', {data:data,result:result,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,user_name:req.session.user_name,msg:'email already exist please enter new email..' })  
        }    
    } catch (error) {
        console.log(error); 
        res.status(500).json({ result: "false", msg: "Internal Server Error" });
    }
};

const editVendor = async (req, res) => {
    try {
        const Id = req.params.id
        const data = await venderModel.findById({ _id: Id });
         res.render('edit_vendor.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,user_name:req.session.user_name,msg:''})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const updateVendor = async (req, res) => {
    try {
        const { user_name,category_type,mobile_no,address,id_proof_no,description } = req.body;
        const Id = req.params.id;

        if (req.file) {
            const vendorData = await venderModel.findByIdAndUpdate({ _id: Id }, { $set: { user_name,category_type,mobile_no,address,id_proof_no,description,company_logo:req.file.filename,updatedBy : req.session.email } }, { new: true })
        } else {
            const vendorData = await venderModel.findByIdAndUpdate({ _id: Id }, { $set: { user_name,category_type,mobile_no,address,id_proof_no,description,updatedBy : req.session.email }}, { new: true })
        }
        res.status(200).redirect('/admin/vendor_list');
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: false, msg: "Internal Server Error" });
    }
};


const vendorStatus=async(req,res)=>{
    try{
        const Id=req.params.id;
        const data=await venderModel.findById({_id:Id});
        if(data.vendor_status=='0'){
            const update_data=await venderModel.findByIdAndUpdate({"_id":Id},{vendor_status:'1',updatedBy : req.session.email},{new:true});
            res.status(200).redirect("/admin/vendor_list");
        }else{
            const update_data=await venderModel.findByIdAndUpdate({"_id":Id},{vendor_status:'0',updatedBy : req.session.email},{new:true});
            res.status(200).redirect("/admin/vendor_list");
        }
    }catch(err){
        console.log(err.message);
        res.status(400).json({"result":"false","message":err.message});
    }
};

const deleteVendor = async (req, res) => {
    try {
        const Id = req.params.id
        const venderData = await venderModel.findByIdAndDelete({ _id: Id })

        res.status(200).redirect('/admin/vendor_list')

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const privacyPolicy = async (req, res) => {
    try {
        const data = await privacyPolicyModel.find({});
        res.render('privacy_policy.ejs',{data:data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,sub_module_data:req.session.sub_module_data,user_name:req.session.user_name})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const editPrivacyPolicy = async (req, res) => {
    try {
        const policyId = req.params.id
        const data = await privacyPolicyModel.findById({ _id: policyId });
         res.render('edit_privacy_policy.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,user_name:req.session.user_name})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const updatePrivacyPolicy = async (req, res) => {
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

        const updatedPrivacyPolicy = await privacyPolicyModel.findByIdAndUpdate(
            { _id: id },
            { $set: updateFields,updatedBy : req.session.email },
            { new: true }
        );

        res.status(200).redirect('/admin/privacy_policy')

    } catch (error) {
        console.log(error)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const termsAndCondition = async (req, res) => {
    try {
        const data = await termsConditionModel.find({});
        res.render('terms_and_condition.ejs',{data:data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,sub_module_data:req.session.sub_module_data,user_name:req.session.user_name})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}


const editTermsCondition = async (req, res) => {
    try {
        const termsId = req.params.id
        const data = await termsConditionModel.findById({ _id: termsId });
         res.render('edit_terms_and_condition.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,user_name:req.session.user_name})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}


const updateTermsCondition = async (req, res) => {
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

        const updatedTermsCondition = await termsConditionModel.findByIdAndUpdate(
            { _id: id },
            { $set: updateFields,updatedBy : req.session.email },
            { new: true }
        );

        res.status(200).redirect('/admin/terms_and_condition')

    } catch (error) {
        console.log(error)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}


const aboutUs = async (req, res) => {
    try {
        const data = await aboutUsModel.find({});
        res.render('about_us.ejs',{data:data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,sub_module_data:req.session.sub_module_data,user_name:req.session.user_name})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}


const editAboutUs = async (req, res) => {
    try {
        const aboutId = req.params.id
        const data = await aboutUsModel.findById({ _id: aboutId });
         res.render('edit_about_us.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,user_name:req.session.user_name})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const updateAboutUs = async (req, res) => {
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

        const updatedAboutUs = await aboutUsModel.findByIdAndUpdate(
            { _id: id },
            { $set: updateFields,updatedBy : req.session.email },
            { new: true }
        );

        res.status(200).redirect('/admin/about_us')

    } catch (error) {
        console.log(error)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}


const contactUs = async (req, res) => {
    try {
        const data = await contactUsModel.find({});
        res.render('contact_us.ejs',{data:data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,sub_module_data:req.session.sub_module_data,user_name:req.session.user_name})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}


const editContact_Us = async (req, res) => {
    try {
        const Id = req.params.id
        const data = await contactUsModel.findById({ _id: Id });
        res.render('edit_contact_us.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,user_name:req.session.user_name,msg:''})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const updateContactUs = async (req, res) => {
    try {
        const { name,phone_no,whatsapp_no,email} = req.body
        const Id = req.params.id
        const data = await contactUsModel.findByIdAndUpdate({ _id: Id }, { name,phone_no,whatsapp_no,email, updatedBy : req.session.email }, { new: true });
        //res.status(200).redirect('/admin/product_order_list')
        res.render('edit_contact_us.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,user_name:req.session.user_name,msg:'data updated successfully..'})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const userList = async (req, res) => {
    try {
        const data = await userModel.find({})
        res.render('admin_user_list.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,user_name:req.session.user_name })
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
            res.status(200).redirect("/admin/user_list");
        }else{
            const update_data=await userModel.findByIdAndUpdate({"_id":Id},{user_status:'0',updatedBy : req.session.email},{new:true});
            res.status(200).redirect("/admin/user_list");
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
         res.render('admin_user_view_details.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,user_name:req.session.user_name,msg:''})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const deleteUser = async (req, res) => {
    try {
        const Id = req.params.id
        const policyData = await userModel.findByIdAndDelete({ _id: Id })
        res.status(200).redirect('/admin/user_list')
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const policyCategoryList = async (req, res) => {
    try {
        const data = await policyCategoryModel.find({})
        res.render('policy_category_list.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,user_name:req.session.user_name })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const createPolicyCategory = async (req, res) => {
    try {
        const data = await policyCategoryModel.find({});
        res.render('create_policy_category.ejs', {data:data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,user_name:req.session.user_name,msg:'' })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const addPolicyCategory = async (req, res) => {
    try {
        const { category_name,description } = req.body;
        console.log(req.file)
        const categoryData = new policyCategoryModel({category_name,description,category_image: req.file.filename,createdBy : req.session.email });
        const data = await categoryData.save();
        res.render('create_policy_category.ejs', {data:data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,user_name:req.session.user_name,msg:'policy category add successfully..' }) 
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: "false", msg: "Internal Server Error" });
    }
};

const editPolicyCategory = async (req, res) => {
    try {
        const Id = req.params.id
        const data = await policyCategoryModel.findById({ _id: Id });
         res.render('edit_policy_category.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,user_name:req.session.user_name,msg:''})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const updatePolicyCategory = async (req, res) => {
    try {
        const { category_name,description } = req.body
        const Id = req.params.id
        if (req.file) {
            const categoryData = await policyCategoryModel.findByIdAndUpdate({ _id: Id }, { $set: { category_name, description, category_image: req.file.filename,updatedBy : req.session.email } }, { new: true })
        } else {
            const categoryData = await policyCategoryModel.findByIdAndUpdate({ _id: Id }, { category_name: category_name,description:description,updatedBy : req.session.email }, { new: true })
        }

        res.status(200).redirect('/admin/policy_category_list')

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const deletePolicyCategory = async (req, res) => {
    try {
        const Id = req.params.id
        const categoryData = await policyCategoryModel.findByIdAndDelete({ _id: Id })

        res.status(200).redirect('/admin/policy_category_list')
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const policyCategoryStatus=async(req,res)=>{
    try{
        const Id=req.params.id;
        const data=await policyCategoryModel.findById({_id:Id});
        if(data.category_status=='0'){
            const update_data=await policyCategoryModel.findByIdAndUpdate({"_id":Id},{category_status:'1',updatedBy : req.session.email},{new:true});
            res.status(200).redirect("/admin/policy_category_list");
        }else{
            const update_data=await policyCategoryModel.findByIdAndUpdate({"_id":Id},{category_status:'0',updatedBy : req.session.email},{new:true});
            res.status(200).redirect("/admin/policy_category_list");
        }
    }catch(err){
        console.log(err.message);
        res.status(400).json({"result":"false","message":err.message});
    }
};



const newsList = async (req, res) => {
    try {
        const data = await tameenikNewModel.find({})
        res.render('admin_news_list.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,user_name:req.session.user_name })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}


const createNews = async (req, res) => {
    try {
        const data = await tameenikNewModel.find({});
        res.render('create_news.ejs', {data:data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,user_name:req.session.user_name,msg:'' })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}



const addNews = async (req, res) => {
    try {
        const { headline,date,description } = req.body;
        const newsData = new tameenikNewModel({headline,date,description,image: req.file.filename,createdBy : req.session.email });
        const data = await newsData.save();
        res.render('create_news.ejs', {data:data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,user_name:req.session.user_name,msg:'news add successfully..' }) 
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: "false", msg: "Internal Server Error" });
    }
};



const editNews = async (req, res) => {
    try {
        const Id = req.params.id
        const data = await tameenikNewModel.findById({ _id: Id });
         res.render('edit_news.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,user_name:req.session.user_name,msg:''})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}


const updateNews = async (req, res) => {
    try {
        const { headline,date,description } = req.body
        const Id = req.params.id
        if (req.file) {
            const newsData = await tameenikNewModel.findByIdAndUpdate({ _id: Id }, { $set: { headline,date,description, image: req.file.filename,updatedBy : req.session.email } }, { new: true })
        } else {
            const newsData = await tameenikNewModel.findByIdAndUpdate({ _id: Id }, { $set: { headline,date,description,updatedBy : req.session.email } }, { new: true })
        }

        res.status(200).redirect('/admin/news_list')

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const newsStatus=async(req,res)=>{
    try{
        const Id=req.params.id;
        const data=await tameenikNewModel.findById({_id:Id});
        if(data.status=='0'){
            const update_data=await tameenikNewModel.findByIdAndUpdate({"_id":Id},{status:'1',updatedBy : req.session.email},{new:true});
            res.status(200).redirect("/admin/news_list");
        }else{
            const update_data=await tameenikNewModel.findByIdAndUpdate({"_id":Id},{status:'0',updatedBy : req.session.email},{new:true});
            res.status(200).redirect("/admin/news_list");
        }
    }catch(err){
        console.log(err.message);
        res.status(400).json({"result":"false","message":err.message});
    }
};

const deleteNews = async (req, res) => {
    try {
        const Id = req.params.id
        const newsData = await tameenikNewModel.findByIdAndDelete({ _id: Id })

        res.status(200).redirect('/admin/news_list')
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const rewardList = async (req, res) => {
    try {
        const data = await rewardModel.find({})
        res.render('admin_reward_list.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,user_name:req.session.user_name })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const createReward = async (req, res) => {
    try {
        const data = await rewardModel.find({});
        res.render('create_reward.ejs', {data:data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,user_name:req.session.user_name,msg:'' })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const addReward = async (req, res) => {
    try {
        const { name,points,expire_date,description } = req.body;
        const rewardData = new rewardModel({name,points,expire_date,description,image: req.file.filename,createdBy : req.session.email });
        const data = await rewardData.save();
        res.render('create_reward.ejs', {data:data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,user_name:req.session.user_name,msg:'reward add successfully..' }) 
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: "false", msg: "Internal Server Error" });
    }
};

const editReward = async (req, res) => {
    try {
        const Id = req.params.id
        const data = await rewardModel.findById({ _id: Id });
         res.render('edit_reward.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,user_name:req.session.user_name,msg:''})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const updateReward = async (req, res) => {
    try {
        const { name,points,expire_date,description } = req.body
        const Id = req.params.id
        if (req.file) {
            const newsData = await rewardModel.findByIdAndUpdate({ _id: Id }, { $set: { name,points,expire_date,description, image: req.file.filename,updatedBy : req.session.email } }, { new: true })
        } else {
            const newsData = await rewardModel.findByIdAndUpdate({ _id: Id }, { $set: { name,points,expire_date,description,updatedBy : req.session.email } }, { new: true })
        }

        res.status(200).redirect('/admin/reward_list')

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const rewardStatus=async(req,res)=>{
    try{
        const Id=req.params.id;
        const data=await rewardModel.findById({_id:Id});
        if(data.status=='0'){
            const update_data=await rewardModel.findByIdAndUpdate({"_id":Id},{status:'1',updatedBy : req.session.email},{new:true});
            res.status(200).redirect("/admin/reward_list");
        }else{
            const update_data=await rewardModel.findByIdAndUpdate({"_id":Id},{status:'0',updatedBy : req.session.email},{new:true});
            res.status(200).redirect("/admin/reward_list");
        }
    }catch(err){
        console.log(err.message);
        res.status(400).json({"result":"false","message":err.message});
    }
};

const deleteReward = async (req, res) => {
    try {
        const Id = req.params.id
        const rewardData = await rewardModel.findByIdAndDelete({ _id: Id })

        res.status(200).redirect('/admin/reward_list')
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}


const homeTypeList = async (req, res) => {
    try {
        const data = await homeTypeModel.find({})
        res.render('admin_home_type.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,user_name:req.session.user_name })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}


const createHomeType = async (req, res) => {
    try {
        res.render('create_home_type.ejs', {email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,user_name:req.session.user_name,msg:'' })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}



const addHomeType = async (req, res) => {
    try {
        const { home_type } = req.body;
        const homeData = new homeTypeModel({home_type,createdBy : req.session.email });
        const data = await homeData.save();
        res.render('create_home_type.ejs', {data:data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,user_name:req.session.user_name,msg:'home type add successfully..' }) 
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: "false", msg: "Internal Server Error" });
    }
};

const editHomeType = async (req, res) => {
    try {
        const Id = req.params.id
        const data = await homeTypeModel.findById({ _id: Id });
         res.render('edit_home_type.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,user_name:req.session.user_name,msg:''})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const updateHomeType = async (req, res) => {
    try {
        const { home_type } = req.body
        const Id = req.params.id
        const homeData = await homeTypeModel.findByIdAndUpdate({ _id: Id }, { $set: { home_type,updatedBy : req.session.email } }, { new: true })

        res.status(200).redirect('/admin/home_type_list')
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const homeTypeStatus=async(req,res)=>{
    try{
        const Id=req.params.id;
        const data=await homeTypeModel.findById({_id:Id});
        if(data.home_type_status=='0'){
            const update_data=await homeTypeModel.findByIdAndUpdate({"_id":Id},{home_type_status:'1',updatedBy : req.session.email},{new:true});
            res.status(200).redirect("/admin/home_type_list");
        }else{
            const update_data=await homeTypeModel.findByIdAndUpdate({"_id":Id},{home_type_status:'0',updatedBy : req.session.email},{new:true});
            res.status(200).redirect("/admin/home_type_list");
        }
    }catch(err){
        console.log(err.message);
        res.status(400).json({"result":"false","message":err.message});
    }
};

const deleteHomeType = async (req, res) => {
    try {
        const Id = req.params.id
        const homeData = await homeTypeModel.findByIdAndDelete({ _id: Id })

        res.status(200).redirect('/admin/home_type_list')
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const governorateList = async (req, res) => {
    try {
        const data = await governorateModel.find({})
        res.render('admin_governorate_list.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,user_name:req.session.user_name })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const createGovernorate = async (req, res) => {
    try {
        res.render('create_governorate.ejs', {email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,user_name:req.session.user_name,msg:'' })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const addGovernorate = async (req, res) => {
    try {
        const { governorate } = req.body;
        const governorateData = new governorateModel({governorate,createdBy : req.session.email });
        const data = await governorateData.save();
        res.render('create_governorate.ejs', {data:data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,user_name:req.session.user_name,msg:'governorate add successfully..' }) 
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: "false", msg: "Internal Server Error" });
    }
};

const editGovernorate = async (req, res) => {
    try {
        const Id = req.params.id
        const data = await governorateModel.findById({ _id: Id });
         res.render('edit_governorate.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,user_name:req.session.user_name,msg:''})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const updateGovernorate = async (req, res) => {
    try {
        const { governorate } = req.body
        const Id = req.params.id
        const governorateData = await governorateModel.findByIdAndUpdate({ _id: Id }, { $set: { governorate,updatedBy : req.session.email } }, { new: true })

        res.status(200).redirect('/admin/governorate_list')
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const governorateStatus=async(req,res)=>{
    try{
        const Id=req.params.id;
        const data=await governorateModel.findById({_id:Id});
        if(data.governorate_status=='0'){
            const update_data=await governorateModel.findByIdAndUpdate({"_id":Id},{governorate_status:'1',updatedBy : req.session.email},{new:true});
            res.status(200).redirect("/admin/governorate_list");
        }else{
            const update_data=await governorateModel.findByIdAndUpdate({"_id":Id},{governorate_status:'0',updatedBy : req.session.email},{new:true});
            res.status(200).redirect("/admin/governorate_list");
        }
    }catch(err){
        console.log(err.message);
        res.status(400).json({"result":"false","message":err.message});
    }
};

const deleteGovernorate = async (req, res) => {
    try {
        const Id = req.params.id
        const governorateData = await governorateModel.findByIdAndDelete({ _id: Id })

        res.status(200).redirect('/admin/governorate_list')
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const premiumList = async (req, res) => {
    try {
        const data = await premiumModel.find({})
        console.log(data)
        res.render('admin_premium_list.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,user_name:req.session.user_name })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const createPremium = async (req, res) => {
    try {
        res.render('create_premium.ejs', {email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,user_name:req.session.user_name,msg:'' })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const addPremium = async (req, res) => {
    try {
        const { premium_type,sub_premium_type,duration,policy_fee,submission_fee } = req.body;
        const premiumData = new premiumModel({premium_type,sub_premium_type,duration,policy_fee,submission_fee,createdBy : req.session.email });
        const data = await premiumData.save();
        res.render('create_premium.ejs', {data:data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,user_name:req.session.user_name,msg:'premium data add successfully..' }) 
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: "false", msg: "Internal Server Error" });
    }
};

const editPremium = async (req, res) => {
    try {
        const Id = req.params.id
        const data = await premiumModel.findById({ _id: Id });
         res.render('edit_premium.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,user_name:req.session.user_name,msg:''})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const updatePremium = async (req, res) => {
    try {
        const { premium_type,sub_premium_type,duration,policy_fee,submission_fee } = req.body
        const Id = req.params.id
        const buildingFeesData = await premiumModel.findByIdAndUpdate({ _id: Id }, { $set: { premium_type,sub_premium_type,duration,policy_fee,submission_fee,updatedBy : req.session.email } }, { new: true })

        res.status(200).redirect('/admin/premium_list')
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const premiumStatus=async(req,res)=>{
    try{
        const Id=req.params.id;
        const data=await premiumModel.findById({_id:Id});
        if(data.premium_status=='0'){
            const update_data=await premiumModel.findByIdAndUpdate({"_id":Id},{premium_status:'1',updatedBy : req.session.email},{new:true});
            res.status(200).redirect("/admin/premium_list");
        }else{
            const update_data=await premiumModel.findByIdAndUpdate({"_id":Id},{premium_status:'0',updatedBy : req.session.email},{new:true});
            res.status(200).redirect("/admin/premium_list");
        }
    }catch(err){
        console.log(err.message);
        res.status(400).json({"result":"false","message":err.message});
    }
};

const deletePremium = async (req, res) => {
    try {
        const Id = req.params.id
        const premiumData = await premiumModel.findByIdAndDelete({ _id: Id })

        res.status(200).redirect('/admin/premium_list')
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}


const benefitInsuranceList = async (req, res) => {
    try {
        const data = await benefitInsuranceModel.find({})
        console.log(data)
        res.render('admin_benefit_insurance_list.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,user_name:req.session.user_name })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const createBenefitInsurance = async (req, res) => {
    try {
        res.render('create_benefit_insurance.ejs', {email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,user_name:req.session.user_name,msg:'' })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}


const addBenefitInsurance = async (req, res) => {
    try {
        const { title,text,insuranceType,insuranceSubType } = req.body;
        const benefitData = new benefitInsuranceModel({title,text,insuranceType,insuranceSubType,createdBy : req.session.email });
        const data = await benefitData.save();
        res.render('create_benefit_insurance.ejs', {data:data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,user_name:req.session.user_name,msg:'benefit insurance data add successfully..' }) 
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: "false", msg: "Internal Server Error" });
    }
};

const editBenefitInsurance = async (req, res) => {
    try {
        const Id = req.params.id
        const data = await benefitInsuranceModel.findById({ _id: Id });
         res.render('edit_benefit_insurance.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,user_name:req.session.user_name,msg:''})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const updateBenefitInsurance = async (req, res) => {
    try {
        const { title,text,insuranceType,insuranceSubType } = req.body
        const Id = req.params.id
        const benefitData = await benefitInsuranceModel.findByIdAndUpdate({ _id: Id }, { $set: { title,text,insuranceType,insuranceSubType,updatedBy : req.session.email } }, { new: true })

        res.status(200).redirect('/admin/benefit_insurance_list')
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const benefitInsuranceStatus=async(req,res)=>{
    try{
        const Id=req.params.id;
        const data=await benefitInsuranceModel.findById({_id:Id});
        if(data.benefit_insurance_status=='0'){
            const update_data=await benefitInsuranceModel.findByIdAndUpdate({"_id":Id},{benefit_insurance_status:'1',updatedBy : req.session.email},{new:true});
            res.status(200).redirect("/admin/benefit_insurance_list");
        }else{
            const update_data=await benefitInsuranceModel.findByIdAndUpdate({"_id":Id},{benefit_insurance_status:'0',updatedBy : req.session.email},{new:true});
            res.status(200).redirect("/admin/benefit_insurance_list");
        }
    }catch(err){
        console.log(err.message);
        res.status(400).json({"result":"false","message":err.message});
    }
};

const deleteBenefitInsurance = async (req, res) => {
    try {
        const Id = req.params.id
        const benefitData = await benefitInsuranceModel.findByIdAndDelete({ _id: Id })

        res.status(200).redirect('/admin/benefit_insurance_list')
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const aboutInsuranceList = async (req, res) => {
    try {
        const data = await aboutInsuranceModel.find({})
        res.render('admin_about_insurance_list.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,user_name:req.session.user_name })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const createAboutInsurance = async (req, res) => {
    try {
        res.render('create_about_insurance.ejs', {email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,user_name:req.session.user_name,msg:'' })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const addAboutInsurance = async (req, res) => {
    try {
        const { title,text,insuranceType,insuranceSubType } = req.body;
        const aboutData = new aboutInsuranceModel({title,text,insuranceType,insuranceSubType,icon: req.file.filename,createdBy : req.session.email });
        const data = await aboutData.save();
        res.render('create_about_insurance.ejs', {data:data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,user_name:req.session.user_name,msg:'about insurance add successfully..' }) 
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: "false", msg: "Internal Server Error" });
    }
};

const editAboutInsurance = async (req, res) => {
    try {
        const Id = req.params.id
        const data = await aboutInsuranceModel.findById({ _id: Id });
         res.render('edit_about_insurance.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,module_name:req.session.module_name,user_name:req.session.user_name,msg:''})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const updateAboutInsurance = async (req, res) => {
    try {
        const { title,text,insuranceType,insuranceSubType } = req.body
        const Id = req.params.id
        if (req.file) {
            const aboutData = await aboutInsuranceModel.findByIdAndUpdate({ _id: Id }, { $set: { title,text,insuranceType,insuranceSubType, icon: req.file.filename,updatedBy : req.session.email } }, { new: true })
        } else {
            const aboutData = await aboutInsuranceModel.findByIdAndUpdate({ _id: Id }, { $set: { title,text,insuranceType,insuranceSubType,updatedBy : req.session.email } }, { new: true })
        }

        res.status(200).redirect('/admin/about_insurance_list')

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const aboutInsuranceStatus=async(req,res)=>{
    try{
        const Id=req.params.id;
        const data=await aboutInsuranceModel.findById({_id:Id});
        if(data.about_insurance_status=='0'){
            const update_data=await aboutInsuranceModel.findByIdAndUpdate({"_id":Id},{about_insurance_status:'1',updatedBy : req.session.email},{new:true});
            res.status(200).redirect("/admin/about_insurance_list");
        }else{
            const update_data=await aboutInsuranceModel.findByIdAndUpdate({"_id":Id},{about_insurance_status:'0',updatedBy : req.session.email},{new:true});
            res.status(200).redirect("/admin/about_insurance_list");
        }
    }catch(err){
        console.log(err.message);
        res.status(400).json({"result":"false","message":err.message});
    }
};

const deleteAboutInsurance = async (req, res) => {
    try {
        const Id = req.params.id
        const aboutData = await aboutInsuranceModel.findByIdAndDelete({ _id: Id })

        res.status(200).redirect('/admin/about_insurance_list')
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}


const faq_list = async (req, res) => {
    try {
        const data = await faqModel.find({});
        res.render('faq_list.ejs',{data:data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,user_name:req.session.user_name,msg:'faq get successfully..'});
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}


const edit_faq = async (req, res) => {
    try {
        const aboutId = req.params.id
        const data = await faqModel.findById({ _id: aboutId });
         res.render('edit_faq.ejs', { data: data,email:req.session.email,updatedAt:req.session.updatedAt,role_type:req.session.role_type,user_name:req.session.user_name,msg:'faq update successfully..'});
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

const update_faq = async (req, res) => {
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

        const updatedAboutUs = await faqModel.findByIdAndUpdate(
            { _id: id },
            { $set: updateFields,updatedBy : req.session.email },
            { new: true }
        );

        res.status(200).redirect('/admin/faq_list')

    } catch (error) {
        console.log(error)
        res.status(500).json({ result: "false", msg:error.message})
    }
}






module.exports = {
    login,
    adminLogin,
    logout,
    index,
    roleList,
    createRole,
    addRole,
    editRole,
    updateRole,
    roleStatus,
    deleteRole,
    vendorList,
    createVendor,
    addVendor,
    editVendor,
    updateVendor,
    vendorStatus,
    deleteVendor,
    privacyPolicy,
    editPrivacyPolicy,
    updatePrivacyPolicy,
    termsAndCondition,
    editTermsCondition,
    updateTermsCondition,
    aboutUs,
    editAboutUs,
    updateAboutUs,
    contactUs,
    editContact_Us,
    updateContactUs,
    userList,
    userStatus,
    deleteUser,
    userViewDetails,
    policyCategoryList,
    createPolicyCategory,
    addPolicyCategory,
    editPolicyCategory,
    updatePolicyCategory,
    deletePolicyCategory,
    policyCategoryStatus,
    newsList,
    createNews,
    addNews,
    editNews,
    updateNews,
    newsStatus,
    deleteNews,
    rewardList,
    createReward,
    addReward,
    editReward,
    updateReward,
    rewardStatus,
    deleteReward,
    homeTypeList,
    createHomeType,
    addHomeType,
    editHomeType,
    updateHomeType,
    homeTypeStatus,
    deleteHomeType,
    governorateList,
    createGovernorate,
    addGovernorate,
    editGovernorate,
    updateGovernorate,
    governorateStatus,
    deleteGovernorate,
    premiumList,
    createPremium,
    addPremium,
    editPremium,
    updatePremium,
    premiumStatus,
    deletePremium,
    benefitInsuranceList,
    createBenefitInsurance,
    addBenefitInsurance,
    editBenefitInsurance,
    updateBenefitInsurance,
    benefitInsuranceStatus,
    deleteBenefitInsurance,
    aboutInsuranceList,
    createAboutInsurance,
    addAboutInsurance,
    editAboutInsurance,
    updateAboutInsurance,
    aboutInsuranceStatus,
    deleteAboutInsurance,
    faq_list,
    edit_faq,
    update_faq,
}    