const jwt = require("jsonwebtoken");
const express = require("express");
const { con } = require("../Config/db");
const loginRouter = express.Router();
const bcrypt = require("bcrypt");
loginRouter.post("/login", (req, res) => {
  const { email, password } = req.body;
  const CheckQuery = "SELECT * FROM UserRegistrationDetails WHERE email=?";

  con.query(CheckQuery, [email], async (err, result) => {
    if (err) {
      res.send("user does't exist with this failed");
    } else {
      try {
        if (result.length > 0) {
          const hashPassword = result[0].password;
          const userid = result[0].UserId;

          await bcrypt.compare(password, hashPassword, function (err, result) {
            if (err) {
              res.send(err);
            } else if (result) {
              const token = jwt.sign({ userId: userid }, "loginornot");

              res.send(token);
            } else {
              res.send("Wrong Credentials");
            }
          });
        } else {
          res.send("Wrong Credentials");
        }
      } catch (err) {
        res.send(err);
      }
    }
  });
});
// });
module.exports = { loginRouter };
