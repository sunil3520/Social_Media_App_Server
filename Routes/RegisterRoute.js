const express = require("express");
const RegsiterRoute = express.Router();
const bcrypt = require("bcrypt");
const { con } = require("../Config/db");

RegsiterRoute.post("/register", (req, res) => {
  console.log("i am req.body", req.body);
  const { name, email, PhoneNumber, password, city } = req.body;
  console.log(email,password)

  if (!email || !password ) {
    return res.status(400).send("Please provide all required fields.");
  }

 
  con.query(
    "SELECT * FROM UserRegistrationDetails WHERE email = ?",
    [email],
    (err, userExist) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error checking user existence");
      }

      if (userExist.length > 0) {
        console.log(userExist);
        return res.status(409).send("User already exists.");
      }

     
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error hashing password.");
        }

        // Insert user into the database
        con.query(
          "INSERT INTO UserRegistrationDetails SET ?",
          { name, email, password: hash, PhoneNumber, city },
          (err, result) => {
            if (err) {
              console.error(err);
              return res.status(500).send("Error registering user.");
            }

            console.log(result);

            res.status(201).send("User registered successfully");
          }
        );
      });
    }
  );
});
module.exports = { RegsiterRoute };
