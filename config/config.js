require('dotenv').config();

module.exports = {
    development: {
      username: "nasajang",
      password: process.env.SEQUELIZE_PASSWORD,
      database: "design",
      host: "127.0.0.1",
      dialect: "postgres",
    },
    production: {
        username: "nasajang",
        password: 'wisoft!0318',
        database: "design",
        host: "127.0.0.1",
        dialect: "postgres",
        logging: false,
    }
}


