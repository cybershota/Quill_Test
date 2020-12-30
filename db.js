var mysql = require('mysql');
require('dotenv').config();

var connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// connection.connect();

// 連線測試
// connection.query('SELECT * FROM posts', function (error, results, fields) {
//   if (error) throw error;
//   console.log(results);
// });

// connection.end();

module.exports = connection;
