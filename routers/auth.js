const bcrypt = require("bcrypt");
const { Router } = require("express");
const { toJWT } = require("../auth/jwt");
const authMiddleware = require("../auth/middleware");
const User = require("../models/").user;
const { SALT_ROUNDS } = require("../config/constants");

const router = new Router();

router.post("/login", async (req, res, next) => {
  try {
    console.log(`Before const { email, password } = req.body;`);
    const { email, password } = req.body;
    console.log(`After const { email, password } = req.body;`);

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide both email and password" });
    }

    console.log(`Before await User.findOne({ where: { email } });`);
    const user = await User.findOne({ where: { email } });
    console.log(`After await User.findOne({ where: { email } });`);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({
        message: "User with that email not found or password incorrect",
      });
    }

    delete user.dataValues["password"]; // don't send back the password hash
    const token = toJWT({ userId: user.id });
    return res.status(200).json({ token, ...user.dataValues });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: `Login Page: Something went wrong, sorry: ${JSON.stringify(
        req.headers
      )}, AND, ${JSON.stringify(req.body)}
      )}`,
    });
  }
});

router.post("/signup", async (req, res) => {
  const { email, password, name, isArtist } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json("Please provide an email, password and a name");
  }

  try {
    const newUser = await User.create({
      email,
      password: bcrypt.hashSync(password, SALT_ROUNDS),
      name,
      isArtist,
    });

    delete newUser.dataValues["password"]; // don't send back the password hash

    const token = toJWT({ userId: newUser.id });

    res.status(201).json({ token, ...newUser.dataValues });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .json({ message: "There is an existing account with this email" });
    }

    return res
      .status(400)
      .json({ message: "Signup Page: Something went wrong, sorry" });
  }
});

// The /me endpoint can be used to:
// - get the users email & name using only their token
// - checking if a token is (still) valid
router.get("/me", authMiddleware, async (req, res) => {
  // don't send back the password hash
  delete req.user.dataValues["password"];
  res.status(200).json({ ...req.user.dataValues });
});

module.exports = router;
