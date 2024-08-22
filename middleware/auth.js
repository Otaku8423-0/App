const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "").trim();
    const verify = jwt.verify(token, "omar2004");
    const user = await User.findOne({ _id: verify._id, tokens: token });
    console.log(`${token} , ${verify} , ${user}`);

    if (!user) {
      throw new Error("Enter The User!");
    }
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    res.status(401).send({ error: "PLEASE AUTHENTICATE" });
  }
};

module.exports = auth;
