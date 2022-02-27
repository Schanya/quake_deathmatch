const path = require('path');
const multer = require('multer');
const { imageDir, fileDir, maxSize, numberOfFiles } = require('../env').multer

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
    storage: multer.diskStorage(
        {
            destination: function (req, file, cb) {
                const { baseUrl } = req;
                if (getFileType(file.mimetype) === "image") {
                    const subPath = getSubPathName(baseUrl);

                    const imagePath = path.join(imageDir, subPath);
                    cb(null, imagePath);

                } else if (getFileType(file.mimetype) === "document") {
                    const subPath = getSubPathName(baseUrl);

                    const documentPath = path.join(fileDir, subPath);
                    file.destination = documentPath;
                    cb(null, documentPath);
                }

            },

            filename: function (req, file, cb) {
                const splittedName = file.originalname.split(".");

                const ext = splittedName[splittedName.length - 1];
                const fileName = Date.now() + "." + ext;

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
        fileSize: maxSize,
        files: numberOfFiles
    }

};


