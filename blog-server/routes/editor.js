let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');

async function checkValidation(req, res) {

	let myCookie = req.cookies.jwt;
	console.log(myCookie);
	let resBoolean = false;

	if(myCookie == null){
		console.log("myCookie is null");
		resBoolean=false;
	}
	else{
		let secretKey = "C-UFRaksvPKhx1txJYFcut3QGxsafPmwCY6SCly3G6c";
		try{
			jwt.verify(myCookie, secretKey, function(err, decoded) {
				if(err){
				    console.log("error in verify");
					throw err;
				}
  				// may not need
  				else if(decoded.exp <= Math.floor(Date.now() / 1000)){
        			resBoolean=false;
  				}
  				else{
  					resBoolean=true;
  				}
			});

		} catch(error){
			console.log("throw error" + error());
    		return false;
		}
	}
	return resBoolean;
}
router.get("*", async function (req, res, next){
	let ifValidate = await checkValidation(req, res);
	if(ifValidate){
		console.log("validate");
		next();
	}
	else{
		res.redirect("/login?redirect=/editor/");
	}
})

module.exports = router;