var mysql = require('mysql');
const constants=require("../config/constants");
const {DB_NAME,USERNAME,PASSWORD}=constants;

var connection = mysql.createConnection({
  host: "localhost",
  user: USERNAME,
  password: PASSWORD,
  db: DB_NAME
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  connection.query(`use ${DB_NAME}` , (err, db) => {
    if (err) throw err;
    console.log("conenction",db);
  });
});

module.exports.connection = connection;