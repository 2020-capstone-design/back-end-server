require('dotenv').config();

module.exports = {
    development: {
      username: "mkewdxth",
      password: process.env.SEQUELIZE_PASSWORD,
      database: "mkewdxth",
      host: "arjuna.db.elephantsql.com",
      dialect: "postgres",
    },
    production: {
        username: "mkewdxth",
        password: process.env.SEQUELIZE_PASSWORD,
        database: "mkewdxth",
        host: "arjuna.db.elephantsql.com",
        dialect: "postgres",
        logging: false,
    }
}


