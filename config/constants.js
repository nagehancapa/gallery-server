require("dotenv").config();

module.exports = {
  SALT_ROUNDS: 10,
  PORT: process.env.PORT || 4000,
  HOST: "0.0.0.0" || "localhost",
};
