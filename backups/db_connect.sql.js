const mysql = require('mysql')
const dbConfig = require('../config/db_config')

const dbConnect = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
})

dbConnect.connect((err)=>{
    if(err){
        console.log("error on connection",+Error);
        return
    }
    console.log("connected");
})

module.exports = dbConnect