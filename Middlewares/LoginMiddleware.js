const jwt = require("jsonwebtoken");
const LoginMiddleware = (req, res, next) => {
  const token = req.headers.auth;

  if (token) {
    const decode = jwt.verify(token, "loginornot");
  
    if (decode) {
      req.body.userId=decode.userId;
      next();
    }
  } else {
    res.send("you are not authorized");
  }
};
module.exports = {
  LoginMiddleware,
};
