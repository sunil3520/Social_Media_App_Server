const jwt = require("jsonwebtoken");
const LoginMiddleware = (req, res, next) => {
  const token = req.headers.auth;
 console.log(token,"token")
  if (token) {
    const decode = jwt.verify(token, "loginornot");
   console.log(decode,'decode')
    if (decode) {
      req.body.userId=decode.userId;
      console.log(decode.userId,"userid")
      next();
    }
  } else {
    res.send("you are not authorized");
  }
};
module.exports = {
  LoginMiddleware,
};
