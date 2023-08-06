const dotenv = require('dotenv');

dotenv.config();

module.exports = {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        proxyport: process.env.PROXY_PORT,
        host: process.env.DB_HOST
}