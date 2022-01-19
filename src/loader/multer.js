const dotenv = require('dotenv');
const path = require('path');
const multer = require('multer');

dotenv.config();

getFileType = (mimetype) => {
    switch (mimetype) {
        case "image/png":
        case "image/jpg":
        case "image/jpeg":
            return "image";
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        case "application/pdf":
        case "text/plain":
            return "document"
        default:
            return null;
    }
}

getSubPathName = (baseUrl) => {
    switch (baseUrl) {
        case "/location":
            return "location";
        case "/session":
            return "session";
    }
}

module.exports = {
    app: {
        port: parseInt(process.env.APP_PORT, 10),

        resDir: process.env.RESOURCE_DIR
    },

    storage: multer.diskStorage(
        {
            destination: function (req, file, cb) {
                const { baseUrl } = req;
                if (getFileType(file.mimetype) === "image") {
                    const subPath = getSubPathName(baseUrl);

                    const imagePath = path.join(process.env.IMAGE_DIR, subPath);
                    cb(null, imagePath);

                } else if (getFileType(file.mimetype) === "document") {
                    const subPath = getSubPathName(baseUrl);

                    const documentPath = path.join(process.env.FILE_DIR, subPath);
                    cb(null, documentPath);
                }

            },

            filename: function (req, file, cb) {

                const splittedName = file.originalname.split(".");

                const ext = splittedName[splittedName.length - 1];

                const fileType = getFileType(file.mimetype);

                const fileName = req.params.id + fileType + "-" + Date.now() + "." + ext;

                file.originalname = fileName;

                cb(null, fileName);

            }
        }
    ),

    fileFilter: (req, file, cb) => {
        if (getFileType(file.mimetype) === "image") {
            cb(null, true);
        }
        if (getFileType(file.mimetype) === "document") {
            cb(null, true);
        }
        else {
            cb(null, false);
        }
    },

    limits: {

        fileSize: 2097152,//process.env.MAX_IMG_SIZE,

        files: 1

    }

};


