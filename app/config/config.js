const constants=require("./constants");

let {DB_NAME,USERNAME,PASSWORD} =constants;
const createDB=require("./db_creator");

createDB(USERNAME, PASSWORD, DB_NAME).then((con) => {
    // console.log(con);
    console.log("database initialization done!")
    process.exit(0);
}).catch(console.log);


