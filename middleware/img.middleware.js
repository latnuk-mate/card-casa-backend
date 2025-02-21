const multer = require('multer');
const Path = require('path');

function checkMimeTypes(file, cb){
	// find the match
		const fileTypes = /jpeg|jpg|png/;
		const mimes = fileTypes.test(file.mimetype) // check the mimes

		const extFile = fileTypes.test(Path.extname(file.originalname).toLowerCase());

	if(extFile && mimes){
		return cb(null, file)
	}else{
	 cb("Error: Upload only images");
	}
}


// configuring disk Engine
const fileStore = multer.diskStorage({
    destination: './uploads',  // uploads directory should exists
filename: (req, file, cb)=> {
        const imageFile = file.fieldname + '-'+Date.now().toString()+Path.extname(file.originalname);
        cb(null, imageFile);
}});





const upload = multer({
    storage: fileStore,
    limits: {fileSize : 5242880}, // size of image is ~5 mb
    fileFilter: (req, file, cb)=>{
        checkMimeTypes(file, cb);
    }
})




module.exports = upload;