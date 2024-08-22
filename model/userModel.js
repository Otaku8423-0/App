const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(val) {
      let password = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"
      );
      if (!password.test(val.trim())) {
        throw new Error(
          "Password must be at least 8 characters long, and must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
        );
      }
    },
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    validate(val) {
      if (!validator.isEmail(val)) {
        throw new Error("Invalid email address");
      }
    },
  },
  age: {
    type: Number,
    default: 18,
    validate(val) {
      if (val <= 0) {
        throw new Error("Age must be a positive Number");
      }
    },
  },
  tokens: [
    {
      type: String,
      required: true,
    },
  ],
});

userSchema.pre("save", async function () {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcryptjs.hash(user.password, 8);
  }
});

userSchema.statics.findByCredentials = async (
  enteredEmail,
  enteredPassword
) => {
  const user = await User.findOne({ email: enteredEmail });
  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcryptjs.compare(enteredPassword, user.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return user;
};

userSchema.methods.generateToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "omar2004");
  user.tokens = user.tokens.concat(token);
  await user.save();
  return token;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
