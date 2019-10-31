// ======================== Importing Dependencies ===========================
const http = require('http');
const app = require('./app');
const {port} = require('./config/config');

// ======================= Creating Server =================================
const server = http.createServer(app);

// ========== Listening PORT ===============
server.listen(port);