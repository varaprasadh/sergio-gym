const mysql=require('mysql');

function createDB(username="root",password="root",DB_NAME="sergio_gym",ad_username="admin",ad_password="admin"){
    return new Promise((resolve,reject)=>{
        var connection = mysql.createConnection({
          host: "localhost",
          user: username,
          password: password,
          db: DB_NAME,
          multipleStatements:true
        });
        connection.on('connect',()=>{
             connection.query(`DROP DATABASE IF EXISTS ${DB_NAME}; create database ${DB_NAME}; use ${DB_NAME}`, (err, res) => {
                 if(err) reject(err);
                   //db created;
                        console.log("database created");
                         connection.query(`create table clients (uid varchar(100) primary key,firstname varchar(20),lastname varchar(20),
                                mobile varchar(15), dni varchar(10), dob varchar(15), doj varchar(15), 
                                plan_acivated_date varchar(15), 
                                last_attended_date varchar(15),
                                gender varchar(10),
                                plan varchar(5));
                                create table users(
                                  uid varchar(50) primary key,
                                  username varchar(20),
                                  password varchar(20),
                                  role varchar(20)
                                );
                                insert into users values('0', '${ad_username}','${ad_password}','admin')
                                `,
                            (err, res) => {
                                if (err) reject(err);
                                console.log("clients and users table created");
                                resolve(connection);
                            });
                });
        })
        connection.connect();
    });
}

module.exports=createDB;

