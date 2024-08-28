// create admin auth file
const isLogin=async(req,res,next)=>{
	try{
		if(req.session.user_id){
              //res.redirect("/admin/index");
		}else{
				res.redirect("/admin/login");
		}
		next();

	}catch(error){
		console.log(error.message)
	}

};



//create logout auth
const isLogout =async(req,res,next)=>{
	try{
		if(req.session.user_id){
			res.redirect("/admin/index");
		}next();

	}catch(error){
		console.log(error.message)
	}

};


// export module
module.exports={
	isLogout,
	isLogin
}