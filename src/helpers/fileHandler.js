const fs = require('fs');

class FileHandler {

    get(file, res, next) {
        try {
            const dir = file.destination;
            const fileName = file.originalname;
            const readStream = fs.createReadStream(`${dir}/${fileName}`);
            readStream.on('open', () => {

                readStream.pipe(res);

            });
            readStream.on('error', (err) => {

                next(err);

            });
        } catch (err) {

            throw err;
        }
    }

    delete(file, fileName) {
        const dir = file.destination

        if (fs.existsSync(`${dir}/${fileName}`)) {

            fs.unlink(`${dir}/${fileName}`, (err) => {
                if (err) {

                    throw err;
                }
            })
        }
    }

}

module.exports = new FileHandler();