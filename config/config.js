require("dotenv").config();

module.exports = {
  development: {
    url: process.env.DB_URL,
    dialect: "postgres",
    operatorsAliases: "0",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres",
    operatorsAliases: "0",
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    host: "0.0.0.0",
    dialect: "postgres",
  },
};
