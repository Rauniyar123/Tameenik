// import dependancies in the  router files    
const express = require('express');     
const multer = require('multer');             
const router = express();
const adminControllers = require('../controllers/admin_controllers');
const auth=require('../middleware/admin_auth'); 


  
const storage = multer.diskStorage({     
    destination: "uploads",  
    filename: (req, file, cb) => {     
        cb(null, file.originalname);         
    }, 
   
});   
 
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg" 
        ) {
            callback(null, true) 
        } else {
            console.log('only  png , jpg, jpeg, csv & ms-excel(xlsx,xls) file supported')
            callback(null, false)
        }

    },
    limits: {

        filesize: 100000000000 //1000000 bytes=1MB 
    }
});

// get api 
router.get('/login', adminControllers.login);
router.get('/logout', auth.isLogout,adminControllers.logout);
router.get('/index', auth.isLogin, adminControllers.index);
router.get('/role_list',auth.isLogin, adminControllers.roleList);
router.get('/create_role', auth.isLogin,adminControllers.createRole);
router.get('/vendor_list', auth.isLogin, adminControllers.vendorList);
router.get('/create_vendor',auth.isLogin, adminControllers.createVendor);
router.get('/privacy_policy',auth.isLogin, adminControllers.privacyPolicy);
router.get('/terms_and_condition',auth.isLogin, adminControllers.termsAndCondition);
router.get('/about_us',auth.isLogin, adminControllers.aboutUs);
router.get('/contact_us',auth.isLogin, adminControllers.contactUs);
router.get('/user_list',auth.isLogin, adminControllers.userList);
router.get('/user_view_details/:id',auth.isLogin, adminControllers.userViewDetails);
router.get('/policy_category_list', auth.isLogin, adminControllers.policyCategoryList);
router.get('/create_policy_category', auth.isLogin, adminControllers.createPolicyCategory);
router.get('/news_list', auth.isLogin, adminControllers.newsList);
router.get('/create_news', auth.isLogin, adminControllers.createNews);
router.get('/reward_list', auth.isLogin, adminControllers.rewardList);
router.get('/create_reward', auth.isLogin, adminControllers.createReward);
router.get('/home_type_list', auth.isLogin, adminControllers.homeTypeList);
router.get('/create_home_type', auth.isLogin, adminControllers.createHomeType);
router.get('/governorate_list', auth.isLogin, adminControllers.governorateList);
router.get('/create_governorate', auth.isLogin, adminControllers.createGovernorate);
router.get('/premium_list', auth.isLogin, adminControllers.premiumList);
router.get('/create_premium', auth.isLogin, adminControllers.createPremium);
router.get('/benefit_insurance_list', auth.isLogin, adminControllers.benefitInsuranceList);
router.get('/create_benefit_insurance', auth.isLogin, adminControllers.createBenefitInsurance);
router.get('/about_insurance_list', auth.isLogin, adminControllers.aboutInsuranceList);
router.get('/create_about_insurance', auth.isLogin, adminControllers.createAboutInsurance);
router.get('/faq_list',auth.isLogin, adminControllers.faq_list);


// add api  
router.post('/login', adminControllers.adminLogin)
router.post('/add_role', auth.isLogin, upload.single('image'), adminControllers.addRole);
router.post('/add_vendor', auth.isLogin, upload.single('company_logo'), adminControllers.addVendor);
router.post('/add_policy_category', auth.isLogin, upload.single('category_image'), adminControllers.addPolicyCategory);
router.post('/add_news',auth.isLogin,upload.single('image'),adminControllers.addNews);
router.post('/add_reward',auth.isLogin,upload.single('image'),adminControllers.addReward);
router.post('/add_home_type',auth.isLogin,adminControllers.addHomeType);
router.post('/add_governorate',auth.isLogin,adminControllers.addGovernorate);
router.post('/add_premium',auth.isLogin,adminControllers.addPremium);
router.post('/add_benefit_insurance',auth.isLogin,adminControllers.addBenefitInsurance);
router.post('/add_about_insurance',auth.isLogin,upload.single('icon'),adminControllers.addAboutInsurance);
// edit api
router.get('/edit_role/:id', auth.isLogin, adminControllers.editRole);
router.get('/edit_vendor/:id', auth.isLogin, adminControllers.editVendor);
router.get('/edit_privacy_policy/:id', auth.isLogin, adminControllers.editPrivacyPolicy);
router.get('/edit_terms_condition/:id', auth.isLogin, adminControllers.editTermsCondition);
router.get('/edit_about_us/:id', auth.isLogin, adminControllers.editAboutUs);
router.get('/edit_contact_us/:id', auth.isLogin, adminControllers.editContact_Us);
router.get('/edit_policy_category/:id', auth.isLogin, adminControllers.editPolicyCategory);
router.get('/edit_news/:id', auth.isLogin, adminControllers.editNews);
router.get('/edit_reward/:id', auth.isLogin, adminControllers.editReward);
router.get('/edit_home_type/:id', auth.isLogin, adminControllers.editHomeType);
router.get('/edit_governorate/:id', auth.isLogin, adminControllers.editGovernorate);
router.get('/edit_premium/:id', auth.isLogin, adminControllers.editPremium);
router.get('/edit_benefit_insurance/:id', auth.isLogin, adminControllers.editBenefitInsurance);
router.get('/edit_about_insurance/:id', auth.isLogin, adminControllers.editAboutInsurance);
router.get('/edit_faq/:id', auth.isLogin, adminControllers.edit_faq);


//  update api
router.post('/update_role/:id', auth.isLogin, upload.single('image'), adminControllers.updateRole);
router.post('/update_vendor/:id', auth.isLogin, upload.single('company_logo'), adminControllers.updateVendor);
router.post('/update_privacy_policy/:id', auth.isLogin, adminControllers.updatePrivacyPolicy);
router.post('/update_terms_condition/:id', auth.isLogin, adminControllers.updateTermsCondition);
router.post('/update_about_us/:id', auth.isLogin, adminControllers.updateAboutUs);
router.post('/update_contact_us/:id', auth.isLogin, adminControllers.updateContactUs);
router.post('/update_policy_category/:id', auth.isLogin, upload.single('category_image'), adminControllers.updatePolicyCategory);
router.post('/update_news/:id', auth.isLogin, upload.single('image'), adminControllers.updateNews);
router.post('/update_reward/:id', auth.isLogin, upload.single('image'), adminControllers.updateReward);
router.post('/update_home_type/:id', auth.isLogin, adminControllers.updateHomeType);
router.post('/update_governorate/:id', auth.isLogin, adminControllers.updateGovernorate);
router.post('/update_premium/:id', auth.isLogin, adminControllers.updatePremium);
router.post('/update_benefit_insurance/:id', auth.isLogin, adminControllers.updateBenefitInsurance);
router.post('/update_about_insurance/:id', auth.isLogin, upload.single('icon'), adminControllers.updateAboutInsurance);
router.post('/update_faq/:id', auth.isLogin, adminControllers.update_faq);

// update status
router.get('/update_role_status/:id',auth.isLogin, adminControllers.roleStatus);
router.get('/update_vendor_status/:id',auth.isLogin, adminControllers.vendorStatus);
router.get('/update_policy_category_status/:id',auth.isLogin, adminControllers.policyCategoryStatus);
router.get('/update_user_status/:id',auth.isLogin, adminControllers.userStatus);
router.get('/update_news_status/:id',auth.isLogin, adminControllers.newsStatus);
router.get('/update_reward_status/:id',auth.isLogin, adminControllers.rewardStatus);
router.get('/update_home_type_status/:id',auth.isLogin, adminControllers.homeTypeStatus);
router.get('/update_governorate_status/:id',auth.isLogin, adminControllers.governorateStatus);
router.get('/update_premium_status/:id',auth.isLogin, adminControllers.premiumStatus);
router.get('/update_benefit_insurance_status/:id',auth.isLogin, adminControllers.benefitInsuranceStatus);
router.get('/update_about_insurance_status/:id',auth.isLogin, adminControllers.aboutInsuranceStatus);


//  delete api
router.get('/delete_vendor/:id',auth.isLogin, adminControllers.deleteVendor);
router.get('/delete_policy_category/:id',auth.isLogin, adminControllers.deletePolicyCategory);
router.get('/delete_role/:id',auth.isLogin, adminControllers.deleteRole);
router.get('/delete_user/:id',auth.isLogin, adminControllers.deleteUser);
router.get('/delete_news/:id',auth.isLogin, adminControllers.deleteNews);
router.get('/delete_reward/:id',auth.isLogin, adminControllers.deleteReward);
router.get('/delete_home_type/:id',auth.isLogin, adminControllers.deleteHomeType);
router.get('/delete_governorate/:id',auth.isLogin, adminControllers.deleteGovernorate);
router.get('/delete_premium/:id',auth.isLogin, adminControllers.deletePremium);
router.get('/delete_benefit_insurance/:id',auth.isLogin, adminControllers.deleteBenefitInsurance);
router.get('/delete_about_insurance/:id',auth.isLogin, adminControllers.deleteAboutInsurance);

module.exports = router;