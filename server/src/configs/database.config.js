const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME_DEVELOPMENT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
  },
};
