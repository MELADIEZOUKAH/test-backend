const path = require('path');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './upload');
    },
    filename: (req, file, cb)=>{
        let ext = path.extname(file.originalname);
        cb(null, Date.now()+ '++' + ext);
    }
})

var upload = multer({
    storage: storage,
    fileFilter: (req, file, callback)=>{
        if(file.mimetype == 'image/png' || file.mimetype == 'image/jpg')
            {callback(null, true)}
        else{
            console.log('only png & jpg files are supported!');
            callback(null, false);
        }
    }
})

module.exports = upload;