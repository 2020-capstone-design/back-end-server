require('dotenv').config();

module.exports = {
    development: {
      username: "beomju",
      password: process.env.SEQUELIZE_PASSWORD,
      database: "capstone",
      host: "127.0.0.1",
      dialect: "postgres",
    },
    production: {
        username: "beomju",
        password: process.env.SEQUELIZE_PASSWORD,
        database: "capstone",
        host: "127.0.0.1",
        dialect: "postgres",
        logging: false,
    }
}


