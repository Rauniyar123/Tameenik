const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const ObjectId = require("mongoose").Types.ObjectId;

//import modles here
const userModel = require("../models/user_models");
const documentModel = require("../models/myDocuments");
const addressModel=require("../models/myAddress");
const communicationModel=require("../models/corporateCommunication");
const tameenikNewModel=require("../models/tameenikNews");
const contactUsModel = require("../models/contactUs");
const faimlyInformationModel=require("../models/faimlyInformation");
const rewardModel=require("../models/reward");
const travelInformationModel=require("../models/travelInformation");
const lifeInsurance=require("../models/lifeInsurance");
const buyProperty=require("../models/buyPropertyInsurance");
const buyMedicalInsurance=require("../models/buyMedicalInsurance");
const planModel=require("../models/vender_policy_models");
const homeTypeModel=require("../models/home_type_models");
const governorateModel=require("../models/governorate_models");
const premiumModel=require("../models/premium_models");
const aboutInsuranceModel=require("../models/aboutInsuranceModels");
const benefitInsuranceModel=require("../models/benefit_insurance_models");
const marineInsuranceModel=require("../models/marineInsurance_models");
const motorInsuranceModel=require("../models/motorInsurance_models");
const motorClaimRequestModel=require("../models/motorClaim_request");
const marineClaimRequestModel=require("../models/marineClaim_request");
const medicalClaimRequestModel=require("../models/medicalClaim_request");
const propertyClaimRequestModel=require("../models/propertyClaim_request");
const travelClaimRequestModel=require("../models/travelClaim_request");
const lifeInsuranceClaimRequestModel=require("../models/lifeInsuranceClaim_request");

const privacyPolicyModel = require("../models/privacy_policy_models");
const termsConditionModel = require("../models/terms_condition_models");
const aboutUsModel = require("../models/about_us_models");
const faqModel=require("../models/faq_models");


const policyCategoryModel = require("../models/policy_category_models");
const bcrypt = require("bcrypt");
const reward = require("../models/reward");
const { json } = require("body-parser");

const JWT_SECRET_KEY = "gfg_jwt_secret_key";
const TOKEN_KEY = "gfg_token_header_key";


function generate_policy_number() {
  // Generate a random number between 0 and 1, multiply by the range, then add the minimum value
  const min = 100000000000;
  const max = 999999999999;
  const policy_number = Math.floor(Math.random() * (max - min + 1)) + min;
  return policy_number;
}



//create user signup api
const User_SignUp = async (req, res) => {
  try {
    const {
      civilId,
      fcmId,
      first_name,
      family_name,
      country_code,
      mobile_no,
      email,
      gender,
      password,
      confirm_password,
      date_of_birth,
    } = req.body;

    if (
      !civilId ||
      !fcmId ||
      !mobile_no ||
      !email ||
      !password ||
      !confirm_password
    ) {
      return res.status(400).json({
        result: "false",
        msg: "parameter required civilId ,fcmId ,first_name,family_name,country_code, mobile_no,email, gender,password,confirm_password,date_of_birth",
      });
    }

    const user = await userModel.findOne({ civilId: civilId });
    if (user) {
      return res.status(400).json({
        result: "false",
        msg: "civilId already registered, please enter new civilId..",
      });
    }

    const otp = Math.floor(1000 + Math.random() * 9000);
    //convert password in hash
    const hashPassword = await bcrypt.hash(password, 10);
    const user_register = new userModel({
      civilId,
      fcmId,
      first_name,
      family_name,
      country_code,
      mobile_no,
      email,
      gender,
      password: hashPassword,
      date_of_birth,
      otp,
    });
    const user_data = await user_register.save();

    const token = jwt.sign(
      { _id: user_data._id, civilId: user_data.civilId },
      TOKEN_KEY,
      { expiresIn: "730d" }
    );

    res.status(200).json({
      result: "true",
      msg: "user register successfully..",
      data: user_data,
      token: token,
    });
  } catch (error) {
    console.log(error.message);
  }
};


//create verify otp api
const Verify_Otp = async (req, res) => {
  const { userId, otp } = req.body;

  try {
    if (userId && otp) {
      if (mongoose.Types.ObjectId.isValid(userId)) {
        const user_data = await userModel.findOne({ _id: userId, otp: otp });

        if (user_data) {
          res.status(200).json({
            result: "true",
            msg: "otp verify successfully..",
            data: user_data,
          });
        } else {
          res.status(400).json({
            result: "false",
            msg: "invalid otp please enter valid otp..",
          });
        }
      } else {
        res.status(400).json({
          result: "false",
          msg: "Invalid ObjectId for userId parameter.",
        });
      }
    } else {
      res.status(400).json({
        result: "false",
        msg: "parameter required userId & otp..",
      });
    }
  } catch (error) {
    res.status(400).json({
      result: "false",
      msg: error.msg,
    });
  }
};



const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res
        .status(400)
        .json({ result: "false", message: "userId is required" });
    }

    const data = await userModel.findOne({ _id: userId });
    if (!data || data.length === 0) {
      return res
        .status(400)
        .json({ result: "false", message: "Record not found" });
    }
    res.status(200).json({
      result: "true",
      message: "Get user profile data sucessfully",
      data: data,
    });
  } catch (err) {
    res.status(400).json({ result: "false", message: err.message });
  }
};

//create user login api
const User_Login = async (req, res) => {
  const { email, password, fcmId } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        result: "false",
        msg: "parameter required email &  password,fcmId",
      });
    }

    const user = await userModel.findOne({
      email: email,
    });
    console.log(user);
    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res.status(400).json({
        result: "false",
        msg: "email & password invalid please enter valid email & password..",
      });
    }

    const userId = user._id;
    const otp = Math.floor(1000 + Math.random() * 9000);
    const token = jwt.sign(
      { userId: user._id, civilId: user.civilId },
      TOKEN_KEY,
      {
        expiresIn: "730d",
      }
    );
    const user_data = await userModel.findOneAndUpdate(
      { _id: userId },
      { $set: { otp, fcmId } },
      { new: true }
    );

    res.status(200).json({
      result: "true",
      msg: "user login successfully..",
      data: user_data,
      token: token,
    });
  } catch (error) {
    res.status(400).json({ result: "false", message: error.message });
  }
};


//create resend otp api
const Resend_Otp = async (req, res) => {
  const { userId } = req.body;
  try {
    if (userId) {
      const user = await userModel.findById({ _id: userId });

      if (user) {
        const otp = Math.floor(1000 + Math.random() * 9000);
        //const token = jwt.sign({_id: user._id, mobile_no },TOKEN_KEY,{expiresIn: "1h",});
        const user_data = await userModel.findByIdAndUpdate(
          { _id: userId },
          { $set: { otp } },
          { new: true }
        );
        res.status(200).json({
          result: "true",
          msg: "otp resend successfully please verify..",
          data: user_data,
        });
      } else {
        res.status(400).json({
          result: "false",
          msg: "userId does not exist..",
        });
      }
    } else {
      res.status(400).json({
        result: "false",
        msg: "parameter required userId..",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};



//update user data  api
const Edit_User_Profile = async (req, res) => {
  try {
    const {
      userId,
      first_name,
      second_name,
      last_name,
      first_name_arabic,
      second_name_arabic,
      last_name_arabic,
      passport,
      civil_expiry_date,
      country_code,
      mobile_no,
      email,
      policy_start_date,
      gender,
      user_couple,
      nationality,
      occupation,
      language,
    } = req.body;

    if (!userId) {
      return res.status(400).json({
        result: "false",
        message:
          "Required fields is userId and optionals are first_name,second_name,last_name,first_name_arabic,second_name_arabic,last_name_arabic, passport, civilId,civil_expiry_date,country_code,mobile_no,email,policy_start_date,gender,user_couple, nationality,occupation,language,user_image ",
      });
    }

    const objects = {
      first_name,
      second_name,
      last_name,
      first_name_arabic,
      second_name_arabic,
      last_name_arabic,
      passport,
      civil_expiry_date,
      country_code,
      mobile_no,
      email,
      policy_start_date,
      gender,
      user_couple,
      nationality,
      occupation,
      language,
    };
    if (req.file) {
      objects.user_image = req.file.filename;
    }

    const user_data = await userModel.findOneAndUpdate(
      { _id: userId },
      { $set: objects },
      { new: true }
    );
    res.status(200).json({
      result: "true",
      msg: "user data update successfully..",
      data: user_data,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      result: "false",
      msg: error.message,
    });
  }
};



// Insert documents
const insertDocuments = async (req, res) => {
  try {
    const { userId, civilId, passport_no, passportFull_name, status } =
      req.body;

    if (!userId || !status) {
      return res.status(400).json({
        result: "false",
        message:
          "Required fields are userId,status and optionals are civilId,passport_no,passportFull_name,f_image,b_image",
      });
    }
    const { f_image, b_image } = req.files;

    if (status === "0") {
      const civil = {
        userId,
        civilId,
        status: 0,
        f_image: f_image ? f_image[0].filename : null,
        b_image: b_image ? b_image[0].filename : null,
      };
      const existData = await documentModel.findOne({ userId, status: 0 });
      if (existData) {
        const updatedData = await documentModel.findOneAndUpdate(
          { userId, status: 0 },
          civil,
          {
            new: true,
          }
        );
        res.status(200).json({
          result: "true",
          message: "Document updated sucessfully",
          data: updatedData,
        });
      } else {
        const insertData = new documentModel(civil);
        const data = await insertData.save();
        res.status(200).json({
          result: "true",
          message: "Document inserted sucessfully",
          data: data,
        });
      }
    } else {
      const passports = {
        userId,
        passport_no,
        status: 1,
        passportFull_name,
        f_image: f_image ? f_image[0].filename : null,
        b_image: b_image ? b_image[0].filename : null,
      };

      const existData = await documentModel.findOne({ userId, status: 1 });
      if (existData) {
        const updatedData = await documentModel.findOneAndUpdate(
          { userId, status: 1 },
          passports,
          {
            new: true,
          }
        );
        res.status(200).json({
          result: "true",
          message: "Document updated sucessfully",
          data: updatedData,
        });
      } else {
        const insertData = new documentModel(passports);
        const data = await insertData.save();
        res.status(200).json({
          result: "true",
          message: "Document inserted sucessfully",
          data: data,
        });
      }
    }
  } catch (err) {
    res.status(400).json({ result: "false", message: err.message });
  }
};


const documentLists = async (req, res) => {
  try {
    const { userId, status } = req.body;

    if (!userId || !status) {
      return res.status(400).json({
        result: "false",
        message:
          "Required fields are userId,status(0 for civil and 1 for passport)",
      });
    }
    if (status === "0") {
      const existData = await documentModel.findOne({ userId, status: 0 });
      if (!existData) {
        return res
          .status(400)
          .json({ result: "false", message: "Record not found" });
      }
      res.status(200).json({
        result: "true",
        message: "Document got sucessfully",
        data: existData,
      });
    } else {
      const existData = await documentModel.findOne({ userId, status: 1 });
      if (!existData) {
        return res
          .status(400)
          .json({ result: "false", message: "Record not found" });
      }

      res.status(200).json({
        result: "true",
        message: "Document got sucessfully",
        data: existData,
      });
    }
  } catch (err) {
    res.status(400).json({ result: "false", message: err.message });
  }
};



// insertAddress api
const insertAddress=async(req,res)=>{
  try{
    const {userId,governorate,po_box_no,paci_no,building_no,street,jada_building,area}=req.body;
    if(!userId){
      return res.status(400).json({result:"false","message":"Required fields are userId,governorate,po_box_no,paci_no,building_no,street,jada_building,area "})
    }
    const existData=await addressModel.findOne({userId});
    if(existData){
    const updatedData=await  addressModel.findOneAndUpdate({userId},{
      governorate,po_box_no,paci_no,building_no,street,jada_building,area
    },{new:true});
    res.status(200).json({result:"true","message":"Address updated sucessfullly",data:updatedData})
  }
    const insertData=new  addressModel({userId,governorate,po_box_no,paci_no,building_no,street,jada_building,area})
     const data =await insertData.save();
     res.status(200).json({result:"true","message":"Address inserted sucessfullly",data:data})
  }catch(err){
    res.status(400).json({result:'false',message:err.message});
  }
}



// get user address list
const getUserAddressList=async(req,res)=>{
  try{
    const {userId}=req.body;
    if(!userId){
      return res.status(400).json({result:"false","message":"Required fields are userId"})
    }
    const finddata=await  addressModel.findOne({userId})
     if(!finddata){
      return res.status(400).json({result:"false","message":"record does not found"})
     }
     res.status(200).json({result:"true","message":"Address list got sucessfullly",data:finddata})
  }catch(err){
    res.status(400).json({result:"false",message:err.message});
  }

};



//corporate Communication
const corporateCommunication=async(req,res)=>{
  try{
    const {userId,purpose,email,mobile,message}=req.body;
    if(!userId){
      return res.status(400).json({result:"false",message:"Required fields are userId,purpose,email,mobile,message "})
    }
    const insertData=new communicationModel({userId,purpose,email,mobile,message});
    const data=await insertData.save();
    res.status(200).json({result:"true","message":"Your query sent sucessfully",data:data})

  }catch(err){
    res.status(400).json({result:"false",message:err.message});
  }

};



const tameenikNewsLists=async(req,res)=>{
  try{
    const newsList=await tameenikNewModel.find({}).sort({_id:-1});
    if(!newsList){
    return  res.status(400).json({result:"false","message":"Record not found"})
    }
    res.status(200).json({result:"true","message":"News list got sucessfully",data:newsList})

  }catch(err){
    res.status(400).json({result:"false",message:err.message});
  }
  
}

const contact_usList=async(req,res)=>{
  try{
    const contactList=await contactUsModel.find({});
    if(!contactList || contactList.length===0){
     return res.status(400).json({result:"false","message":"Record not found"})
    }
    res.status(200).json({result:"true","message":"Contact us list  got sucessfully",data:contactList})

  }catch(err){
    res.status(400).json({result:"false",message:err.message});
  }
  
}


const insertFaimlyInformation=async(req,res)=>{
  try{
    const {userId,firstName,secondName,lastName,civilId,dob,passport_no,passportFullName,passport_ex_date}=req.body;
    if(!userId){
      return res.status(400).json({result:"false","message":"Required fields are userId,firstName,secondName,lastName,civilId,dob,passport_no,passportFullName,passport_ex_date "})
    }
    const existData=await faimlyInformationModel.findOne({userId,civilId});
    if(existData){
    res.status(400).json({result:"false","message":"This civilId is allready exist"})
  }
    const insertData=new  faimlyInformationModel({userId,firstName,secondName,lastName,civilId,dob,passport_no,passportFullName,passport_ex_date})
     const data =await insertData.save();
     res.status(200).json({result:"true","message":"Faimly information  inserted sucessfullly",data:data})
  }catch(err){
    res.status(400).json({result:'false',message:err.message});
  }

};



const getFaimlyInformationList=async(req,res)=>{
  try{
    const {userId}=req.body;
    if(!userId){
      return res.status(400).json({result:"false","message":"Required fields are userId "})
    }
    const existData=await faimlyInformationModel.find({userId});
    if(!existData || existData.length===0){
    return res.status(400).json({result:"false","message":"Record not found"})
  }
    
     res.status(200).json({result:"true","message":"Faimly information  list got  sucessfullly",data:existData})
  }catch(err){
    res.status(400).json({result:'false',message:err.message});
  }

};



const deleteFaimlyInformation=async(req,res)=>{
  try{
    const {userId,id}=req.body;
    if(!userId || !id){
      return res.status(400).json({result:"false","message":"Required fields are userId,id"})
    }
    const existData=await faimlyInformationModel.findOneAndDelete({userId,_id:id});
     res.status(200).json({result:"true","message":"Faimly information  deleted sucessfullly"})
  }catch(err){
    res.status(400).json({result:'false',message:err.message});
  }

};





const rewardList=async(req,res)=>{
  try{
    const rewardData=await rewardModel.find({});
    if(!rewardData || rewardData.length===0){
    return res.status(400).json({result:"false","message":"Record not found"})
  }
    
     res.status(200).json({result:"true","message":"Faimly information  list got  sucessfullly",data:rewardData})
  }catch(err){
    res.status(400).json({result:'false',message:err.message});
  }

};




const insertTravelInformation=async(req,res)=>{
  try{
    const {userId,
      planId,
      policy_start_date,
      policy_exp_date,
      duration,
      policy_fee,
      submission_fee,
      policyPremium_total,
      insuranceType,
      dependent,
      start_date,
      passengerType,
      firstName,
      secondName,
      lastName,
      civilId,
      dob,
      passport_no,
      passportFullName,
      passport_ex_date,
    }=req.body;
    if(!userId){
      return res.status(400).json({result:"false","message":"Required fields are userId,firstName,secondName,lastName,start_date,passengerType,civilId,dob,passport_no,passportFullName,passport_ex_date,planId,policy_start_date,policy_exp_date,duration, policy_fee, submission_fee, policyPremium_total,insuranceType, dependent "})
    }
  

     // Parse dependents if they are provided as a JSON string
     let dependents;
     if (typeof dependent === 'string') {
         try {
             dependents = JSON.parse(dependent);
         } catch (error) {
             return res.status(400).json({ result: "false", message: "Invalid JSON in dependent field" });
         }
     } else {
         dependents = dependent;
     }


     const policy_number=generate_policy_number();
     
    const insertData=new  travelInformationModel({
      userId,
      planId,
      policy_start_date,
      policy_exp_date,
      duration,
      policy_fee,
      submission_fee,
      policyPremium_total,
      insuranceType,
      dependent,
      start_date,
      passengerType,
      firstName,
      secondName,
      lastName,
      civilId,
      dob,
      passport_no,
      passportFullName,
      passport_ex_date,
      policy_number,
      
    });
     const data =await insertData.save();
     res.status(200).json({result:"true","message":"Travel information  inserted sucessfullly",data:data})
  }catch(err){
    res.status(400).json({result:'false',message:err.message});
  }

};






//create change password api
const Change_Password = async (req, res) => {
  const { userId, civilId, old_password, new_password, confirm_password } =
    req.body;
  try {
    if (!userId || !civilId || !old_password || !new_password || !confirm_password) {
      
     return res.status(400).json({
        result: "false",
        msg: "parameter required userId, civilId, old_password, new_password & confirm_password..",
      });
    }
    const user_data = await userModel.findOne({
      _id: userId,
      civilId: civilId,
     
    });
    const comparePassword=await bcrypt.compare(old_password,user_data.password);
    if(!comparePassword){
      return res.status(400).json({
        result: "false",
        msg: "invalid userId, civilId & password..",
      });
    }

    if(new_password !== confirm_password){
      return res.status(400).json({
        result: "false",
        msg: "newPassword and confirmPassword does not match",
      });
    }
    

      const hashPassword=await bcrypt.hash(new_password,10);
        await userModel.findOneAndUpdate(
          { _id: userId, civilId: civilId },
          {
            $set: {
              password: hashPassword,
            },
          },
          { new: true }
        );
        res.status(200).json({
          result: "true",
          msg: "user password change successfully..",
        });
   
  } catch (error) {
    res.status(400).json({
      result: "false",
      message:error.message,
    });
  }
};






const addLifeInsurance=async(req,res)=>{
  try{
    const {
      userId,
insuranceType,
subType,
firstName,
middleName,
lastName,
mobile,
email,
occupation,
pulicy_number,
gender,
dob,
sociel_securityId,
address,
city,
area,
work_address,
status,
planId,
policy_start_date,
policy_duration,
policy_ex_date,
policy_fee,
policy_submission_fee,
policy_premium_total,
    }=req.body;
    

    const images=req.files;
    console.log(images)
   let imageItem;
   if(images){
   imageItem=images.map(file => file.filename)
  }
  const policy_number=generate_policy_number();
    const insertData=new  lifeInsurance({
      userId,
      insuranceType,
      subType,
      firstName,
      middleName,
      lastName,
      mobile,
      email,
      occupation,
      pulicy_number,
      gender,
      dob,
      sociel_securityId,
      address,
      city,
      area,
      work_address,
      status,
      planId,
      policy_start_date,
      policy_number,
      policy_duration,
      policy_ex_date,
      policy_fee,
      policy_submission_fee,
      policy_premium_total,
      images:imageItem,
      
    });

     const data =await insertData.save();
     res.status(200).json({result:"true","message":"Life insurance data inserted sucessfullly",data:data})
  }catch(err){
    res.status(400).json({result:'false',message:err.message});
  }

};




//create forgot password api
const Forgot_Password = async (req, res) => {
  const { email } = req.body;
  try {
    if (email) {
      const user_data = await userModel.findOne({ email: email });

      if (user_data) {
        function generatePassword() {
          var length = 8,
            charset =
              "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
          for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
          }
          return retVal;
        }
        var password = generatePassword();
        const userId = user_data._id;
        const userData = await userModel.findByIdAndUpdate(
          { _id: userId },
          { $set: { password: password, confirm_password: password } },
          { new: true }
        );
        res.status(200).json({
          result: "true",
          msg: "user password send successfully in your email..",
          data: {
            userId: userData._id,
            email: userData.email,
            password: userData.password,
          },
        });
      } else {
        res.status(400).json({
          result: "false",
          msg: "email does not exist..",
        });
      }
    } else {
      res.status(400).json({
        result: "false",
        msg: "parameter required email..",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};


// create privacy policy api
const Privacy_Policy = async (req, res) => {
  try {
    const result = await privacyPolicyModel.find({});
    if (!result || result.length == 0) {
      res.status(400).json({
        result: "false",
        msg: "record not found..",
      });
    } else {
      res.status(200).json({
        result: "true",
        msg: "data get successfully..",
        data: result,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

// create terms and condition api
const Terms_Condition = async (req, res) => {
  try {
    const result = await termsConditionModel.find({});
    if (!result || result.length == 0) {
      res.status(400).json({
        result: "false",
        msg: "record not found..",
      });
    } else {
      res.status(200).json({
        result: "true",
        msg: "data get successfully..",
        data: result,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

// create about us api
const About_Us = async (req, res) => {
  try {
    const result = await aboutUsModel.find({});
    if (!result || result.length == 0) {
      res.status(400).json({
        result: "false",
        msg: "record not found..",
      });
    } else {
      res.status(200).json({
        result: "true",
        msg: "data get successfully..",
        data: result,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

// create contact us api
const Contact_Us = async (req, res) => {
  try {
    const result = await contactUsModel.find({});
    if (!result || result.length == 0) {
      res.status(400).json({
        result: "false",
        msg: "record not found..",
      });
    } else {
      res.status(200).json({
        result: "true",
        msg: "data get successfully..",
        data: result,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

// create policy category list api
const Policy_Category_List = async (req, res) => {
  try {
    const result = await policyCategoryModel.find({});
    if (!result || result.length == 0) {
      res.status(400).json({
        result: "false",
        msg: "record not found..",
      });
    } else {
      const data = result.map((item) => ({
        categoryId: item._id,
        category_name: item.category_name,
        category_image: item.category_image,
        description: item.description,
        category_status: item.category_status,
      }));
      res.status(200).json({
        result: "true",
        msg: "policy category data get successfully..",
        data: data,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};




// create policy category list api
const buyProperty_api = async (req, res) => {
  try {
    const {
      userId,
      policy_duration,
      policy_ex_date,
      policy_fee,
      policy_submission_fee,
      policy_premium_total,
      homeType,
      no_of_floor,
      no_of_occupants,
      building_age,
      buildingName,
      no_of_bedroom,
      governorate,
      area,
      street,
      jadda_building,
      paci_no,
      po_box_no,
      building_no,
      qery,
      insuranceType,
      ownershipStatus,
      buldingValue,
      contentValue,
      mortgage,
      specificBank,
      policy_start_date,
      firstName,
      secondName,
      lastName,
      firstName_arebi,
      secondName_arebi,
      lastName_arebi,
      civilId,
      dob,
      passportFullName,
      passport_no,
      passport_ex_date,
      addcontent_value,
    }=req.body;

   if(!userId){
    return res.status(400).json({result:"false",message:"Required parameters are userId,policy_duration, policy_ex_date,contentValue, policy_fee,policy_submission_fee, policy_premium_total,homeType,no_of_floor,no_of_occupants, building_age,no_of_bedroom,governorate, area, street,jadda_building, paci_no,po_box_no,building_no,buildingName, qery,insuranceType, ownershipStatus,buldingValue, mortgage,specificBank,policy_start_date,addcontent_value, firstName,secondName,lastName,firstName_arebi,secondName_arebi, lastName_arebi,civilId,dob,passportFullName,passport_no, passport_ex_date"})
   }
   
   // Parse dependents if they are provided as a JSON string
   let addcontents;
   if (typeof addcontent_value === 'string') {
       try {
        addcontents = JSON.parse(addcontent_value);
       } catch (error) {
           return res.status(400).json({ result: "false", message: "Invalid JSON in dependent field" });
       }
   } else {
    addcontents = addcontent_value;
   }

const pulicy_no=generate_policy_number();

   const insertData=new buyProperty({
      userId,
      policy_duration,
      policy_ex_date,
      policy_fee,
      policy_submission_fee,
      policy_premium_total,
      homeType,
      no_of_floor,
      no_of_occupants,
      building_age,
      no_of_bedroom,
      governorate,
      area,
      street,
      jadda_building,
      paci_no,
      po_box_no,
      building_no,
      qery,
      insuranceType,
      ownershipStatus,
      buldingValue,
      contentValue,
      mortgage,
      specificBank,
      policy_start_date,
      firstName,
      secondName,
      lastName,
      firstName_arebi,
      secondName_arebi,
      lastName_arebi,
      civilId,
      dob,
      passportFullName,
      passport_no,
      passport_ex_date,
      buildingName,
      addcontent_value:addcontents,
      policy_number:pulicy_no,

   });
   const data=await insertData.save();
   res.status(200).json({result:"true","message":"Data inserted sucessfully",data:data})

  } catch (error) {
    console.log(error.message);
    res.status(500).json({result:"false",message:error.message})
  }
};




// create policy category list api
const buyMedicalInsurance_api = async (req, res) => {
  try {
    const {
      userId,
      medicalInsuranceType,
      insuranceType,
      civilId,
      gender,
      dependent,
      planId,
      policy_start_date,
      policy_duration,
      policy_ex_date,
      policy_fee,
      policy_submission_fee,
      policy_premium_total,
      firstName,
      secondName,
      lastName,
      firstName_arebi,
      secondName_arebi,
      lastName_arebi,
      civilId1,
      dob,
      passportFullName,
      passport_no,
      passport_ex_date,
    }=req.body;

   if(!userId){
    return res.status(400).json({result:"false",message:"Required parameters are userId,medicalInsuranceType,civilId,gender,planId,policy_duration, policy_ex_date, policy_fee,policy_submission_fee, policy_premium_total,insuranceType,dependent ,policy_start_date, firstName,secondName,lastName,firstName_arebi,secondName_arebi, lastName_arebi,civilId1,dob,passportFullName,passport_no, passport_ex_date"})
   }


     // Parse dependents if they are provided as a JSON string
     let dependents;
     if (typeof dependent === 'string') {
         try {
             dependents = JSON.parse(dependent);
         } catch (error) {
             return res.status(400).json({ result: "false", message: "Invalid JSON in dependent field" });
         }
     } else {
         dependents = dependent;
     }



   const insertData=new buyMedicalInsurance({
    userId,
    medicalInsuranceType,
    insuranceType,
    civilId,
    gender,
    dependent:dependents,
    planId,
    policy_start_date,
    policy_duration,
    policy_ex_date,
    policy_fee,
    policy_submission_fee,
    policy_premium_total,
    firstName,
    secondName,
    lastName,
    firstName_arebi,
    secondName_arebi,
    lastName_arebi,
    civilId1,
    dob,
    passportFullName,
    passport_no,
    passport_ex_date,

   });
   const data=await insertData.save();
   res.status(200).json({result:"true","message":"Data inserted sucessfully",data:data})

  } catch (error) {
    console.log(error.message);
    res.status(500).json({result:"false",message:error.message})
  }
};




const Plan_list=async(req,res)=>{
  try{
    const {category_type}=req.body;
    if(!category_type){
      return res.status(400).json({result:"false",message:"category_type  field is required"})
    }
    const medicalPlanlist=await planModel.find({category_type});
    if(!medicalPlanlist || medicalPlanlist.length===0){
      return res.status(400).json({result:"false",message:"Record does not found"})
    }
    res.status(200).json({result:"true",message:"Data get sucessfully",data:medicalPlanlist});

  }catch(err){
    res.status(500).json({result:"false",message:err.message})
  }

};



// create policy category list api
const buyProperty_list = async (req, res) => {
  try {
    const {
      userId,
      propertyId,
     
    }=req.body;

   if(!userId){
    return res.status(400).json({result:"false",message:"Required parameters are userId,propertyId"})
   }
   
   const getData=await buyProperty.findOne({userId,_id:propertyId}).populate('userId');
   if(!getData || getData.length===0){
    return res.status(400).json({result:"false",message:"Record not found"})
   }
   res.status(200).json({result:"true","message":"Data get sucessfully",data:getData})

  } catch (error) {
    console.log(error.message);
    res.status(500).json({result:"false",message:error.message})
  }
};


const numberList=async(req,res)=>{
  const num=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40]
  res.status(200).json({result:"true",message:"number list got sucessfully",data:num})
}


const homeType_list=async(req,res)=>{
  try {
    
   
   const getData=await homeTypeModel.find({});
   if(!getData || getData.length===0){
    return res.status(400).json({result:"false",message:"Record not found"})
   }
   res.status(200).json({result:"true","message":"Data get sucessfully",data:getData})

  } catch (error) {
    console.log(error.message);
    res.status(500).json({result:"false",message:error.message})
  }

};



const governorate_list=async(req,res)=>{
  try {
    
   
   const getData=await governorateModel.find({});
   if(!getData || getData.length===0){
    return res.status(400).json({result:"false",message:"Record not found"})
   }
   res.status(200).json({result:"true","message":"Data get sucessfully",data:getData})

  } catch (error) {
    console.log(error.message);
    res.status(500).json({result:"false",message:error.message})
  }

};




const premium_list=async(req,res)=>{
  try {

    const {premium_type,sub_premium_type}=req.body;
    if(!premium_type || !sub_premium_type){
      return res.status(400).json({result:false,message:"required fields are premium_type,sub_premium_type"})
    }
    
   
   const getData=await premiumModel.findOne({premium_type,sub_premium_type });
   if(!getData || getData.length===0){
    return res.status(400).json({result:"false",message:"Record not found"})
   }
   res.status(200).json({result:"true","message":"Data get sucessfully",data:getData})

  } catch (error) {
    console.log(error.message);
    res.status(500).json({result:"false",message:error.message})
  }

};



const aboutInsurance_list=async(req,res)=>{
  try {
    const {insuranceType,insuranceSubType}=req.body;
    if(!insuranceType || !insuranceSubType){
      return res.status(400).json({result:false,message:"required fields are insuranceType,insuranceSubType"})
    }
   
   const getData=await aboutInsuranceModel.findOne({insuranceType,insuranceSubType});
   if(!getData || getData.length===0){
    return res.status(400).json({result:"false",message:"Record not found"})
   }
   res.status(200).json({result:"true","message":"Data get sucessfully",data:getData})

  } catch (error) {
    console.log(error.message);
    res.status(500).json({result:"false",message:error.message})
  }

};



const benefitsOfInsurance_list=async(req,res)=>{
  try {
    const {insuranceType,insuranceSubType}=req.body;
    if(!insuranceType || !insuranceSubType){
      return res.status(400).json({result:false,message:"required fields are insuranceType,insuranceSubType"})
    }
   
   const getData=await benefitInsuranceModel.find({insuranceType,insuranceSubType});
   if(!getData || getData.length===0){
    return res.status(400).json({result:"false",message:"Record not found"})
   }
   res.status(200).json({result:"true","message":"Data get sucessfully",data:getData})

  } catch (error) {
    console.log(error.message);
    res.status(500).json({result:"false",message:error.message})
  }

};






// create policy category list api
const buyMarineInsurance = async (req, res) => {
  try {
    const {
      userId,
insuranceType,
registration_no,
boat_no,
boat_length,
boat_width,
boat_depth,
gross_tonnage,
deadweight_tonnage,
powerOf_engine,
passenger_capacity,
materialOf_hull,
place_built,
no_of_engine,
model_year,
start_date,
engine_number,
policy_period,
policy_start_date,
policy_end_date,
usage,
manufacturer,
model,
vesselType,
planId,
policy_exp_date,
duration,
policy_fee,
submission_fee,
policyPremium_total,
    }=req.body;

   if(!userId){
    return res.status(400).json({result:"false",message:"Required parameters are userId,insuranceType,start_date,registration_no,boat_no,boat_length,boat_width,boat_depth,gross_tonnage,deadweight_tonnage,powerOf_engine,passenger_capacity,materialOf_hull,place_built,no_of_engine,model_year,engine_number,policy_period,policy_start_date,policy_end_date,usage,manufacturer,model,vesselType,planId,policy_exp_date,duration,policy_fee,submission_fee,policyPremium_total,"})
   }


   const pulicy_no=generate_policy_number();
const insertData=new marineInsuranceModel({
  userId,
  insuranceType,
  registration_no,
  boat_no,
  boat_length,
  boat_width,
  boat_depth,
  gross_tonnage,
  deadweight_tonnage,
  powerOf_engine,
  passenger_capacity,
  materialOf_hull,
  place_built,
  no_of_engine,
  model_year,
  engine_number,
  policy_period,
  policy_start_date,
  policy_end_date,
  usage,
  manufacturer,
  model,
  vesselType,
  planId,
  policy_exp_date,
  duration,
  policy_fee,
  submission_fee,
  policyPremium_total,
  start_date,
  pulicy_number:pulicy_no,

   });
   const data=await insertData.save();
   res.status(200).json({result:"true","message":"Data inserted sucessfully",data:data})

  } catch (error) {
    console.log(error.message);
    res.status(500).json({result:"false",message:error.message})
  }
};




// create policy category list api
const buyMotorInsurance = async (req, res) => {
  try {
    const {
      userId,
insuranceType,
insurance_subType,
plate_no,
chassis_no,
type,
shape,
seating_capacity,
model_year,
start_date,
policy_period,
policy_start_date,
policy_end_date,
usage,
manufacturer,
model,
planId,
policy_exp_date,
duration,
policy_fee,
submission_fee,
policyPremium_total,
fuelType,
primary_color,
secondary_color,

    }=req.body;

   if(!userId){
    return res.status(400).json({result:"false",message:"Required parameters are userId,insuranceType,insurance_subType,plate_no,chassis_no,type,shape,seating_capacity,model_year,start_date,policy_period,policy_start_date,policy_end_date,usage,manufacturer,model,planId,policy_exp_date,duration,policy_fee,submission_fee,policyPremium_total,fuelType,primary_color,secondary_color"})
   }


const policy_number=generate_policy_number() ;
const insertData=new motorInsuranceModel({
  userId,
insuranceType,
insurance_subType,
plate_no,
chassis_no,
type,
shape,
seating_capacity,
model_year,
start_date,
policy_period,
policy_start_date,
policy_end_date,
usage,
manufacturer,
model,
planId,
policy_exp_date,
duration,
policy_fee,
submission_fee,
policyPremium_total,
fuelType,
primary_color,
secondary_color,
policy_number,

   });
   const data=await insertData.save();
   res.status(200).json({result:"true","message":"Data inserted sucessfully",data:data})

  } catch (error) {
    console.log(error.message);
    res.status(500).json({result:"false",message:error.message})
  }
};





// create policy category list api
const MotorInsurance_getByuserId = async (req, res) => {
  try {
    const {userId}=req.body;

   if(!userId){
    return res.status(400).json({result:"false",message:"Required parameters are userId"})
   }

const getData=await motorInsuranceModel.find({userId}).populate('planId').sort({_id:-1});
if(!getData){
  return res.status(400).json({result:"false","message":"Data not found"})

}
   res.status(200).json({result:"true","message":"Data got sucessfully",data:getData})

  } catch (error) {
    console.log(error.message);
    res.status(500).json({result:"false",message:error.message})
  }
};



const medicalInsurance_getByuserId = async (req, res) => {
  try {
    const {userId}=req.body;

   if(!userId){
    return res.status(400).json({result:"false",message:"Required parameters are userId"})
   }

const getData=await buyMedicalInsurance.find({userId}).populate('planId').sort({ _id: -1 });
if(!getData){
  return res.status(400).json({result:"false","message":"Data not found"})

}
   res.status(200).json({result:"true","message":"Data got sucessfully",data:getData})

  } catch (error) {
    console.log(error.message);
    res.status(500).json({result:"false",message:error.message})
  }
};



const marineInsurance_getByuserId = async (req, res) => {
  try {
    const {userId}=req.body;

   if(!userId){
    return res.status(400).json({result:"false",message:"Required parameters are userId"})
   }

const getData=await marineInsuranceModel.find({userId}).sort({_id:-1});
if(!getData){
  return res.status(400).json({result:"false","message":"Data not found"})

}
   res.status(200).json({result:"true","message":"Data got sucessfully",data:getData})

  } catch (error) {
    console.log(error.message);
    res.status(500).json({result:"false",message:error.message})
  }
};



const lifeInsurance_getByuserId = async (req, res) => {
  try {
    const {userId}=req.body;

   if(!userId){
    return res.status(400).json({result:"false",message:"Required parameters are userId"})
   }

const getData=await lifeInsurance.find({userId}).sort({_id:-1});
if(!getData){
  return res.status(400).json({result:"false","message":"Data not found"})

}
   res.status(200).json({result:"true","message":"Data got sucessfully",data:getData})

  } catch (error) {
    console.log(error.message);
    res.status(500).json({result:"false",message:error.message})
  }
};



const travelInsurance_getByuserId = async (req, res) => {
  try {
    const {userId}=req.body;

   if(!userId){
    return res.status(400).json({result:"false",message:"Required parameters are userId"})
   }

const getData=await travelInformationModel.find({userId}).populate('planId').sort({_id:-1});
if(!getData){
  return res.status(400).json({result:"false","message":"Data not found"})

}
   res.status(200).json({result:"true","message":"Data got sucessfully",data:getData})

  } catch (error) {
    console.log(error.message);
    res.status(500).json({result:"false",message:error.message})
  }
};



const buildingInsurance_getByuserId = async (req, res) => {
  try {
    const {userId}=req.body;

   if(!userId){
    return res.status(400).json({result:"false",message:"Required parameters are userId"})
   }

const getData=await buyProperty.find({userId}).sort({_id:-1});
if(!getData){
  return res.status(400).json({result:"false","message":"Data not found"})

}
   res.status(200).json({result:"true","message":"Data got sucessfully",data:getData})

  } catch (error) {
    console.log(error.message);
    res.status(500).json({result:"false",message:error.message})
  }
};



const faqList= async (req, res) => {
  try {
   

const getData=await faqModel.find({});
if(!getData){
  return res.status(400).json({result:"false","message":"Data not found"})

}
   res.status(200).json({result:"true","message":"Data got sucessfully",data:getData})

  } catch (error) {
    console.log(error.message);
    res.status(500).json({result:"false",message:error.message})
  }
};



const findMotorPolicy = async (req, res) => {
  try {
    const {userId,policy_number,chassis_no,plate_no}=req.body;

   if(!userId || !policy_number){
    return res.status(400).json({result:"false",message:"Required parameters are userId,policy_number,chassis_no,plate_no"})
   }

const getData=await motorInsuranceModel.findOne({userId,policy_number,plate_no});
if(!getData){
  return res.status(400).json({result:"false","message":"Data not found"})

}
   res.status(200).json({result:"true","message":"Data got sucessfully",data:getData})

  } catch (error) {
    console.log(error.message);
    res.status(500).json({result:"false",message:error.message})
  }
};



const motorClaim_request = async (req, res) => {
  try {
    const {
      userId,
      insuranceId,
      date,
      time,
      eventType,
      address,
      city,
      area,
      landmark,
      description,
      accName,
      accNumber,
      ifsc_code,
      
    }=req.body;
    
    

   if(!userId || !insuranceId){
    return res.status(400).json({result:"false",message:"Required parameters are userId,insuranceId,date,time,eventType,address,city,area,landmark,description,accName,accNumber,ifsc_code,images"})
   }

   const images=req.files;
   if(!req.files || images.length===0){
    return res.status(400).json({result:"false",message:"Images are not uploaded"})
  }
  const filess=images.map(file => file.filename)
 

const insertData= new motorClaimRequestModel({
  userId,
  insuranceId,
  date,
  time,
  eventType,
  address,
  city,
  area,
  landmark,
  description,
  accName,
  accNumber,
  ifsc_code,
  images:filess,
});
const data=await insertData.save();

   res.status(200).json({result:"true","message":"Claim request sent sucessfully",data:data})

  } catch (error) {
    console.log(error.message);
    res.status(500).json({result:"false",message:error.message})
  }
};




const findPropertyPolicy = async (req, res) => {
  try {
    const {userId,policy_number}=req.body;

   if(!userId || !policy_number){
    return res.status(400).json({result:"false",message:"Required parameters are userId,policy_number"})
   }

const getData=await buyProperty.findOne({userId,policy_number});
if(!getData){
  return res.status(400).json({result:"false","message":"Data not found"})

}
   res.status(200).json({result:"true","message":"Data got sucessfully",data:getData})

  } catch (error) {
    console.log(error.message);
    res.status(500).json({result:"false",message:error.message})
  }
};





const findMarinePolicy = async (req, res) => {
  try {
    const {userId,policy_number}=req.body;

   if(!userId || !policy_number){
    return res.status(400).json({result:"false",message:"Required parameters are userId,policy_number"})
   }

const getData=await marineInsuranceModel.findOne({userId,policy_number});
if(!getData){
  return res.status(400).json({result:"false","message":"Data not found"})

}
   res.status(200).json({result:"true","message":"Data got sucessfully",data:getData})

  } catch (error) {
    console.log(error.message);
    res.status(500).json({result:"false",message:error.message})
  }
};





const findTravelPolicy = async (req, res) => {
  try {
    const {userId,policy_number,civilId,mobile_no}=req.body;

   if(!userId || !policy_number){
    return res.status(400).json({result:"false",message:"Required parameters are userId,policy_number,civilId,mobile_no"})
   }

const getData=await travelInformationModel.findOne({userId,policy_number});
if(!getData){
  return res.status(400).json({result:"false","message":"Data not found"})

}
   res.status(200).json({result:"true","message":"Data got sucessfully",data:getData})

  } catch (error) {
    console.log(error.message);
    res.status(500).json({result:"false",message:error.message})
  }
};





const findMedicalPolicy = async (req, res) => {
  try {
    const {userId,policy_number}=req.body;

   if(!userId || !policy_number){
    return res.status(400).json({result:"false",message:"Required parameters are userId,policy_number"})
   }

const getData=await buyMedicalInsurance.findOne({userId,policy_number});
if(!getData){
  return res.status(400).json({result:"false","message":"Data not found"})

}
   res.status(200).json({result:"true","message":"Data got sucessfully",data:getData})

  } catch (error) {
    console.log(error.message);
    res.status(500).json({result:"false",message:error.message})
  }
};




const findLifePolicy = async (req, res) => {
  try {
    const {userId,policy_number}=req.body;

   if(!userId || !policy_number){
    return res.status(400).json({result:"false",message:"Required parameters are userId,policy_number"})
   }

const getData=await lifeInsurance.findOne({userId,policy_number});
if(!getData){
  return res.status(400).json({result:"false","message":"Data not found"})

}
   res.status(200).json({result:"true","message":"Data got sucessfully",data:getData})

  } catch (error) {
    console.log(error.message);
    res.status(500).json({result:"false",message:error.message})
  }
};




// API endpoint to create a new marine claim request
const marine_claim_requests= async (req, res) => {
  try {
    const {
      userId,insuranceId,accident_details,
      availablePersion_on_spot,description,
      estimatedLoss,eventType,bankDetails,
      witnessdetails,authority_details,
      voyage_details,custom_duty,
      affected_item_details,destination
    }= req.body;

    let affectedItem;
    let destinationItem;
    let bankItem;
    let accidentItem;
    let query ;
    let witnessItem;
    let authorityItem;
    let voyageItem;
    let dutyItem;

    if(affected_item_details){
     // Parse affected_item_details if it is a string
     if (typeof affected_item_details === 'string') {
      affectedItem = JSON.parse(affected_item_details);
     } else {
      affectedItem = affected_item_details; 
     }
    }

    if(destination){
      // Parse affected_item_details if it is a string
      if (typeof destination === 'string') {
        destinationItem = JSON.parse(destination);
      } else {
        destinationItem = destination; 
      }
     }

     if(bankDetails){
      // Parse affected_item_details if it is a string
      if (typeof bankDetails === 'string') {
        bankItem = JSON.parse(bankDetails);
      } else {
        bankItem = bankDetails; 
      }
     }

     if(accident_details){
      // Parse affected_item_details if it is a string
      if (typeof accident_details === 'string') {
        accidentItem = JSON.parse(accident_details);
      } else {
        accidentItem = accident_details; 
      }
     }

     if(availablePersion_on_spot){
      // Parse affected_item_details if it is a string
      if (typeof availablePersion_on_spot === 'string') {
        query = JSON.parse(availablePersion_on_spot);
      } else {
        query = availablePersion_on_spot; 
      }
     }

     if(witnessdetails){
      // Parse affected_item_details if it is a string
      if (typeof witnessdetails === 'string') {
        witnessItem = JSON.parse(witnessdetails);
      } else {
        witnessItem = witnessdetails; 
      }
     }


     if(authority_details){
      // Parse affected_item_details if it is a string
      if (typeof authority_details === 'string') {
        authorityItem = JSON.parse(authority_details);
      } else {
        authorityItem = authority_details; 
      }
     }

     if(voyage_details){
      // Parse affected_item_details if it is a string
      if (typeof voyage_details === 'string') {
        voyageItem = JSON.parse(voyage_details);
      } else {
        voyageItem = voyage_details; 
      }
     }


     if(custom_duty){
      // Parse affected_item_details if it is a string
      if (typeof custom_duty === 'string') {
        dutyItem = JSON.parse(custom_duty);
      } else {
        dutyItem = custom_duty; 
      }
     }

     
   const images=req.files;
   let imageItem;
   if(images){
   imageItem=images.map(file => file.filename)
  }
 
 
     

    const newClaimRequest = new marineClaimRequestModel({
      userId,insuranceId,
      accident_details:accidentItem,
      availablePersion_on_spot:query,
      description,estimatedLoss,eventType,
      bankDetails:bankItem,
      witnessdetails:witnessItem,
      authority_details:authorityItem,
      voyage_details:voyageItem,
      custom_duty:dutyItem,
      images:imageItem,
      affected_item_details:affectedItem,
      destination:destinationItem,
    });

   

    // Save the document to the database
    const savedRequest = await newClaimRequest.save();
    res.status(201).json({
      success: true,
      message: 'Marine claim request created successfully',
      data: savedRequest,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error creating marine claim request',
      error: error.message,
    });
  }
};





// API endpoint to create a new medical claim request
const medical_claim_requests=async (req, res) => {
  try {
    const {
      userId,
      insuranceId,
      treatment_expenses_details,
      billing_details,
      bankDetails,
      hospital_details
    }= req.body;

    let treatment_expensesList;
    let billing_details_list;
    let bankItem;
    let hospitaldetails;
   

    if(treatment_expenses_details){
     // Parse affected_item_details if it is a string
     if (typeof treatment_expenses_details === 'string') {
      treatment_expensesList = JSON.parse(treatment_expenses_details);
     } else {
      treatment_expensesList = treatment_expenses_details; 
     }
    }

    if(billing_details){
      // Parse affected_item_details if it is a string
      if (typeof billing_details === 'string') {
        billing_details_list = JSON.parse(billing_details);
      } else {
        billing_details_list = billing_details; 
      }
     }

     if(bankDetails){
      // Parse affected_item_details if it is a string
      if (typeof bankDetails === 'string') {
        bankItem = JSON.parse(bankDetails);
      } else {
        bankItem = bankDetails; 
      }
     }

     if(hospital_details){
      // Parse affected_item_details if it is a string
      if (typeof hospital_details === 'string') {
        hospitaldetails = JSON.parse(hospital_details);
      } else {
        hospitaldetails = hospital_details; 
      }
     }
     
   const receipt_image=req.files;
   let imageItem;
   if(receipt_image){
   imageItem=receipt_image.map(file => file.filename)
  }
 
     

    // Create a new MedicalClaimRequest document
    const newClaimRequest = new medicalClaimRequestModel({
      userId,
      insuranceId,
      treatment_expenses_details:treatment_expensesList,
      billing_details:billing_details_list,
      bankDetails:bankItem,
      hospital_details:hospitaldetails,
      receipt_image:imageItem
    });

    // Save the document to the database
    const savedRequest = await newClaimRequest.save();

    res.status(201).json({
      success: true,
      message: 'Medical claim request created successfully',
      data: savedRequest,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error creating medical claim request',
      error: error.message,
    });
  }
};




// API endpoint to create a new medical claim request
const property_claim_requests=async (req, res) => {
  try {
    const {
      userId,
      insuranceId,
      property_inforamtion,
      name,
      report_details,
      action_for_recover_loss_details,
      bankDetails,
      witnessdetails,
      damage_item_details
      
    }= req.body;

    let propertyInformation;
    let reportdetails;
    let bankItem;
    let witnessDetails;
    let damagedItem;
   

    if(property_inforamtion){
     // Parse affected_item_details if it is a string
     if (typeof property_inforamtion === 'string') {
      propertyInformation = JSON.parse(property_inforamtion);
     } else {
      propertyInformation = property_inforamtion; 
     }
    }

    if(report_details){
      // Parse affected_item_details if it is a string
      if (typeof report_details === 'string') {
        reportdetails = JSON.parse(report_details);
      } else {
        reportdetails = report_details; 
      }
     }

     if(bankDetails){
      // Parse affected_item_details if it is a string
      if (typeof bankDetails === 'string') {
        bankItem = JSON.parse(bankDetails);
      } else {
        bankItem = bankDetails; 
      }
     }

     if(witnessdetails){
      // Parse affected_item_details if it is a string
      if (typeof witnessdetails === 'string') {
        witnessDetails = JSON.parse(witnessdetails);
      } else {
        witnessDetails = witnessdetails; 
      }
     }

     if(damage_item_details){
      // Parse affected_item_details if it is a string
      if (typeof damage_item_details === 'string') {
        damagedItem = JSON.parse(damage_item_details);
      } else {
        damagedItem = damage_item_details; 
      }
     }

     
   const images=req.files;
   let imageItem;
   if(images){
   imageItem=images.map(file => file.filename)
  }
 
     

    // Create a new MedicalClaimRequest document
    const newClaimRequest = new propertyClaimRequestModel({
      userId,
      insuranceId,
      property_inforamtion:propertyInformation,
      name,
      report_details:reportdetails,
      action_for_recover_loss_details,
      bankDetails:bankItem,
      witnessdetails:witnessDetails,
      damage_item_details:damagedItem,
     images:imageItem
    });

    // Save the document to the database
    const savedRequest = await newClaimRequest.save();

    res.status(201).json({
      success: true,
      message: 'Property claim request created successfully',
      data: savedRequest,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error creating medical claim request',
      error: error.message,
    });
  }
};




// API endpoint to create a new medical claim request
const travel_claim_requests=async (req, res) => {
  try {
    const {
      userId,
      insuranceId,
      details_of_policy_holder,
      cause_of_incident,
      medical_information,
      consulting_physician,
      bankDetails,
      before_treatment_details,
      
      
    }= req.body;

    let policy_holderInformation;
    let medical_informations;
    let bankItem;
    let consulting_physicians;
    let before_treatment_detailss;
   

    if(details_of_policy_holder){
     // Parse affected_item_details if it is a string
     if (typeof details_of_policy_holder === 'string') {
      policy_holderInformation = JSON.parse(details_of_policy_holder);
     } else {
      policy_holderInformation = details_of_policy_holder; 
     }
    }

    if(medical_information){
      // Parse affected_item_details if it is a string
      if (typeof medical_information === 'string') {
        medical_informations = JSON.parse(medical_information);
      } else {
        medical_informations = medical_information; 
      }
     }

     if(bankDetails){
      // Parse affected_item_details if it is a string
      if (typeof bankDetails === 'string') {
        bankItem = JSON.parse(bankDetails);
      } else {
        bankItem = bankDetails; 
      }
     }

     if(consulting_physician){
      // Parse affected_item_details if it is a string
      if (typeof consulting_physician === 'string') {
        consulting_physicians = JSON.parse(consulting_physician);
      } else {
        consulting_physicians = consulting_physician; 
      }
     }

     if(before_treatment_details){
      // Parse affected_item_details if it is a string
      if (typeof before_treatment_details === 'string') {
        before_treatment_detailss = JSON.parse(before_treatment_details);
      } else {
        before_treatment_detailss = before_treatment_details; 
      }
     }

     
   const images=req.files;
   let imageItem;
   if(images){
   imageItem=images.map(file => file.filename)
  }
 
     

    // Create a new MedicalClaimRequest document
    const newClaimRequest = new travelClaimRequestModel({
      userId,
      insuranceId,
      details_of_policy_holder:policy_holderInformation,
      cause_of_incident,
      medical_information:medical_informations,
      consulting_physician:consulting_physicians,
      bankDetails:bankItem,
      before_treatment_details:before_treatment_detailss,
     images:imageItem
    });

    // Save the document to the database
    const savedRequest = await newClaimRequest.save();

    res.status(201).json({
      success: true,
      message: 'Travel claim request created successfully',
      data: savedRequest,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error creating medical claim request',
      error: error.message,
    });
  }
};




// API endpoint to create a new medical claim request
const lifeInsurance_claim_requests=async (req, res) => {
  try {
    const {
      userId,
      insuranceId,
      details_of_life_assured,
      employer_details,
      nature_of_illness_and_habits,
      details_of_claimant_name,
      bankDetails,
      
      
      
    }= req.body;

    let details_of_life_assureds;
    let employer_detailss;
    let bankItem;
    let nature_of_illness_and_habitss;
    let details_of_claimant_names;
   

    if(details_of_life_assured){
     // Parse affected_item_details if it is a string
     if (typeof details_of_life_assured === 'string') {
      details_of_life_assureds = JSON.parse(details_of_life_assured);
     } else {
      details_of_life_assureds = details_of_life_assured; 
     }
    }

    if(employer_details){
      // Parse affected_item_details if it is a string
      if (typeof employer_details === 'string') {
        employer_detailss = JSON.parse(employer_details);
      } else {
        employer_detailss = employer_details; 
      }
     }

     if(bankDetails){
      // Parse affected_item_details if it is a string
      if (typeof bankDetails === 'string') {
        bankItem = JSON.parse(bankDetails);
      } else {
        bankItem = bankDetails; 
      }
     }

     
     if(details_of_claimant_name){
      // Parse affected_item_details if it is a string
      if (typeof details_of_claimant_name === 'string') {
        details_of_claimant_names = JSON.parse(details_of_claimant_name);
      } else {
        details_of_claimant_names = details_of_claimant_name; 
      }
     }

    
  
     if (nature_of_illness_and_habits ) {
      nature_of_illness_and_habitss = nature_of_illness_and_habits.split(",");
    }

   const images=req.files;
   let imageItem;
   if(images){
   imageItem=images.map(file => file.filename)
  }
 
     

    // Create a new MedicalClaimRequest document
    const newClaimRequest = new lifeInsuranceClaimRequestModel({
      userId,
      insuranceId,
      details_of_life_assured:details_of_life_assureds,
      employer_details:employer_detailss,
      nature_of_illness_and_habits:nature_of_illness_and_habitss,
      details_of_claimant_name:details_of_claimant_names,
      bankDetails:bankItem,
     images:imageItem
    });

    // Save the document to the database
    const savedRequest = await newClaimRequest.save();

    res.status(201).json({
      success: true,
      message: 'Life insurance claim request created successfully',
      data: savedRequest,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error creating medical claim request',
      error: error.message,
    });
  }
};







module.exports = {
  User_SignUp,
  Verify_Otp,
  getUserProfile,
  User_Login,
  Resend_Otp,
  Edit_User_Profile,
  insertDocuments,
  documentLists,
  insertAddress,
  getUserAddressList,
  corporateCommunication,
  tameenikNewsLists,
  contact_usList,
  insertFaimlyInformation,
  getFaimlyInformationList,
  deleteFaimlyInformation,
  rewardList,
  insertTravelInformation,
  addLifeInsurance,



  Forgot_Password,
  Change_Password,
  Privacy_Policy,
  Terms_Condition,
  About_Us,
  Contact_Us,
  Policy_Category_List,
  buyProperty_api,
  buyMedicalInsurance_api,
  Plan_list,
  buyProperty_list,
  numberList,
  homeType_list,
  governorate_list,
  premium_list,
  aboutInsurance_list,
  benefitsOfInsurance_list,
  buyMarineInsurance,
  buyMotorInsurance,
  MotorInsurance_getByuserId,
  medicalInsurance_getByuserId,
  marineInsurance_getByuserId,
  lifeInsurance_getByuserId,
  travelInsurance_getByuserId,
  buildingInsurance_getByuserId,
  faqList,
  findMotorPolicy,
  motorClaim_request,
  findPropertyPolicy,
  findMarinePolicy,
  findTravelPolicy,
  findMedicalPolicy,
  findLifePolicy,
  marine_claim_requests,
  medical_claim_requests,
  property_claim_requests,
  travel_claim_requests,
  lifeInsurance_claim_requests,

};
