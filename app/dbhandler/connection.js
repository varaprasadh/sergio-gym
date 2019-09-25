var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  db: "sergio_gym"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  connection.query('use sergio_gym', (err, db) => {
    if (err) throw err;
    console.log("conenction",db);
  });
});

module.exports.connection = connection;