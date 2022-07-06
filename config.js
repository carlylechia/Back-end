const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  dbUrl: process.env.DB_URI,
  name: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  PORT: process.env.PORT,
  TokenKey: process.env.TOKEN_KEY,
};