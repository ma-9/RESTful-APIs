const dotenv = require('dotenv');

// ======================== Reading .env Variables ===============
dotenv.config();

// ================== Generating Date in dd/mm/yyyy format =======
const myDate = new Date().getUTCDate();
const myMonth = new Date().getUTCMonth()+1;
const myYear = new Date().getUTCFullYear();

const date = myDate.toString()
const month = myMonth.toString()
const year = myYear.toString()

const fullDate = date + "-" + month + "-" + year;

// ===================== Exporting Credentials =========================
module.exports = {
    databaseUsername: process.env.DB_USERNAME,
    databasePWD: process.env.DB_PWD,
    port: process.env.PORT || 3000,
    JWT_KEY: process.env.JWT_KEY,
    todaysDate: fullDate,
}