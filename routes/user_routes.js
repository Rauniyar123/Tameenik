// import dependancies in the  router files
const express=require('express');
const router=express();   
const multer = require('multer');
const userControllers=require('../controllers/user_controllers');
const auth = require('../middleware/auth'); 


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


//api post 
router.post('/signup',userControllers.User_SignUp);
router.post('/verify_otp',userControllers.Verify_Otp);
router.post('/getUserProfile',userControllers.getUserProfile);
router.post('/login',userControllers.User_Login);
router.post('/edit_user_profile',upload.single('user_image'),userControllers.Edit_User_Profile);
router.post('/insertDocuments',upload.fields([
    {name:'f_image',maxCount:1},
    {name:'b_image',maxCount:1}
]),userControllers.insertDocuments);
router.post('/documentLists',userControllers.documentLists);
router.post('/insertAddress',userControllers.insertAddress);
router.post('/getUserAddressList',userControllers.getUserAddressList);
router.post('/corporateCommunication',userControllers.corporateCommunication);
router.get('/tameenikNewsLists',userControllers.tameenikNewsLists);
router.get('/contact_usList',userControllers.contact_usList);
router.post('/insertFaimlyInformation',userControllers.insertFaimlyInformation);
router.post('/getFaimlyInformationList',userControllers.getFaimlyInformationList);
router.post('/deleteFaimlyInformation',userControllers.deleteFaimlyInformation);
router.get('/rewardList',userControllers.rewardList);
router.post('/insertTravelInformation',userControllers.insertTravelInformation);
router.post('/addLifeInsurance',upload.any('images'),userControllers.addLifeInsurance);
router.post('/buyProperty_api',userControllers.buyProperty_api);
router.post('/buyMedicalInsurance_api',userControllers.buyMedicalInsurance_api);
router.post('/Plan_list',userControllers.Plan_list);
router.post('/buyProperty_list',userControllers.buyProperty_list);
router.get('/numberList',userControllers.numberList);
router.get('/homeType_list',userControllers.homeType_list);
router.get('/governorate_list',userControllers.governorate_list);


router.post('/resend_otp',userControllers.Resend_Otp);
router.post('/forgot_password',userControllers.Forgot_Password);
router.post('/change_password',userControllers.Change_Password);

//api get
router.get('/privacy_policy',userControllers.Privacy_Policy);
router.get('/terms_and_condition',userControllers.Terms_Condition);
router.get('/about_us',userControllers.About_Us);
router.get('/contact_us',userControllers.Contact_Us);
router.get('/policy_category_list',userControllers.Policy_Category_List);
router.post('/premium_list',userControllers.premium_list);
router.post('/aboutInsurance_list',userControllers.aboutInsurance_list);
router.post('/benefitsOfInsurance_list',userControllers.benefitsOfInsurance_list);
router.post('/buyMarineInsurance',userControllers.buyMarineInsurance);
router.post('/buyMotorInsurance',userControllers.buyMotorInsurance);
router.post('/buildingInsurance_getByuserId',userControllers.buildingInsurance_getByuserId);
router.post('/travelInsurance_getByuserId',userControllers.travelInsurance_getByuserId);
router.post('/lifeInsurance_getByuserId',userControllers.lifeInsurance_getByuserId);
router.post('/marineInsurance_getByuserId',userControllers.marineInsurance_getByuserId);
router.post('/MotorInsurance_getByuserId',userControllers.MotorInsurance_getByuserId);
router.post('/medicalInsurance_getByuserId',userControllers.medicalInsurance_getByuserId);
router.get('/faqList',userControllers.faqList);
router.post('/findMotorPolicy',userControllers.findMotorPolicy);
router.post('/motorClaim_request',upload.any('images'),userControllers.motorClaim_request);
router.post('/findPropertyPolicy',userControllers.findPropertyPolicy);
router.post('/findMarinePolicy',userControllers.findMarinePolicy);
router.post('/findTravelPolicy',userControllers.findTravelPolicy);
router.post('/findMedicalPolicy',userControllers.findMedicalPolicy);
router.post('/findLifePolicy',userControllers.findLifePolicy);
router.post('/marine_claim_requests',upload.any('images'),userControllers.marine_claim_requests);
router.post('/medical_claim_requests',upload.any('receipt_image'),userControllers.medical_claim_requests);
router.post('/property_claim_requests',upload.any('images'),userControllers.property_claim_requests);
router.post('/travel_claim_requests',upload.any('images'),userControllers.travel_claim_requests);
router.post('/lifeInsurance_claim_requests',upload.any('images'),userControllers.lifeInsurance_claim_requests);




module.exports=router;
