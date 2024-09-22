const express = require("express");
const router = express.Router();
const { join } = require("path");
const User = require(join(__dirname, "..", "model", "userModal.js"));

router.get("/", (req, res) => {
  if (res.locals.user) {
    return res.redirect("/error");
  }
  res.render("site/register");
});

router.post("/", async (req, res) => {
  try {
    if (!req.body) {
      return res.json({
        case: false, //success
        message: "data could not be transmitted! req.body",
      });
    }
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.json({
        case: false,
        message: "data could not be transmitted single data",
      });
    }

    const gmailRGX = new RegExp(/@gmail.com/, "g");
    if (!gmailRGX.test(email)) {
      return res.json({
        case: false,
        message: "Email is wrong",
      });
    }

    const userControl = await User.find({ email: email }).exec();
    if (userControl.length != 0) {
      return res.json({
        case: "false",
        message: "Email already in use",
      });
    }

    const user = new User({
      email: email,
      username: username,
      password: password,
    })
    user.save().then((data) => {
      let ID = data._id
      ID=String(ID);
      req.session.userID=ID

        return res.json({
          case: true,
          message: "User successfully saved ",
        });
      })
      .catch((err) => {
        console.log(err);
        return res.json({
          case: "false",
          message: "something gone wrong",
        });
      });
  } catch (error) {
    console.log(error);
    return res.json({
      case: false,
      message: `unexpected error`,
    });
  }
});

module.exports = router;

/*  
 req.body=post
 req.query={get, put, delete}
 req.params={get,put, delete

*/
