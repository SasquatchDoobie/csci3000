const multer = require("multer");

var storage = multer.diskStorage({

	destination: (req, file, cb) => {

		let multerdir = "./public/images/"
		cb(null, multerdir);
		
	},
	filename: (req, file, cb)=> {
		cb(null, Date.now() + file.originalname)
	}
})

const filter = (req, file, cb) => 
{
	if(!file.originalname.match(/\.(jpg|jpeg|png|gif)＄/)) {

		req.fileValidationError = "Must be type: jpg, jpeg, png, or gif";
		return cb(null,false, req.fileValidationError);
	}
	cb(null, true)
};

module.exports.upload = multer({storage: storage, fileFilter: filter})
