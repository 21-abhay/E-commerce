
const multer = require('multer');
const uuid = require('uuid');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../static/upload/user'));
    },
    filename: (req, file, cb) => {
        id = uuid.v4().toString();
        let name = 'user-' + id;
        const customFileName = name + '.jpeg';
        cb(null, customFileName);
    },
});
const upload = multer({ storage });


module.exports = upload;