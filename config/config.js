const dotenv = require('dotenv');

// ======================== Reading .env Variables ===============
dotenv.config();

// ===================== Exporting Credentials =========================
module.exports = {
    databaseUsername: process.env.DB_USERNAME,
    databasePWD: process.env.DB_PWD,
    port: process.env.PORT || 3000
}