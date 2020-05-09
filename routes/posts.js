const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../models/User");
router.get("/", verify, async (req, res) => {
  //   res.json({
  //     posts: {
  //       title: "My first Post",
  //       description: "Random data that you shouldn't access with login",
  //     },
  //   });
  const loggedUser = await User.findOne({ _id: req.user });
  res.send(loggedUser);
});

module.exports = router;
