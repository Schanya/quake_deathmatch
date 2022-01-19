const multer = require('multer');
const multerUpload = require('../../config/multer').any();

app.use(multer({ dest: "uploads" }).single("filedata"));

module.exports = (req, res, next) => {
    multerUpload(req, res, (err) => {
        let filedata = req.file;

        console.log(filedata);
        if (!filedata)
            res.send("Ошибка при загрузке файла");
        else
            res.send("Файл загружен");

        next();
    });
};