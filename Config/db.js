require("dotenv").config();
const mysql = require("mysql");
const con = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  
});

con.getConnection((err, result) => {
  if (err) {
    console.log("Not connected to db",err);
    return;
  }
  console.log("connected to DB");
});

module.exports = { con };
