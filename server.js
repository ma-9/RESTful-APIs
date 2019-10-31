// ======================== Importing Dependencies ===========================
const http = require('http');
const app = require('./app');

// ======================= Creating Server =================================
const server = http.createServer(app);

// ====== Creating Environment PORT Variable with localhost 3000 ========
const port = process.env.PORT || 3000;

// ========== Listening PORT ===============
server.listen(port);