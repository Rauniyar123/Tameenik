const express = require('express');      
const multer = require("multer");          
const router = express();
const venderControllers = require('../controllers/vender_controllers');
const auth=require("../middleware/vender_auth"); 


// create storage
const storage=multer.diskStorage({  
    destination:"uploads",    
    filename:(req,file,cb)=>{ 
        cb(null,file.originalname);
    },  
});
  
const upload = multer({ 
    storage: storage, 
    fileFilter: function(req,file,callback){
        if(
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
    ){
        callback(null,true)
    }else{
        console.log('only  png , jpg & jpeg file supported')
        callback(null,false)
    } 
  
   },
   limits:{ 

    filesize:100000000000 //1000000 bytes=1MB 
   }  
});


// get api 
router.get('/login', venderControllers.login);
router.get('/logout', auth.isLogout,venderControllers.logout);
router.get('/index', auth.isLogin, venderControllers.index);
router.get('/vender_banner_list', auth.isLogin, venderControllers.venderBannerList);
router.get('/create_vender_banner', auth.isLogin, venderControllers.createVenderBanner);
router.get('/user_list',auth.isLogin, venderControllers.userList);
router.get('/user_view_details/:id',auth.isLogin, venderControllers.userViewDetails);
router.get('/vender_staff_list',auth.isLogin, venderControllers.venderStaffList);
router.get('/create_vender_staff',auth.isLogin, venderControllers.createVenderStaff);
router.get('/vender_policy_list',auth.isLogin, venderControllers.venderPolicyList);
router.get('/create_vender_policy',auth.isLogin, venderControllers.createVenderPolicy);
router.get('/vender_policy_sale_list',auth.isLogin, venderControllers.venderPolicySaleList);
router.get('/vender_transation_list',auth.isLogin, venderControllers.venderTrasationList);
router.get('/vender_privacy_policy',auth.isLogin, venderControllers.venderPrivacyPolicy);
router.get('/vender_terms_condition',auth.isLogin, venderControllers.venderTermsCondition);
router.get('/vender_about_us',auth.isLogin, venderControllers.venderAboutUs);
router.get('/vender_contact_us',auth.isLogin, venderControllers.venderContactUs);

// add api  
router.post('/login', venderControllers.venderLogin)
router.post('/add_vender_banner', auth.isLogin, upload.single('banner_image'),venderControllers.addVenderBanner)
router.post('/add_vender_staff', auth.isLogin, upload.single('staff_image'),venderControllers.addVenderStaff)
router.post('/add_vender_policy', auth.isLogin, upload.single('policy_logo'),venderControllers.addVenderPolicy)

// edit api
router.get('/edit_vender_banner/:id', auth.isLogin, venderControllers.editVenderBanner);
router.get('/edit_vender_staff/:id', auth.isLogin, venderControllers.editVenderStaff);
router.get('/edit_vender_policy/:id', auth.isLogin, venderControllers.editVenderPolicy);
router.get('/edit_vender_privacy_policy/:id', auth.isLogin, venderControllers.editVenderPrivacyPolicy);
router.get('/edit_vender_terms_condition/:id', auth.isLogin, venderControllers.editVenderTermsCondition);
router.get('/edit_vender_about_us/:id', auth.isLogin, venderControllers.editVenderAboutUs);
router.get('/edit_vender_contact_us/:id', auth.isLogin, venderControllers.editVenderContactUs);

//update api
router.post('/update_vender_banner/:id', auth.isLogin, upload.single('banner_image'), venderControllers.updateVenderBanner);
router.post('/update_vender_staff/:id', auth.isLogin, upload.single('staff_image'), venderControllers.updateVenderStaff);
router.post('/update_vender_policy/:id', auth.isLogin, upload.single('policy_logo'),venderControllers.updateVenderPolicy);

// update status
router.get('/update_vender_banner_status/:id',auth.isLogin, venderControllers.venderBannerStatus);
router.get('/update_user_status/:id',auth.isLogin, venderControllers.userStatus);
router.get('/update_vender_staff_status/:id',auth.isLogin, venderControllers.venderStaffStatus);
router.get('/update_vender_policy_status/:id',auth.isLogin, venderControllers.venderPolicyStatus);
router.post('/update_vender_privacy_policy/:id', auth.isLogin, venderControllers.updateVenderPrivacyPolicy);
router.post('/update_vender_terms_condition/:id', auth.isLogin, venderControllers.updateVenderTermsCondition);
router.post('/update_vender_about_us/:id', auth.isLogin, venderControllers.updateVenderAboutUs);
router.post('/update_vender_contact_us/:id', auth.isLogin, venderControllers.updateVenderContactUs);

//  delete api
router.get('/delete_vender_banner/:id',auth.isLogin, venderControllers.deleteVenderBanner);
router.get('/delete_user/:id',auth.isLogin, venderControllers.deleteUser);
router.get('/delete_vender_staff/:id',auth.isLogin, venderControllers.deleteVenderStaff);
router.get('/delete_vender_policy/:id',auth.isLogin, venderControllers.deleteVenderPolicy);
//premium list
router.get('/motor_premium_sales_list',auth.isLogin, venderControllers.motor_premium_sales_list);
router.get('/travel_premium_sales_list',auth.isLogin, venderControllers.travel_premium_sales_list);
router.get('/medical_premium_sales_list',auth.isLogin, venderControllers.medical_premium_sales_list);
router.get('/property_premium_sales_list',auth.isLogin, venderControllers.property_premium_sales_list);
router.get('/life_premium_sales_list',auth.isLogin, venderControllers.life_premium_sales_list);
router.get('/marine_premium_sales_list',auth.isLogin, venderControllers.marine_premium_sales_list);
//claim settled list
router.get('/motor_premium_claim_list',auth.isLogin, venderControllers.motor_premium_claim_list);
router.get('/travel_premium_claim_list',auth.isLogin, venderControllers.travel_premium_claim_list);
router.get('/marine_premium_claim_list',auth.isLogin, venderControllers.marine_premium_claim_list);
router.get('/medical_premium_claim_list',auth.isLogin, venderControllers.medical_premium_claim_list);
router.get('/life_premium_claim_list',auth.isLogin, venderControllers.life_premium_claim_list);
router.get('/property_premium_claim_list',auth.isLogin, venderControllers.property_premium_claim_list);
router.get('/life_premium_sales_details/:id',auth.isLogin, venderControllers.life_premium_sales_details);
router.get('/travel_premium_sales_details/:id',auth.isLogin, venderControllers.travel_premium_sales_details);
router.get('/motor_premium_sales_details/:id',auth.isLogin, venderControllers.motor_premium_sales_details);
router.get('/marine_premium_sales_details/:id',auth.isLogin, venderControllers.marine_premium_sales_details);
router.get('/medical_premium_sales_details/:id',auth.isLogin, venderControllers.medical_premium_sales_details);
router.get('/property_premium_sales_details/:id',auth.isLogin, venderControllers.property_premium_sales_details);

//claim details
router.get('/life_premium_claim_details/:id',auth.isLogin, venderControllers.life_premium_claim_details);
router.get('/travel_premium_claim_details/:id',auth.isLogin, venderControllers.travel_premium_claim_details);
router.get('/motor_premium_claim_details/:id',auth.isLogin, venderControllers.motor_premium_claim_details);
router.get('/marine_premium_claim_details/:id',auth.isLogin, venderControllers.marine_premium_claim_details);
router.get('/medical_premium_claim_details/:id',auth.isLogin, venderControllers.medical_premium_claim_details);
router.get('/property_premium_claim_details/:id',auth.isLogin, venderControllers.property_premium_claim_details);


router.post('/update_lifeInsurance_premium_sale_status/:_id', auth.isLogin, venderControllers.update_lifeInsurance_premium_sale_status);
router.post('/update_marine_premium_sale_status/:_id', auth.isLogin, venderControllers.update_marine_premium_sale_status);
router.post('/update_motor_premium_sale_status/:_id', auth.isLogin, venderControllers.update_motor_premium_sale_status);
router.post('/update_travel_premium_sale_status/:_id', auth.isLogin, venderControllers.update_travel_premium_sale_status);
router.post('/update_medical_premium_sale_status/:_id', auth.isLogin, venderControllers.update_medical_premium_sale_status);
router.post('/update_property_premium_sale_status/:_id', auth.isLogin, venderControllers.update_property_premium_sale_status);


router.post('/update_motor_premium_claim_status/:_id', auth.isLogin, venderControllers.update_motor_premium_claim_status);
router.post('/update_life_premium_claim_status/:_id', auth.isLogin, venderControllers.update_life_premium_claim_status);
router.post('/update_travel_premium_claim_status/:_id', auth.isLogin, venderControllers.update_travel_premium_claim_status);
router.post('/update_marine_premium_claim_status/:_id', auth.isLogin, venderControllers.update_marine_premium_claim_status);
router.post('/update_medical_premium_claim_status/:_id', auth.isLogin, venderControllers.update_medical_premium_claim_status);
router.post('/update_property_premium_claim_status/:_id', auth.isLogin, venderControllers.update_property_premium_claim_status);



//router export 
module.exports=router;