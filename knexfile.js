require("dotenv").config();

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: process.env.DB_HOST || "postgres",
      database: process.env.DB_DATABASE || "it_specializations",
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "1111",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
};
