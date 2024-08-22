const express = require("express");
const router = express.Router();
const User = require("../model/userModel");
const auth = require("../middleware/auth");

router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    const token = await user.generateToken();
    await user.save();
    res.status(200).send({ user, token });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/users", auth, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/users/:id", auth, async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findOne({ _id });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.patch("/users/:id", auth, async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const _id = req.params.id;
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.delete("/users/:id", auth, async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findByIdAndDelete(_id);
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    res.status(200).send(`${user.username} => DELETED`);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateToken();
    res.status(200).send({ user: user, token: token });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    const token = await user.generateToken();

    await user.save();
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/users", async (req, res) => {
  try {
    const result = await User.deleteMany({});
    res.status(200).send(`Deleted ${result.deletedCount} users.`);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/profile", auth, async (req, res) => {
  res.status(200).send(req.user);
});

router.delete("/logout", auth, async (req, res) => {
  try {
    console.log(req.user);
    req.user.tokens = req.user.tokens.filter((token) => {
      return token !== req.token;
    });
    await req.user.save();
    res.status(200).send("visit us again later");
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.delete("/logoutAll", auth, async (req, res) => {
  try {
    req.user.takens = [];
    await req.user.save();
    res.status(200).send("visit us again later");
  } catch (e) {
    res.status(500).send(e.message);
  }
});
module.exports = router;
