const mysql = require("mysql2");
const dbConfig = require("./config/dbСonfig");

class MySqlConnection {
    exequteSqlQuery = (sql, data) => {
        const connection = mysql.createConnection({
            host: dbConfig.host,
            user: dbConfig.user,
            database: dbConfig.DB,
            password: dbConfig.password
        });
        connection.connect(function (err) {
            if (err) {
                return console.error("Ошибка: " + err.message);
            }
            else {
                console.log("Подключение к серверу MySQL успешно установлено");
            }
        });
        connection.query(sql, data, function (err, results) {
            if (err) console.log(err)
            const response = results;

            return response;
        });
        connection.end();
    }
}


module.exports = new MySqlConnection();