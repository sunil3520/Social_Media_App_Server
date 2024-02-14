const express = require("express");
const RegsiterRoute = express.Router();
const bcrypt = require("bcrypt");
const { con } = require("../Config/db");

RegsiterRoute.post("/register", (req, res) => {
  console.log("i am req.body", req.body);
  const { name, email, PhoneNumber, password, city } = req.body;
  bcrypt.hash(password, 10, function (err, hash) {
    // Store hash in your password DB.
    if (err) {
      res.send(err);
    } else {
      //   try {
      con.query(
        "INSERT INTO UserRegistrationDetails SET ?",
        { name, email, password: hash, PhoneNumber, city },
        (err, result, fields) => {
          if (err) {
            res.send(err);
          } else {
            res.send("user register succesfully");
          }
        }
      );
      //   } catch {
      //   res.send("something wrong while user registration");
      //   }
    }
  });
});
module.exports = { RegsiterRoute };
