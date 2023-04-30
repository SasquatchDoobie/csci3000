const multer = require('multer')

const storage = multer.diskStorage({

	destination: (req, file, cb) => {

		cb(null, __dirname + "/public/images")
		
	},
	filename: (req, file, cb)=> {
		
		const file_name = Date.now() + '_' + file.originalname
		cb(null, file_name)
	
	}
})

const filter = (req, file, cb) => 
{
	if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {

		req.fileValidationError = "Must be type: jpg, jpeg, png, or gif";
		return cb(null,false, req.fileValidationError);
	
	}
	cb(null, true)
};

module.exports.upload = multer({storage: storage}).array('input-images', 50)
