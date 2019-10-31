// =============== Requiring Express ====================
const express = require('express');
const productROutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

// =================== Executing express like a function =====================
const app = express();

// =================== Handling a request ================================
app.use('/products',productROutes);
app.use('/orders',orderRoutes);

app.use('/',(req,res,next)=>{
    res.send('Welcome to RESTful APIs Project || You have written something wrong in URL');
});


// ===================== Exporting app =====================
module.exports = app;