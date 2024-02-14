const express = require("express");
const { con } = require("../Config/db");
const { LoginMiddleware } = require("../Middlewares/LoginMiddleware");
const Post_Route = express.Router();

const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${file.originalname}`;
    return cb(null, uniqueSuffix);
  },
});
const upload = multer({ storage: storage });
cloudinary.config({
  cloud_name: "dqo5yb3wp",
  api_key: "594148615643376",
  api_secret: "6YvD00TkngP0diChbdegVG5vN3w",
});
Post_Route.post(
  "/post",
  upload.single("file"),
  LoginMiddleware,
  async (req, res) => {
   
    const { description, userId } = req.body;
   
    if (!req.file) {
      res.send("No File Provided");
    }
    try {
      const StoretoCloudinary = await cloudinary.uploader.upload(req.file.path);

      const postquery =
        "INSERT INTO user_posts (description,image,userId) VALUES (?,?,?)";
      con.query(
        postquery,
        [description, StoretoCloudinary.url, userId],
        (err, result) => {
          if (err) {
            res.send(err);
          } else if (result) {
            res.send("Post created successfully");
          } else {
            res.send("post unsuccessfull");
          }
        }
      );
    } catch (err) {
      res.send(err);
    }
  }
);

Post_Route.get("/post", async (req, res) => {
  const query =
    "SELECT user_posts.postId,user_posts.description,user_posts.image,user_posts.timestamp_column,userregistrationdetails.userId,userregistrationdetails.name,userregistrationdetails.email from user_posts JOIN userregistrationdetails ON user_posts.userId=userregistrationdetails.userId";
  con.query(query, (err, result) => {
    try {
      if (err) {
        res.send(err);
      } else if (result) {
        console.log("result", result);
        res.send(result);
      } else {
        res.send("getting post some error");
      }
    } catch (err) {
      res.send(err);
    }
  });
});
module.exports = { Post_Route };
